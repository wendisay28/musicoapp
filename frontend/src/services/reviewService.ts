import { api } from '@/lib/api';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  reviewerId: string;
  artistId: string;
  orderId: string;
}

export interface CreateReviewData {
  rating: number;
  comment: string;
  artistId: string;
  orderId: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

export const createReview = async (data: CreateReviewData): Promise<Review> => {
  const response = await api.post<Review>('/reviews', data);
  return response.data;
};

export const getReviews = async (artistId: string, page = 1, limit = 10): Promise<{ reviews: Review[]; total: number }> => {
  const response = await api.get<{ reviews: Review[]; total: number }>(`/reviews/artist/${artistId}`, {
    params: { page, limit }
  });
  return response.data;
};

export const getReviewById = async (id: string): Promise<Review> => {
  const response = await api.get<Review>(`/reviews/${id}`);
  return response.data;
};

export const updateReview = async (id: string, data: UpdateReviewData): Promise<Review> => {
  const response = await api.put<Review>(`/reviews/${id}`, data);
  return response.data;
};

export const deleteReview = async (id: string): Promise<void> => {
  await api.delete(`/reviews/${id}`);
};

export const getUserReviews = async (): Promise<Review[]> => {
  const response = await api.get<Review[]>('/reviews/user');
  return response.data;
}; 