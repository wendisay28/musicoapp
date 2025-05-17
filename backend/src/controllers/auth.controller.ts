import { Request, Response } from 'express';
import { PrismaClient } from '.prisma/client';
import logger from '../lib/logger';

// Tipos
interface UserCreateInput {
  uid: string;
  email: string;
  name: string;
  image?: string;
}

interface UserUpdateInput {
  name?: string;
  image?: string;
}

type ApiResponse = {
  success: boolean;
  data?: unknown;
  error?: string;
  status?: number;
};

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { uid, email, name, image } = req.body as UserCreateInput;

    // Validación básica
    if (!uid || !email || !name) {
      logger.warn('Invalid user creation attempt', { uid, email });
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields',
        status: 400
      };
      return res.status(400).json(response);
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { id: uid } });
    if (existingUser) {
      logger.warn('Duplicate user creation attempt', { uid });
      const response: ApiResponse = {
        success: false,
        error: 'User already exists',
        status: 409
      };
      return res.status(409).json(response);
    }

    const user = await prisma.user.create({
      data: {
        id: uid,
        email,
        name,
        image,
      },
    });

    logger.info('User created successfully', { uid });
    const response: ApiResponse = {
      success: true,
      data: user,
      status: 201
    };
    res.status(201).json(response);
  } catch (error) {
    logger.error('Error creating user', { error, uid: req.body.uid });
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      logger.warn('Get user attempt without UID');
      const response: ApiResponse = {
        success: false,
        error: 'User ID is required',
        status: 400
      };
      return res.status(400).json(response);
    }

    const user = await prisma.user.findUnique({
      where: { id: uid },
      include: {
        artworks: true,
        favorites: true,
      },
    });

    if (!user) {
      logger.info('User not found', { uid });
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    logger.info('User fetched successfully', { uid });
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Error fetching user', { error, uid: req.params.uid });
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const { name, image } = req.body as UserUpdateInput;

    if (!uid) {
      logger.warn('Update user attempt without UID');
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Verificar si hay campos para actualizar
    if (!name && !image) {
      logger.warn('Update user attempt without changes', { uid });
      const response: ApiResponse = {
        success: false,
        error: 'No fields to update',
        status: 400
      };
      return res.status(400).json(response);
    }

    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({ where: { id: uid } });
    if (!existingUser) {
      logger.warn('Update attempt for non-existent user', { uid });
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const user = await prisma.user.update({
      where: { id: uid },
      data: {
        ...(name && { name }),
        ...(image && { image }),
      },
    });

    logger.info('User updated successfully', { uid });
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Error updating user', { error, uid: req.params.uid });
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};