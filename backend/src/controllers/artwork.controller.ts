import { Request, Response } from 'express';
import { PrismaClient } from '.prisma/client';
import { AuthRequest } from '../middleware/auth';
import { uploadImage, deleteImage } from '../services/storage.service';
import logger from '../lib/logger';

// Tipos
interface ApiResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  status: number;
  meta?: {
    total?: number;
    pages?: number;
    currentPage?: number;
  };
}

interface CreateArtworkInput {
  title: string;
  description: string;
  tags: string[];
}

interface UpdateArtworkInput extends Partial<CreateArtworkInput> {}

interface ArtworkQueryParams {
  page?: string;
  limit?: string;
  tag?: string;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const prisma = new PrismaClient();

export const createArtwork = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, tags } = req.body as CreateArtworkInput;
    const artistId = req.user?.uid;
    const file = req.file;

    // Validación básica
    if (!artistId) {
      logger.warn('Unauthorized artwork creation attempt');
      const response: ApiResponse = {
        success: false,
        error: 'User not authenticated',
        status: 401
      };
      return res.status(401).json(response);
    }

    if (!title || !description || !Array.isArray(tags)) {
      logger.warn('Invalid artwork creation data', { artistId });
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields',
        status: 400
      };
      return res.status(400).json(response);
    }

    if (!file) {
      logger.warn('No image file provided', { artistId });
      const response: ApiResponse = {
        success: false,
        error: 'No image file provided',
        status: 400
      };
      return res.status(400).json(response);
    }

    // Validar tipo y tamaño de archivo
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      logger.warn('Invalid file type', { artistId, mimetype: file.mimetype });
      const response: ApiResponse = {
        success: false,
        error: 'Invalid file type. Allowed types: JPEG, PNG, WebP',
        status: 400
      };
      return res.status(400).json(response);
    }

    if (file.size > MAX_FILE_SIZE) {
      logger.warn('File too large', { artistId, size: file.size });
      const response: ApiResponse = {
        success: false,
        error: 'File size exceeds 5MB limit',
        status: 400
      };
      return res.status(400).json(response);
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
            where: { name: tag.trim().toLowerCase() },
            create: { name: tag.trim().toLowerCase() },
          })),
        },
      },
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
    });

    logger.info('Artwork created successfully', { artworkId: artwork.id, artistId });
    const response: ApiResponse = {
      success: true,
      data: artwork,
      status: 201
    };
    res.status(201).json(response);
  } catch (error) {
    logger.error('Error creating artwork', { error, artistId: req.user?.uid });
    const response: ApiResponse = {
      success: false,
      error: 'Error creating artwork',
      status: 500
    };
    res.status(500).json(response);
  }
};

export const getArtworks = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '10', tag } = req.query as ArtworkQueryParams;
    
    // Validar parámetros de paginación
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit))); // Máximo 50 items por página
    const skip = (pageNum - 1) * limitNum;

    const where = tag ? {
      tags: {
        some: {
          name: tag.toLowerCase(),
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
        take: limitNum,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.artwork.count({ where }),
    ]);

    const response: ApiResponse = {
      success: true,
      data: artworks,
      status: 200,
      meta: {
        total,
        pages: Math.ceil(total / limitNum),
        currentPage: pageNum
      }
    };
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ error: 'Error fetching artworks' });
  }
};

export const getArtwork = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      logger.warn('Get artwork attempt without ID');
      const response: ApiResponse = {
        success: false,
        error: 'Artwork ID is required',
        status: 400
      };
      return res.status(400).json(response);
    }

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
            comments: true,
          },
        },
      },
    });

    if (!artwork) {
      logger.info('Artwork not found', { artworkId: id });
      const response: ApiResponse = {
        success: false,
        error: 'Artwork not found',
        status: 404
      };
      return res.status(404).json(response);
    }

    logger.info('Artwork fetched successfully', { artworkId: id });
    const response: ApiResponse = {
      success: true,
      data: artwork,
      status: 200
    };
    res.status(200).json(response);
  } catch (error) {
    logger.error('Error fetching artwork', { error, artworkId: req.params.id });
    const response: ApiResponse = {
      success: false,
      error: 'Error fetching artwork',
      status: 500
    };
    res.status(500).json(response);
  }
};

export const updateArtwork = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body as UpdateArtworkInput;
    const userId = req.user?.uid;
    const file = req.file;

    if (!userId) {
      logger.warn('Unauthorized artwork update attempt');
      const response: ApiResponse = {
        success: false,
        error: 'User not authenticated',
        status: 401
      };
      return res.status(401).json(response);
    }

    if (!id) {
      logger.warn('Update artwork attempt without ID', { userId });
      const response: ApiResponse = {
        success: false,
        error: 'Artwork ID is required',
        status: 400
      };
      return res.status(400).json(response);
    }

    const artwork = await prisma.artwork.findUnique({
      where: { id },
      select: { artistId: true, imageUrl: true },
    });

    if (!artwork) {
      logger.info('Artwork not found for update', { artworkId: id, userId });
      const response: ApiResponse = {
        success: false,
        error: 'Artwork not found',
        status: 404
      };
      return res.status(404).json(response);
    }

    if (artwork.artistId !== userId) {
      logger.warn('Unauthorized artwork update attempt', { artworkId: id, userId });
      const response: ApiResponse = {
        success: false,
        error: 'Not authorized to update this artwork',
        status: 403
      };
      return res.status(403).json(response);
    }

    let imageUrl = artwork.imageUrl;
    if (file) {
      // Validar tipo y tamaño de archivo
      if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        logger.warn('Invalid file type in update', { userId, mimetype: file.mimetype });
        const response: ApiResponse = {
          success: false,
          error: 'Invalid file type. Allowed types: JPEG, PNG, WebP',
          status: 400
        };
        return res.status(400).json(response);
      }

      if (file.size > MAX_FILE_SIZE) {
        logger.warn('File too large in update', { userId, size: file.size });
        const response: ApiResponse = {
          success: false,
          error: 'File size exceeds 5MB limit',
          status: 400
        };
        return res.status(400).json(response);
      }

      // Eliminar la imagen anterior
      await deleteImage(artwork.imageUrl);
      // Subir la nueva imagen
      imageUrl = await uploadImage(file);
    }

    const updatedArtwork = await prisma.artwork.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        imageUrl,
        ...(tags && {
          tags: {
            set: [],
            connectOrCreate: tags.map((tag: string) => ({
              where: { name: tag.trim().toLowerCase() },
              create: { name: tag.trim().toLowerCase() },
            })),
          },
        }),
      },
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
    });

    logger.info('Artwork updated successfully', { artworkId: id, userId });
    const response: ApiResponse = {
      success: true,
      data: updatedArtwork,
      status: 200
    };
    res.status(200).json(response);
  } catch (error) {
    logger.error('Error updating artwork', { error, artworkId: req.params.id, userId: req.user?.uid });
    const response: ApiResponse = {
      success: false,
      error: 'Error updating artwork',
      status: 500
    };
    res.status(500).json(response);
  }
};

export const deleteArtwork = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.uid;

    if (!userId) {
      logger.warn('Unauthorized artwork deletion attempt');
      const response: ApiResponse = {
        success: false,
        error: 'User not authenticated',
        status: 401
      };
      return res.status(401).json(response);
    }

    if (!id) {
      logger.warn('Delete artwork attempt without ID', { userId });
      const response: ApiResponse = {
        success: false,
        error: 'Artwork ID is required',
        status: 400
      };
      return res.status(400).json(response);
    }

    const artwork = await prisma.artwork.findUnique({
      where: { id },
      select: { artistId: true, imageUrl: true },
    });

    if (!artwork) {
      logger.info('Artwork not found for deletion', { artworkId: id, userId });
      const response: ApiResponse = {
        success: false,
        error: 'Artwork not found',
        status: 404
      };
      return res.status(404).json(response);
    }

    if (artwork.artistId !== userId) {
      logger.warn('Unauthorized artwork deletion attempt', { artworkId: id, userId });
      const response: ApiResponse = {
        success: false,
        error: 'Not authorized to delete this artwork',
        status: 403
      };
      return res.status(403).json(response);
    }

    // Eliminar la imagen del almacenamiento
    await deleteImage(artwork.imageUrl);

    // Eliminar la obra de arte de la base de datos
    await prisma.artwork.delete({
      where: { id },
    });

    logger.info('Artwork deleted successfully', { artworkId: id, userId });
    const response: ApiResponse = {
      success: true,
      status: 204
    };
    res.status(204).json(response);
  } catch (error) {
    logger.error('Error deleting artwork', { error, artworkId: req.params.id, userId: req.user?.uid });
    const response: ApiResponse = {
      success: false,
      error: 'Error deleting artwork',
      status: 500
    };
    res.status(500).json(response);
  }
};

export const toggleFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.uid;

    if (!userId) {
      logger.warn('Unauthorized favorite toggle attempt');
      const response: ApiResponse = {
        success: false,
        error: 'User not authenticated',
        status: 401
      };
      return res.status(401).json(response);
    }

    if (!id) {
      logger.warn('Toggle favorite attempt without artwork ID', { userId });
      const response: ApiResponse = {
        success: false,
        error: 'Artwork ID is required',
        status: 400
      };
      return res.status(400).json(response);
    }

    const artwork = await prisma.artwork.findUnique({
      where: { id },
      include: {
        favorites: {
          where: {
            id: userId,
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
      logger.info('Artwork not found for favorite toggle', { artworkId: id, userId });
      const response: ApiResponse = {
        success: false,
        error: 'Artwork not found',
        status: 404
      };
      return res.status(404).json(response);
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
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    logger.info('Artwork favorite toggled successfully', { 
      artworkId: id, 
      userId, 
      action: isFavorited ? 'unfavorited' : 'favorited' 
    });
    const response: ApiResponse = {
      success: true,
      data: updatedArtwork,
      status: 200
    };
    res.status(200).json(response);
  } catch (error) {
    logger.error('Error toggling favorite', { error, artworkId: req.params.id, userId: req.user?.uid });
    const response: ApiResponse = {
      success: false,
      error: 'Error toggling favorite',
      status: 500
    };
    res.status(500).json(response);
  }
}; 