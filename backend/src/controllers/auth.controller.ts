import { Request, Response } from 'express';
import { adminAuth } from '../lib/firebase-admin';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { uid, email, name, image } = req.body;

    const user = await prisma.user.create({
      data: {
        id: uid,
        email: email,
        name: name,
        image: image,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: uid },
      include: {
        artworks: true,
        favorites: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const { name, image } = req.body;

    const user = await prisma.user.update({
      where: { id: uid },
      data: {
        name,
        image,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
}; 