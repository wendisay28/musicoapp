import { z } from 'zod';

/**
 * Tipo de notificación
 */
export enum NotificationType {
  ORDER = 'order',
  MESSAGE = 'message',
  SYSTEM = 'system'
}

/**
 * Esquema de validación para notificaciones
 */
export const notificationSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(NotificationType),
  title: z.string(),
  message: z.string(),
  read: z.boolean().default(false),
  createdAt: z.string().datetime(),
  relatedId: z.string().optional(),
  senderId: z.string().optional(),
  senderName: z.string().optional(),
  senderPhoto: z.string().url().optional()
});

/**
 * Tipo inferido del esquema de notificación
 */
export type Notification = z.infer<typeof notificationSchema>;

/**
 * Propiedades para el componente de lista de notificaciones
 */
export interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Propiedades para el componente de tarjeta de notificación
 */
export interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: () => Promise<void>;
  onDelete?: () => Promise<void>;
}

/**
 * Retorno del hook useNotifications
 */
export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
} 