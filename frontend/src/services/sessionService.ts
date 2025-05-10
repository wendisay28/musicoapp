import { apiClient } from '@/lib/api';

export interface Session {
  id: string;
  userId: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  lastActivity: string;
  createdAt: string;
}

export const getSessions = async (page = 1, limit = 20): Promise<{ sessions: Session[]; total: number }> => {
  const response = await apiClient.get<{ sessions: Session[]; total: number }>('/sessions', {
    params: { page, limit }
  });
  return response.data;
};

export const getSessionById = async (id: string): Promise<Session> => {
  const response = await apiClient.get<Session>(`/sessions/${id}`);
  return response.data;
};

export const getCurrentSession = async (): Promise<Session> => {
  const response = await apiClient.get<Session>('/sessions/current');
  return response.data;
};

export const deleteSession = async (id: string): Promise<void> => {
  await apiClient.delete(`/sessions/${id}`);
};

export const deleteAllSessions = async (): Promise<void> => {
  await apiClient.delete('/sessions');
};

export const deleteOtherSessions = async (): Promise<void> => {
  await apiClient.delete('/sessions/others');
};

export const updateSessionActivity = async (): Promise<void> => {
  await apiClient.put('/sessions/activity');
};

export const getSessionStats = async (): Promise<{
  totalSessions: number;
  activeSessions: number;
  sessionsByDevice: { [device: string]: number };
  sessionsByBrowser: { [browser: string]: number };
  sessionsByOs: { [os: string]: number };
}> => {
  const response = await apiClient.get<{
    totalSessions: number;
    activeSessions: number;
    sessionsByDevice: { [device: string]: number };
    sessionsByBrowser: { [browser: string]: number };
    sessionsByOs: { [os: string]: number };
  }>('/sessions/stats');
  return response.data;
}; 