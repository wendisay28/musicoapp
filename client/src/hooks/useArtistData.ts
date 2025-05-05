import { useQuery } from "@tanstack/react-query";
import { ArtistProfile, ArtistService, ArtistReview, MediaItem, ArtistAvailability } from "../types/artist";
import { apiRequest } from "../lib/queryClient";

interface UseArtistDataProps {
  artistId: string;
}

export const useArtistData = ({ artistId }: UseArtistDataProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['artist-data', artistId],
    queryFn: async () => {
      const [profileRes, servicesRes, reviewsRes, galleryRes, availabilityRes] = await Promise.all([
        apiRequest('GET', `/api/artists/${artistId}`),
        apiRequest('GET', `/api/artists/${artistId}/services`),
        apiRequest('GET', `/api/artists/${artistId}/reviews`),
        apiRequest('GET', `/api/artists/${artistId}/gallery`),
        apiRequest('GET', `/api/artists/${artistId}/availability`)
      ]);

      return {
        profile: await profileRes.json(),
        services: await servicesRes.json(),
        reviews: await reviewsRes.json(),
        gallery: await galleryRes.json(),
        availability: await availabilityRes.json()
      };
    },
    enabled: !!artistId,
  });

  return {
    artist: data?.profile,
    services: data?.services || [],
    reviews: data?.reviews || [],
    gallery: data?.gallery || [],
    availability: data?.availability || [],
    loading: isLoading,
    error: error as Error | null
  };
}; 