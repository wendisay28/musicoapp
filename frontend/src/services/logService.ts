import { apiClient } from '@/lib/api';

export interface LogEntry {
  id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

export interface LogQuery {
  level?: LogEntry['level'];
  startDate?: string;
  endDate?: string;
  userId?: string;
  sessionId?: string;
}

export const log = async (data: Omit<LogEntry, 'id' | 'timestamp'>): Promise<LogEntry> => {
  const response = await apiClient.post<LogEntry>('/logs', data);
  return response.data;
};

export const getLogs = async (query: LogQuery, page = 1, limit = 50): Promise<{ logs: LogEntry[]; total: number }> => {
  const response = await apiClient.get<{ logs: LogEntry[]; total: number }>('/logs', {
    params: { ...query, page, limit }
  });
  return response.data;
};

export const getLogById = async (id: string): Promise<LogEntry> => {
  const response = await apiClient.get<LogEntry>(`/logs/${id}`);
  return response.data;
};

export const deleteLog = async (id: string): Promise<void> => {
  await apiClient.delete(`/logs/${id}`);
};

export const clearLogs = async (query?: LogQuery): Promise<void> => {
  await apiClient.delete('/logs', { params: query });
};

export const getLogStats = async (): Promise<{
  total: number;
  byLevel: Record<LogEntry['level'], number>;
  byDate: {
    date: string;
    count: number;
  }[];
}> => {
  const response = await apiClient.get<{
    total: number;
    byLevel: Record<LogEntry['level'], number>;
    byDate: {
      date: string;
      count: number;
    }[];
  }>('/logs/stats');
  return response.data;
}; 