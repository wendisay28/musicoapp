import React from 'react';
import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
export function useRealTimeOffers (props: any)) {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchOffers (props: any)) {
            try {
                setLoading(true);
                const response = await apiRequest({
                    method: 'GET',
                    url: '/api/service-requests',
                });
                setOffers(response.data || []);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch offers'));
            }
            finally {
                setLoading(false);
            }
        }
        fetchOffers();
    }, []);
    const createOffer = async (data) => {
        try {
            const response = await apiRequest({
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
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to create offer'));
            throw err;
        }
    };
    const updateOfferStatus = async (requestId, responseId, status) => {
        try {
            const response = await apiRequest({
                method: 'PUT',
                url: `/api/service-requests/${requestId}/responses/${responseId}`,
                data: { status },
            });
            if (!response.data) {
                throw new Error('Failed to update offer status: No data returned');
            }
            const updatedOffer = response.data;
            setOffers((prev) => prev.map((offer) => offer.id === requestId ? { ...offer, status: updatedOffer.status } : offer));
            return updatedOffer;
        }
        catch (err) {
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
