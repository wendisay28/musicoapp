import { apiClient } from '@/lib/api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
  count: number;
  createdAt: string;
}

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[];
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  parentId?: string;
  image?: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  parentId?: string;
  image?: string;
}

export const getCategories = async (filters?: { parentId?: string; search?: string }, page = 1, limit = 20): Promise<{ categories: Category[]; total: number }> => {
  const response = await apiClient.get<{ categories: Category[]; total: number }>('/categories', {
    params: { ...filters, page, limit }
  });
  return response.data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await apiClient.get<Category>(`/categories/${id}`);
  return response.data;
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await apiClient.get<Category>(`/categories/slug/${slug}`);
  return response.data;
};

export const getCategoryTree = async (): Promise<CategoryWithChildren[]> => {
  const response = await apiClient.get<CategoryWithChildren[]>('/categories/tree');
  return response.data;
};

export const createCategory = async (data: CreateCategoryData): Promise<Category> => {
  const response = await apiClient.post<Category>('/categories', data);
  return response.data;
};

export const updateCategory = async (id: string, data: UpdateCategoryData): Promise<Category> => {
  const response = await apiClient.put<Category>(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await apiClient.delete(`/categories/${id}`);
};

export const getPopularCategories = async (limit = 10): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/categories/popular', {
    params: { limit }
  });
  return response.data;
};

export const getRootCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/categories/root');
  return response.data;
};

export const getCategoryChildren = async (id: string): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>(`/categories/${id}/children`);
  return response.data;
}; 