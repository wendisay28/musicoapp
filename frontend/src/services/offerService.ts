import { api } from '@/lib/api';

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  createdAt: string;
  updatedAt: string;
  artistId: string;
  clientId: string;
}

export interface CreateOfferData {
  title: string;
  description: string;
  price: number;
  artistId: string;
}

export interface UpdateOfferData {
  title?: string;
  description?: string;
  price?: number;
  status?: Offer['status'];
}

export interface CounterOfferData {
  offerId: string;
  price: number;
  message?: string;
}

export const createOffer = async (offerData: CreateOfferData): Promise<Offer> => {
  const response = await api.post<Offer>('/offers', offerData);
  return response.data;
};

export const getOffers = async (): Promise<Offer[]> => {
  const response = await api.get<Offer[]>('/offers');
  return response.data;
};

export const getOfferById = async (id: string): Promise<Offer> => {
  const response = await api.get<Offer>(`/offers/${id}`);
  return response.data;
};

export const updateOffer = async (id: string, offerData: UpdateOfferData): Promise<Offer> => {
  const response = await api.put<Offer>(`/offers/${id}`, offerData);
  return response.data;
};

export const deleteOffer = async (id: string): Promise<void> => {
  await api.delete(`/offers/${id}`);
};

export const acceptOffer = async (id: string): Promise<Offer> => {
  const response = await api.post<Offer>(`/offers/${id}/accept`);
  return response.data;
};

export const rejectOffer = async (id: string): Promise<Offer> => {
  const response = await api.post<Offer>(`/offers/${id}/reject`);
  return response.data;
};

export const sendCounterOffer = async (data: CounterOfferData): Promise<Offer> => {
  const response = await api.post<Offer>(`/offers/${data.offerId}/counter`, data);
  return response.data;
};

export const getUserOffers = async (): Promise<Offer[]> => {
  const response = await api.get<Offer[]>('/offers/user');
  return response.data;
};
