import { apiClient } from '@/lib/api';
import { User } from './userService';

export interface Activity {
  id: string;
  type: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'like' | 'comment' | 'follow' | 'message';
  userId: string;
  entityId?: string;
  entityType?: string;
  metadata?: Record<string, any>;
  ip: string;
  userAgent: string;
  createdAt: string;
}

export interface ActivityWithUser extends Activity {
  user: User;
}

export interface ActivityFilters {
  type?: string;
  entityId?: string;
  entityType?: string;
  startDate?: string;
  endDate?: string;
}

export const getActivities = async (filters?: ActivityFilters, page = 1, limit = 20): Promise<{ activities: ActivityWithUser[]; total: number }> => {
  const response = await apiClient.get<{ activities: ActivityWithUser[]; total: number }>('/activities', {
    params: { ...filters, page, limit }
  });
  return response.data;
};

export const getActivityById = async (id: string): Promise<ActivityWithUser> => {
  const response = await apiClient.get<ActivityWithUser>(`/activities/${id}`);
  return response.data;
};

export const getUserActivities = async (userId: string, filters?: Omit<ActivityFilters, 'entityId' | 'entityType'>, page = 1, limit = 20): Promise<{ activities: ActivityWithUser[]; total: number }> => {
  const response = await apiClient.get<{ activities: ActivityWithUser[]; total: number }>(`/users/${userId}/activities`, {
    params: { ...filters, page, limit }
  });
  return response.data;
};

export const getEntityActivities = async (entityId: string, entityType: string, filters?: Omit<ActivityFilters, 'entityId' | 'entityType'>, page = 1, limit = 20): Promise<{ activities: ActivityWithUser[]; total: number }> => {
  const response = await apiClient.get<{ activities: ActivityWithUser[]; total: number }>(`/activities/entity/${entityType}/${entityId}`, {
    params: { ...filters, page, limit }
  });
  return response.data;
};

export const deleteActivity = async (id: string): Promise<void> => {
  await apiClient.delete(`/activities/${id}`);
};

export const clearActivities = async (filters?: ActivityFilters): Promise<void> => {
  await apiClient.delete('/activities', { params: filters });
};

export const getActivityStats = async (filters?: ActivityFilters): Promise<{
  totalActivities: number;
  activitiesByType: { [type: string]: number };
  activitiesByDate: { [date: string]: number };
  activitiesByUser: { [userId: string]: number };
}> => {
  const response = await apiClient.get<{
    totalActivities: number;
    activitiesByType: { [type: string]: number };
    activitiesByDate: { [date: string]: number };
    activitiesByUser: { [userId: string]: number };
  }>('/activities/stats', {
    params: filters
  });
  return response.data;
}; 