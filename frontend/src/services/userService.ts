import { api } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'artist' | 'client' | 'admin';
  profileImage?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  portfolio?: {
    id: string;
    title: string;
    description: string;
    images: string[];
  }[];
  reviews?: {
    id: string;
    rating: number;
    comment: string;
    reviewerId: string;
    createdAt: string;
  }[];
  stats?: {
    totalOrders: number;
    completedOrders: number;
    averageRating: number;
  };
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  bio?: string;
  profileImage?: string;
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const getUserProfile = async (id: string): Promise<UserProfile> => {
  const response = await api.get<UserProfile>(`/users/${id}/profile`);
  return response.data;
};

export const updateUser = async (data: UpdateUserData): Promise<User> => {
  const response = await api.put<User>('/users/me', data);
  return response.data;
};

export const uploadProfileImage = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post<{ url: string }>('/users/me/profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteAccount = async (): Promise<void> => {
  await api.delete('/users/me');
}; 