import { apiClient } from '@/lib/api';
import { User } from './userService';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  price?: number;
  userId: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItemWithUser extends PortfolioItem {
  user: User;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
}

export interface CreatePortfolioItemData {
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  price?: number;
}

export interface UpdatePortfolioItemData {
  title?: string;
  description?: string;
  images?: string[];
  category?: string;
  tags?: string[];
  price?: number;
  status?: 'draft' | 'published' | 'archived';
}

export const getPortfolioItems = async (filters?: { category?: string; tags?: string[]; minPrice?: number; maxPrice?: number; status?: string }, page = 1, limit = 20): Promise<{ items: PortfolioItemWithUser[]; total: number }> => {
  const response = await apiClient.get<{ items: PortfolioItemWithUser[]; total: number }>('/portfolio', {
    params: { ...filters, page, limit }
  });
  return response.data;
};

export const getPortfolioItemById = async (id: string): Promise<PortfolioItemWithUser> => {
  const response = await apiClient.get<PortfolioItemWithUser>(`/portfolio/${id}`);
  return response.data;
};

export const createPortfolioItem = async (data: CreatePortfolioItemData): Promise<PortfolioItem> => {
  const response = await apiClient.post<PortfolioItem>('/portfolio', data);
  return response.data;
};

export const updatePortfolioItem = async (id: string, data: UpdatePortfolioItemData): Promise<PortfolioItem> => {
  const response = await apiClient.put<PortfolioItem>(`/portfolio/${id}`, data);
  return response.data;
};

export const deletePortfolioItem = async (id: string): Promise<void> => {
  await apiClient.delete(`/portfolio/${id}`);
};

export const likePortfolioItem = async (id: string): Promise<void> => {
  await apiClient.post(`/portfolio/${id}/like`);
};

export const unlikePortfolioItem = async (id: string): Promise<void> => {
  await apiClient.delete(`/portfolio/${id}/like`);
};

export const getUserPortfolio = async (userId: string, page = 1, limit = 20): Promise<{ items: PortfolioItemWithUser[]; total: number }> => {
  const response = await apiClient.get<{ items: PortfolioItemWithUser[]; total: number }>(`/users/${userId}/portfolio`, {
    params: { page, limit }
  });
  return response.data;
};

export const getPortfolioCategories = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/portfolio/categories');
  return response.data;
};

export const getPortfolioTags = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/portfolio/tags');
  return response.data;
}; 