import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { uploadImage, deleteImage } from '../services/storage.service';

const prisma = new PrismaClient();

export const createArtwork = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, tags } = req.body;
    const artistId = req.user?.uid;
    const file = req.file;

    if (!artistId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageUrl = await uploadImage(file);

    const artwork = await prisma.artwork.create({
      data: {
        title,
        description,
        imageUrl,
        artistId,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        artist: true,
        tags: true,
      },
    });

    res.status(201).json(artwork);
  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).json({ error: 'Error creating artwork' });
  }
};

export const getArtworks = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '10', tag } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = tag ? {
      tags: {
        some: {
          name: tag as string,
        },
      },
    } : {};

    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          artist: true,
          tags: true,
          _count: {
            select: {
              favorites: true,
              comments: true,
            },
          },
        },
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.artwork.count({ where }),
    ]);

    res.json({
      artworks,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ error: 'Error fetching artworks' });
  }
};

export const getArtwork = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const artwork = await prisma.artwork.findUnique({
      where: { id },
      include: {
        artist: true,
        tags: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json(artwork);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    res.status(500).json({ error: 'Error fetching artwork' });
  }
};

export const updateArtwork = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    const userId = req.user?.uid;
    const file = req.file;

    const artwork = await prisma.artwork.findUnique({
      where: { id },
      select: { artistId: true, imageUrl: true },
    });

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    if (artwork.artistId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this artwork' });
    }

    let imageUrl = artwork.imageUrl;
    if (file) {
      // Eliminar la imagen anterior
      await deleteImage(artwork.imageUrl);
      // Subir la nueva imagen
      imageUrl = await uploadImage(file);
    }

    const updatedArtwork = await prisma.artwork.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        tags: {
          set: [],
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        artist: true,
        tags: true,
      },
    });

    res.json(updatedArtwork);
  } catch (error) {
    console.error('Error updating artwork:', error);
    res.status(500).json({ error: 'Error updating artwork' });
  }
};

export const deleteArtwork = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.uid;

    const artwork = await prisma.artwork.findUnique({
      where: { id },
      select: { artistId: true, imageUrl: true },
    });

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    if (artwork.artistId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this artwork' });
    }

    // Eliminar la imagen del almacenamiento
    await deleteImage(artwork.imageUrl);

    // Eliminar la obra de arte de la base de datos
    await prisma.artwork.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting artwork:', error);
    res.status(500).json({ error: 'Error deleting artwork' });
  }
};

export const toggleFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const artwork = await prisma.artwork.findUnique({
      where: { id },
      include: {
        favorites: {
          where: {
            id: userId,
          },
        },
      },
    });

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    const isFavorited = artwork.favorites.length > 0;

    const updatedArtwork = await prisma.artwork.update({
      where: { id },
      data: {
        favorites: {
          [isFavorited ? 'disconnect' : 'connect']: {
            id: userId,
          },
        },
      },
      include: {
        favorites: true,
      },
    });

    res.json(updatedArtwork);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ error: 'Error toggling favorite' });
  }
}; 