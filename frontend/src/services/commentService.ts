import { apiClient } from '@/lib/api';
import { User } from './userService';

export interface Comment {
  id: string;
  content: string;
  userId: string;
  entityId: string;
  entityType: 'portfolio' | 'post';
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentWithUser extends Comment {
  user: User;
  replies?: CommentWithUser[];
}

export interface CreateCommentData {
  content: string;
  entityId: string;
  entityType: 'portfolio' | 'post';
  parentId?: string;
}

export interface UpdateCommentData {
  content: string;
}

export const getComments = async (entityId: string, entityType: 'portfolio' | 'post'): Promise<CommentWithUser[]> => {
  const response = await apiClient.get<CommentWithUser[]>('/comments', {
    params: { entityId, entityType }
  });
  return response.data;
};

export const createComment = async (data: CreateCommentData): Promise<CommentWithUser> => {
  const response = await apiClient.post<CommentWithUser>('/comments', data);
  return response.data;
};

export const updateComment = async (id: string, data: UpdateCommentData): Promise<CommentWithUser> => {
  const response = await apiClient.put<CommentWithUser>(`/comments/${id}`, data);
  return response.data;
};

export const deleteComment = async (id: string): Promise<void> => {
  await apiClient.delete(`/comments/${id}`);
};

export const getCommentReplies = async (commentId: string): Promise<CommentWithUser[]> => {
  const response = await apiClient.get<CommentWithUser[]>(`/comments/${commentId}/replies`);
  return response.data;
};

export const getCommentCount = async (entityId: string, entityType: 'portfolio' | 'post'): Promise<number> => {
  const response = await apiClient.get<{ count: number }>(`/comments/count`, {
    params: { entityId, entityType }
  });
  return response.data.count;
}; 