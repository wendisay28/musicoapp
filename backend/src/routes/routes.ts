import { Router } from 'express';
import { authRoutes } from './auth';
import { artworkRoutes } from './artwork';
import { commentRoutes } from './comment';
import { notificationRoutes } from './notification';
import { offerRoutes } from './offer';

// Tipos
type Route = {
  path: string;
  router: Router;
};

const router = Router();

// Definición de rutas con sus paths
const routes: Route[] = [
  { path: '/auth', router: authRoutes },
  { path: '/artworks', router: artworkRoutes },
  { path: '/comments', router: commentRoutes },
  { path: '/notifications', router: notificationRoutes },
  { path: '/offers', router: offerRoutes }
];

// Registrar todas las rutas
routes.forEach(({ path, router: routeHandler }) => {
  router.use(path, routeHandler);
});

export default router;