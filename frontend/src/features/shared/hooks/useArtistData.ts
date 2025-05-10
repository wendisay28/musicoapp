import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import type { Artist } from '@/types/artist';

interface UseArtistDataOptions {
  artistId: string;
  includeServices?: boolean;
  includeReviews?: boolean;
  includeGallery?: boolean;
  includeAvailability?: boolean;
}

interface ArtistData {
  profile: Artist;
  services: any[];
  reviews: any[];
  gallery: any[];
  availability: any[];
}

/**
 * Hook para obtener los datos de un artista
 * Permite especificar qué datos incluir en la respuesta
 */
export function useArtistData({
  artistId,
  includeServices = false,
  includeReviews = false,
  includeGallery = false,
  includeAvailability = false,
}: UseArtistDataOptions) {
  const [data, setData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [profileRes, servicesRes, reviewsRes, galleryRes, availabilityRes] = await Promise.all([
          apiRequest<Artist>({ method: 'GET', url: `/api/artists/${artistId}` }),
          includeServices ? apiRequest<any[]>({ method: 'GET', url: `/api/artists/${artistId}/services` }) : null,
          includeReviews ? apiRequest<any[]>({ method: 'GET', url: `/api/artists/${artistId}/reviews` }) : null,
          includeGallery ? apiRequest<any[]>({ method: 'GET', url: `/api/artists/${artistId}/gallery` }) : null,
          includeAvailability ? apiRequest<any[]>({ method: 'GET', url: `/api/artists/${artistId}/availability` }) : null,
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
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch artist data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [artistId, includeServices, includeReviews, includeGallery, includeAvailability]);

  return { data, loading, error };
} 