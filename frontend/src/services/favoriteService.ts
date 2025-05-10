import { apiClient } from '@/lib/api';
import { User } from './userService';
import { PortfolioItem } from './portfolioService';

export interface Favorite {
  id: string;
  userId: string;
  entityId: string;
  entityType: 'artist' | 'portfolio';
  createdAt: string;
}

export interface FavoriteWithDetails extends Favorite {
  entity: User | PortfolioItem;
}

export const getFavorites = async (type?: 'artist' | 'portfolio'): Promise<FavoriteWithDetails[]> => {
  const response = await apiClient.get<FavoriteWithDetails[]>('/favorites', {
    params: { type }
  });
  return response.data;
};

export const addFavorite = async (entityId: string, type: 'artist' | 'portfolio'): Promise<Favorite> => {
  const response = await apiClient.post<Favorite>('/favorites', { entityId, type });
  return response.data;
};

export const removeFavorite = async (id: string): Promise<void> => {
  await apiClient.delete(`/favorites/${id}`);
};

export const checkFavorite = async (entityId: string, type: 'artist' | 'portfolio'): Promise<boolean> => {
  const response = await apiClient.get<{ isFavorite: boolean }>(`/favorites/check`, {
    params: { entityId, type }
  });
  return response.data.isFavorite;
};

export const getFavoriteCount = async (entityId: string, type: 'artist' | 'portfolio'): Promise<number> => {
  const response = await apiClient.get<{ count: number }>(`/favorites/count`, {
    params: { entityId, type }
  });
  return response.data.count;
}; 