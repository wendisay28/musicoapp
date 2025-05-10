import { apiClient } from '@/lib/api';

export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface FileMetadata {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
  userId: string;
  createdAt: string;
}

export const uploadFile = async (file: File, type: 'image' | 'document'): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  const response = await apiClient.post<FileUploadResponse>('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const uploadImage = async (file: File): Promise<FileUploadResponse> => {
  return uploadFile(file, 'image');
};

export const uploadDocument = async (file: File): Promise<FileUploadResponse> => {
  return uploadFile(file, 'document');
};

export const getFileMetadata = async (id: string): Promise<FileMetadata> => {
  const response = await apiClient.get<FileMetadata>(`/files/${id}`);
  return response.data;
};

export const getUserFiles = async (page = 1, limit = 20): Promise<{ files: FileMetadata[]; total: number }> => {
  const response = await apiClient.get<{ files: FileMetadata[]; total: number }>('/files', {
    params: { page, limit }
  });
  return response.data;
};

export const deleteFile = async (id: string): Promise<void> => {
  await apiClient.delete(`/files/${id}`);
};

export const getFileUrl = async (id: string): Promise<string> => {
  const response = await apiClient.get<{ url: string }>(`/files/${id}/url`);
  return response.data.url;
};

export const getFileDownloadUrl = async (id: string): Promise<string> => {
  const response = await apiClient.get<{ url: string }>(`/files/${id}/download`);
  return response.data.url;
}; 