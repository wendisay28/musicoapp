import React from 'react';
import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
/**
 * Hook para obtener los datos de un artista
 * Permite especificar qué datos incluir en la respuesta
 */
export function useArtistData (props: any){ artistId, includeServices = false, includeReviews = false, includeGallery = false, includeAvailability = false, }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData (props: any)) {
            try {
                setLoading(true);
                const [profileRes, servicesRes, reviewsRes, galleryRes, availabilityRes] = await Promise.all([
                    apiRequest({ method: 'GET', url: `/api/artists/${artistId}` }),
                    includeServices ? apiRequest({ method: 'GET', url: `/api/artists/${artistId}/services` }) : null,
                    includeReviews ? apiRequest({ method: 'GET', url: `/api/artists/${artistId}/reviews` }) : null,
                    includeGallery ? apiRequest({ method: 'GET', url: `/api/artists/${artistId}/gallery` }) : null,
                    includeAvailability ? apiRequest({ method: 'GET', url: `/api/artists/${artistId}/availability` }) : null,
                ]);
                if (!profileRes.data) {
                    throw new Error('Artist not found');
                }
                setData({
                    profile: profileRes.data,
                    services: servicesRes?.data || [],
                    reviews: reviewsRes?.data || [],
                    gallery: galleryRes?.data || [],
                    availability: availabilityRes?.data || [],
                });
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch artist data'));
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [artistId, includeServices, includeReviews, includeGallery, includeAvailability]);
    return { data, loading, error };
}
