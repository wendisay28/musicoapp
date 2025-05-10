import { api } from '@/lib/api';
import { Notification } from '@/types/notification';

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get('/notifications');
  return response.data;
};

export const getUnreadNotificationsCount = async (): Promise<number> => {
  const response = await api.get('/notifications/unread/count');
  return response.data.count;
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  await api.patch(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  await api.patch('/notifications/read-all');
};

export const deleteNotification = async (id: string): Promise<void> => {
  await api.delete(`/notifications/${id}`);
}; 