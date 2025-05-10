import { api } from '@/lib/api';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface CreatePaymentMethodData {
  type: 'card' | 'bank_account';
  token: string;
  isDefault?: boolean;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  paymentMethodId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentData {
  amount: number;
  currency: string;
  paymentMethodId: string;
  orderId: string;
}

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await api.get<PaymentMethod[]>('/payments/methods');
  return response.data;
};

export const addPaymentMethod = async (data: CreatePaymentMethodData): Promise<PaymentMethod> => {
  const response = await api.post<PaymentMethod>('/payments/methods', data);
  return response.data;
};

export const removePaymentMethod = async (id: string): Promise<void> => {
  await api.delete(`/payments/methods/${id}`);
};

export const setDefaultPaymentMethod = async (id: string): Promise<PaymentMethod> => {
  const response = await api.put<PaymentMethod>(`/payments/methods/${id}/default`);
  return response.data;
};

export const createPayment = async (data: CreatePaymentData): Promise<Payment> => {
  const response = await api.post<Payment>('/payments', data);
  return response.data;
};

export const getPayment = async (id: string): Promise<Payment> => {
  const response = await api.get<Payment>(`/payments/${id}`);
  return response.data;
};

export const refundPayment = async (id: string): Promise<Payment> => {
  const response = await api.post<Payment>(`/payments/${id}/refund`);
  return response.data;
};

export const getPaymentHistory = async (page = 1, limit = 10): Promise<{ payments: Payment[]; total: number }> => {
  const response = await api.get<{ payments: Payment[]; total: number }>('/payments/history', {
    params: { page, limit }
  });
  return response.data;
}; 