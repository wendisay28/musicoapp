import { QueryClient } from '@tanstack/react-query';
import { api } from './api';
import { handleApiError } from './error-handler';
import { ApiResponse } from '@/types/common';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export async function apiRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any
): Promise<T> {
  try {
    const response = await api.request<ApiResponse<T>>({
      method,
      url,
      data,
    });

    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
} 