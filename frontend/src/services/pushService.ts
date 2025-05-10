import { apiClient } from '@/lib/api';

export interface PushSubscription {
  id: string;
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  createdAt: string;
  updatedAt: string;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, unknown>;
  createdAt: string;
  read: boolean;
}

export interface CreateSubscriptionData {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export interface SendPushData {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, unknown>;
  userId?: string;
  topic?: string;
}

export const subscribeToPush = async (data: CreateSubscriptionData): Promise<PushSubscription> => {
  const response = await apiClient.post<PushSubscription>('/push/subscribe', data);
  return response.data;
};

export const unsubscribeFromPush = async (): Promise<void> => {
  await apiClient.post('/push/unsubscribe');
};

export const getPushNotifications = async (page = 1, limit = 20): Promise<{ notifications: PushNotification[]; total: number }> => {
  const response = await apiClient.get<{ notifications: PushNotification[]; total: number }>('/push/notifications', {
    params: { page, limit }
  });
  return response.data;
};

export const markPushNotificationAsRead = async (id: string): Promise<PushNotification> => {
  const response = await apiClient.put<PushNotification>(`/push/notifications/${id}/read`);
  return response.data;
};

export const markAllPushNotificationsAsRead = async (): Promise<void> => {
  await apiClient.put('/push/notifications/read-all');
};

export const deletePushNotification = async (id: string): Promise<void> => {
  await apiClient.delete(`/push/notifications/${id}`);
};

export const sendPushNotification = async (data: SendPushData): Promise<void> => {
  await apiClient.post('/push/send', data);
}; 