import { apiClient } from '@/lib/api';

export interface Report {
  id: string;
  type: 'user' | 'content' | 'order';
  reason: string;
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  reporterId: string;
  reportedId: string;
}

export interface CreateReportData {
  type: Report['type'];
  reason: string;
  description: string;
  reportedId: string;
}

export interface UpdateReportData {
  status?: Report['status'];
  adminNotes?: string;
}

export const createReport = async (data: CreateReportData): Promise<Report> => {
  const response = await apiClient.post<Report>('/reports', data);
  return response.data;
};

export const getReports = async (page = 1, limit = 10): Promise<{ reports: Report[]; total: number }> => {
  const response = await apiClient.get<{ reports: Report[]; total: number }>('/reports', {
    params: { page, limit }
  });
  return response.data;
};

export const getReportById = async (id: string): Promise<Report> => {
  const response = await apiClient.get<Report>(`/reports/${id}`);
  return response.data;
};

export const updateReport = async (id: string, data: UpdateReportData): Promise<Report> => {
  const response = await apiClient.put<Report>(`/reports/${id}`, data);
  return response.data;
};

export const getUserReports = async (): Promise<Report[]> => {
  const response = await apiClient.get<Report[]>('/reports/user');
  return response.data;
};

export const getReportedContent = async (type: Report['type'], id: string): Promise<Report[]> => {
  const response = await apiClient.get<Report[]>(`/reports/${type}/${id}`);
  return response.data;
}; 