import { Router } from 'express';
import {
  createNotification,
  getNotification,
  updateNotification,
  deleteNotification,
  listNotifications
} from '../controllers/notification.controller';

const router = Router();

router.post('/', createNotification);
router.get('/:id', getNotification);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);
router.get('/', listNotifications);

export { router as notificationRoutes }; 