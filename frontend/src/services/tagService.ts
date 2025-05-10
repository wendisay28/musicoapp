import { apiClient } from '@/lib/api';

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  count: number;
  createdAt: string;
}

export interface CreateTagData {
  name: string;
  description?: string;
  category?: string;
}

export interface UpdateTagData {
  name?: string;
  description?: string;
  category?: string;
}

export const getTags = async (filters?: { category?: string; search?: string }, page = 1, limit = 20): Promise<{ tags: Tag[]; total: number }> => {
  const response = await apiClient.get<{ tags: Tag[]; total: number }>('/tags', {
    params: { ...filters, page, limit }
  });
  return response.data;
};

export const getTagById = async (id: string): Promise<Tag> => {
  const response = await apiClient.get<Tag>(`/tags/${id}`);
  return response.data;
};

export const getTagBySlug = async (slug: string): Promise<Tag> => {
  const response = await apiClient.get<Tag>(`/tags/slug/${slug}`);
  return response.data;
};

export const createTag = async (data: CreateTagData): Promise<Tag> => {
  const response = await apiClient.post<Tag>('/tags', data);
  return response.data;
};

export const updateTag = async (id: string, data: UpdateTagData): Promise<Tag> => {
  const response = await apiClient.put<Tag>(`/tags/${id}`, data);
  return response.data;
};

export const deleteTag = async (id: string): Promise<void> => {
  await apiClient.delete(`/tags/${id}`);
};

export const getPopularTags = async (limit = 10): Promise<Tag[]> => {
  const response = await apiClient.get<Tag[]>('/tags/popular', {
    params: { limit }
  });
  return response.data;
};

export const getTagCategories = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/tags/categories');
  return response.data;
};

export const mergeTags = async (sourceId: string, targetId: string): Promise<Tag> => {
  const response = await apiClient.post<Tag>(`/tags/${sourceId}/merge`, { targetId });
  return response.data;
}; 