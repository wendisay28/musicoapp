/**
 * Hook personalizado para manejar la obtención de datos del artista
 * Centraliza las llamadas API para el perfil del artista
 */

import { useQuery } from "@tanstack/react-query";
import { Artist, Service, Review } from "../types/artist-profile";

export const useArtistData = (id: string) => {
  const artistQuery = useQuery<Artist>({
    queryKey: ['/api/artists', id],
    throwOnError: false,
  });
  
  const servicesQuery = useQuery<Service[]>({
    queryKey: ['/api/artists', id, 'services'],
    throwOnError: false,
  });
  
  const reviewsQuery = useQuery<Review[]>({
    queryKey: ['/api/artists', id, 'reviews'],
    throwOnError: false,
  });

  return {
    artist: artistQuery.data,
    services: servicesQuery.data,
    reviews: reviewsQuery.data,
    isLoading: artistQuery.isLoading,
    error: artistQuery.error || servicesQuery.error || reviewsQuery.error
  };
};