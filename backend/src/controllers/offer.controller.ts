import { Response } from 'express';
import { PrismaClient} from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Crear una nueva oferta
export const createOffer = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, type, location, budget, deadline } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const offer = await prisma.offer.create({
      data: {
        title,
        description,
        type,
        location,
        budget,
        deadline: new Date(deadline),
        createdById: userId,
      },
    });

    // Notificar a artistas relevantes
    const relevantArtists = await prisma.user.findMany({
      where: {
        role: 'ARTIST',
        artistProfile: {
          specialties: {
            has: type,
          },
        },
      },
    });

    // Crear notificaciones para cada artista
    await Promise.all(
      relevantArtists.map((artist: User) =>
        prisma.notification.create({
          data: {
            type: 'NEW_OFFER',
            message: `Nueva oferta: ${title}`,
            userId: artist.id,
          },
        })
      )
    );

    res.status(201).json(offer);
  } catch (error) {
    console.error('Error al crear oferta:', error);
    res.status(500).json({ error: 'Error al crear la oferta' });
  }
};

// Obtener ofertas activas
export const getActiveOffers = async (req: AuthRequest, res: Response) => {
  try {
    const { type, location } = req.query;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const offers = await prisma.offer.findMany({
      where: {
        status: 'PENDING',
        deadline: {
          gt: new Date(),
        },
        ...(type && { type: type as string }),
        ...(location && {
          location: {
            path: ['lat'],
            equals: (location as any).lat,
          },
        }),
      },
      include: {
        createdBy: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(offers);
  } catch (error) {
    console.error('Error al obtener ofertas:', error);
    res.status(500).json({ error: 'Error al obtener las ofertas' });
  }
};

// Aceptar una oferta
export const acceptOffer = async (req: AuthRequest, res: Response) => {
  try {
    const { offerId } = req.params;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const offer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        status: 'ACCEPTED',
        artistId: userId,
      },
    });

    // Notificar al creador de la oferta
    await prisma.notification.create({
      data: {
        type: 'OFFER_ACCEPTED',
        message: `Tu oferta "${offer.title}" ha sido aceptada`,
        userId: offer.createdById,
      },
    });

    res.json(offer);
  } catch (error) {
    console.error('Error al aceptar oferta:', error);
    res.status(500).json({ error: 'Error al aceptar la oferta' });
  }
};

// Hacer una contraoferta
export const makeCounterOffer = async (req: AuthRequest, res: Response) => {
  try {
    const { offerId } = req.params;
    const { price, message } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const offer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        status: 'COUNTER_OFFER',
        counterOffer: {
          price,
          message,
        },
        artistId: userId,
      },
    });

    // Notificar al creador de la oferta
    await prisma.notification.create({
      data: {
        type: 'COUNTER_OFFER',
        message: `Nueva contraoferta para "${offer.title}"`,
        userId: offer.createdById,
      },
    });

    res.json(offer);
  } catch (error) {
    console.error('Error al hacer contraoferta:', error);
    res.status(500).json({ error: 'Error al hacer la contraoferta' });
  }
};

// Obtener ofertas de un usuario
export const getUserOffers = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const [createdOffers, receivedOffers] = await Promise.all([
      prisma.offer.findMany({
        where: { createdById: userId },
        include: {
          artist: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.offer.findMany({
        where: { artistId: userId },
        include: {
          createdBy: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({
      created: createdOffers,
      received: receivedOffers,
    });
  } catch (error) {
    console.error('Error al obtener ofertas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener las ofertas del usuario' });
  }
}; 