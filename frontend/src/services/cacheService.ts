import { apiClient } from '@/lib/api';

export interface CacheEntry<T> {
  key: string;
  value: T;
  expiresAt?: string;
}

export interface CacheOptions {
  ttl?: number;
  tags?: string[];
}

export const getCache = async <T>(key: string): Promise<T | null> => {
  const response = await apiClient.get<CacheEntry<T> | null>(`/cache/${key}`);
  return response.data?.value ?? null;
};

export const setCache = async <T>(key: string, value: T, options?: CacheOptions): Promise<void> => {
  await apiClient.post('/cache', { key, value, ...options });
};

export const deleteCache = async (key: string): Promise<void> => {
  await apiClient.delete(`/cache/${key}`);
};

export const clearCache = async (): Promise<void> => {
  await apiClient.delete('/cache');
};

export const getCacheByTag = async <T>(tag: string): Promise<CacheEntry<T>[]> => {
  const response = await apiClient.get<CacheEntry<T>[]>(`/cache/tag/${tag}`);
  return response.data;
};

export const clearCacheByTag = async (tag: string): Promise<void> => {
  await apiClient.delete(`/cache/tag/${tag}`);
};

export const getCacheStats = async (): Promise<{
  size: number;
  keys: number;
  hits: number;
  misses: number;
}> => {
  const response = await apiClient.get<{
    size: number;
    keys: number;
    hits: number;
    misses: number;
  }>('/cache/stats');
  return response.data;
}; 