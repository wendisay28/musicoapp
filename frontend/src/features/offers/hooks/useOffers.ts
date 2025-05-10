import { useState, useCallback } from 'react';
import { Offer, CreateOfferData, CounterOfferData, UserOffers } from '@/types/offer';
import { PaginatedResponse } from '@/types/common';
import * as offerService from '@/services/offerService';

export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [userOffers, setUserOffers] = useState<UserOffers | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene una lista paginada de ofertas
   */
  const fetchOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await offerService.getOffers();
      setOffers(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener las ofertas');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene una oferta por su ID
   */
  const fetchOffer = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const offer = await offerService.getOfferById(id);
      return offer;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener la oferta');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crea una nueva oferta
   */
  const createOffer = useCallback(async (data: CreateOfferData) => {
    try {
      setLoading(true);
      setError(null);
      const newOffer = await offerService.createOffer({
        ...data,
        status: 'PENDING'
      });
      setOffers(prev => [...prev, newOffer]);
      return newOffer;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la oferta');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Actualiza una oferta existente
   */
  const updateOffer = useCallback(async (id: string, data: Partial<CreateOfferData>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedOffer = await offerService.updateOffer(id, data);
      setOffers(prev => prev.map(offer => offer.id === id ? updatedOffer : offer));
      return updatedOffer;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la oferta');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Elimina una oferta
   */
  const deleteOffer = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await offerService.deleteOffer(id);
      setOffers(prev => prev.filter(offer => offer.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la oferta');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Envía una contraoferta
   */
  const sendCounterOffer = useCallback(async (data: CounterOfferData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedOffer = await offerService.sendCounterOffer(data);
      setOffers(prev => prev.map(offer => offer.id === data.offerId ? updatedOffer : offer));
      return updatedOffer;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar la contraoferta');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Obtiene las ofertas de un usuario
   */
  const fetchUserOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const offers = await offerService.getUserOffers();
      setUserOffers(offers);
      return offers;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener las ofertas del usuario');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    offers,
    userOffers,
    loading,
    error,
    fetchOffers,
    fetchOffer,
    createOffer,
    updateOffer,
    deleteOffer,
    sendCounterOffer,
    fetchUserOffers,
  };
}; 