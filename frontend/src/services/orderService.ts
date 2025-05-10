import { api } from '@/lib/api';

export interface Order {
  id: string;
  title: string;
  description: string;
  price: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  clientId: string;
  artistId: string;
}

export interface CreateOrderData {
  title: string;
  description: string;
  price: number;
  deadline?: string;
  artistId: string;
}

export interface UpdateOrderData {
  title?: string;
  description?: string;
  price?: number;
  deadline?: string;
  status?: Order['status'];
}

export const createOrder = async (data: CreateOrderData): Promise<Order> => {
  const response = await api.post<Order>('/orders', data);
  return response.data;
};

export const getOrders = async (page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> => {
  const response = await api.get<{ orders: Order[]; total: number }>('/orders', {
    params: { page, limit }
  });
  return response.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await api.get<Order>(`/orders/${id}`);
  return response.data;
};

export const updateOrder = async (id: string, data: UpdateOrderData): Promise<Order> => {
  const response = await api.put<Order>(`/orders/${id}`, data);
  return response.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await api.delete(`/orders/${id}`);
};

export const getUserOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders/user');
  return response.data;
};

export const getArtistOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders/artist');
  return response.data;
}; 