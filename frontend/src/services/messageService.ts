import { apiClient } from '@/lib/api';
import { User } from './userService';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  read: boolean;
  createdAt: string;
}

export interface MessageWithUsers extends Message {
  sender: User;
  receiver: User;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: MessageWithUsers;
  unreadCount: number;
  updatedAt: string;
}

export interface SendMessageData {
  content: string;
  receiverId: string;
}

export const getConversations = async (page = 1, limit = 20): Promise<{ conversations: Conversation[]; total: number }> => {
  const response = await apiClient.get<{ conversations: Conversation[]; total: number }>('/messages/conversations', {
    params: { page, limit }
  });
  return response.data;
};

export const getConversation = async (userId: string): Promise<Conversation> => {
  const response = await apiClient.get<Conversation>(`/messages/conversations/${userId}`);
  return response.data;
};

export const getMessages = async (userId: string, page = 1, limit = 50): Promise<{ messages: MessageWithUsers[]; total: number }> => {
  const response = await apiClient.get<{ messages: MessageWithUsers[]; total: number }>(`/messages/${userId}`, {
    params: { page, limit }
  });
  return response.data;
};

export const sendMessage = async (data: SendMessageData): Promise<MessageWithUsers> => {
  const response = await apiClient.post<MessageWithUsers>('/messages', data);
  return response.data;
};

export const markMessagesAsRead = async (userId: string): Promise<void> => {
  await apiClient.put(`/messages/${userId}/read`);
};

export const deleteMessage = async (id: string): Promise<void> => {
  await apiClient.delete(`/messages/${id}`);
};

export const deleteConversation = async (userId: string): Promise<void> => {
  await apiClient.delete(`/messages/conversations/${userId}`);
};

export const getUnreadCount = async (): Promise<number> => {
  const response = await apiClient.get<{ count: number }>('/messages/unread-count');
  return response.data.count;
}; 