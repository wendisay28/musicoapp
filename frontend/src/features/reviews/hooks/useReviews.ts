import { useState, useCallback } from 'react';
import { Review } from '../types/review';
import { PaginatedResponse } from '../types/common';
import * as reviewService from '../services/reviewService';

interface UseReviewsReturn {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  fetchReviews: (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    userId?: string;
  }) => Promise<void>;
  getReview: (id: string) => Promise<Review>;
  createReview: (data: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateReview: (id: string, data: Partial<Review>) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
}

export const useReviews = (): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    userId?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await reviewService.getReviews(params);
      setReviews(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener las reseñas');
    } finally {
      setLoading(false);
    }
  }, []);

  const getReview = useCallback(async (id: string): Promise<Review> => {
    try {
      setLoading(true);
      setError(null);
      const review = await reviewService.getReview(id);
      return review;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener la reseña');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createReview = useCallback(async (data: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      await reviewService.createReview(data);
      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la reseña');
    } finally {
      setLoading(false);
    }
  }, [fetchReviews]);

  const updateReview = useCallback(async (id: string, data: Partial<Review>) => {
    try {
      setLoading(true);
      setError(null);
      await reviewService.updateReview(id, data);
      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la reseña');
    } finally {
      setLoading(false);
    }
  }, [fetchReviews]);

  const deleteReview = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await reviewService.deleteReview(id);
      await fetchReviews();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la reseña');
    } finally {
      setLoading(false);
    }
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
  };
}; 