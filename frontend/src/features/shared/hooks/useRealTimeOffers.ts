import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import type { RequestOffer } from '@/types/offers';

export function useRealTimeOffers() {
  const [offers, setOffers] = useState<RequestOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        setLoading(true);
        const response = await apiRequest<RequestOffer[]>({
          method: 'GET',
          url: '/api/service-requests',
        });
        setOffers(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch offers'));
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  const createOffer = async (data: Partial<RequestOffer>) => {
    try {
      const response = await apiRequest<RequestOffer>({
        method: 'POST',
        url: '/api/service-requests',
        data,
      });
      if (!response.data) {
        throw new Error('Failed to create offer: No data returned');
      }
      const newOffer = response.data;
      setOffers((prev) => [...prev, newOffer]);
      return newOffer;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create offer'));
      throw err;
    }
  };

  const updateOfferStatus = async (requestId: string, responseId: string, status: string) => {
    try {
      const response = await apiRequest<RequestOffer>({
        method: 'PUT',
        url: `/api/service-requests/${requestId}/responses/${responseId}`,
        data: { status },
      });
      if (!response.data) {
        throw new Error('Failed to update offer status: No data returned');
      }
      const updatedOffer = response.data;
      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === requestId ? { ...offer, status: updatedOffer.status } : offer
        )
      );
      return updatedOffer;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update offer status'));
      throw err;
    }
  };

  return {
    offers,
    loading,
    error,
    createOffer,
    updateOfferStatus,
  };
} 