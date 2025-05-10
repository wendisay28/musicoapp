import { Router } from 'express';
import { authRoutes } from './auth';
import { artworkRoutes } from './artwork';
import { commentRoutes } from './comment';
import { notificationRoutes } from './notification';
import { offerRoutes } from './offer';

const router = Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de obras de arte
router.use('/artworks', artworkRoutes);

// Rutas de comentarios
router.use('/comments', commentRoutes);

// Rutas de notificaciones
router.use('/notifications', notificationRoutes);

// Rutas de ofertas
router.use('/offers', offerRoutes);

export default router; 