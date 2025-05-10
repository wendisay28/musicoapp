import { apiClient } from '@/lib/api';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SendEmailData {
  to: string;
  template: string;
  variables: Record<string, string>;
}

export interface CreateTemplateData {
  name: string;
  subject: string;
  body: string;
  variables: string[];
}

export interface UpdateTemplateData {
  name?: string;
  subject?: string;
  body?: string;
  variables?: string[];
}

export const getTemplates = async (): Promise<EmailTemplate[]> => {
  const response = await apiClient.get<EmailTemplate[]>('/email/templates');
  return response.data;
};

export const getTemplateById = async (id: string): Promise<EmailTemplate> => {
  const response = await apiClient.get<EmailTemplate>(`/email/templates/${id}`);
  return response.data;
};

export const createTemplate = async (data: CreateTemplateData): Promise<EmailTemplate> => {
  const response = await apiClient.post<EmailTemplate>('/email/templates', data);
  return response.data;
};

export const updateTemplate = async (id: string, data: UpdateTemplateData): Promise<EmailTemplate> => {
  const response = await apiClient.put<EmailTemplate>(`/email/templates/${id}`, data);
  return response.data;
};

export const deleteTemplate = async (id: string): Promise<void> => {
  await apiClient.delete(`/email/templates/${id}`);
};

export const sendEmail = async (data: SendEmailData): Promise<void> => {
  await apiClient.post('/email/send', data);
};

export const sendBulkEmail = async (data: SendEmailData[]): Promise<void> => {
  await apiClient.post('/email/send-bulk', data);
}; 