import { apiClient } from '@/lib/api';
import { User } from './userService';
import { PortfolioItem } from './portfolioService';

export interface SearchResult {
  users: User[];
  portfolios: PortfolioItem[];
  total: number;
}

export interface SearchFilters {
  type?: 'user' | 'portfolio';
  category?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'relevance' | 'date' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export const search = async (query: string, filters?: SearchFilters, page = 1, limit = 20): Promise<SearchResult> => {
  const response = await apiClient.get<SearchResult>('/search', {
    params: { query, ...filters, page, limit }
  });
  return response.data;
};

export const searchUsers = async (query: string, page = 1, limit = 20): Promise<{ users: User[]; total: number }> => {
  const response = await apiClient.get<{ users: User[]; total: number }>('/search/users', {
    params: { query, page, limit }
  });
  return response.data;
};

export const searchPortfolios = async (query: string, filters?: Omit<SearchFilters, 'type'>, page = 1, limit = 20): Promise<{ portfolios: PortfolioItem[]; total: number }> => {
  const response = await apiClient.get<{ portfolios: PortfolioItem[]; total: number }>('/search/portfolios', {
    params: { query, ...filters, page, limit }
  });
  return response.data;
};

export const getPopularSearches = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/search/popular');
  return response.data;
};

export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/search/suggestions', {
    params: { query }
  });
  return response.data;
}; 