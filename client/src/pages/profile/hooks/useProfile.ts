import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { UserData, ArtistProfile } from '../types';
import { useCallback } from 'react';

interface UseProfileReturn {
  userId: string;
  isLoading: boolean;
  hasArtistProfile: boolean; // Propiedad explícita
  userData?: UserData;
  artistProfile?: ArtistProfile | null;
  error: unknown;
  refetchProfile: () => Promise<void>;
}

/**
 * Hook para obtener y manejar los datos del perfil del usuario
 * 
 * @param {string} userId - ID del usuario
 * @returns {Object} Retorna:
 * - userId: ID del usuario
 * - isLoading: Estado de carga combinado
 * - hasArtistProfile: Si el usuario tiene perfil artístico
 * - userData: Datos básicos del usuario
 * - artistProfile: Perfil artístico (null si no existe)
 * - error: Error de las consultas
 * - refetchProfile: Función para revalidar los datos
 */
export function useProfile(userId: string): UseProfileReturn {
  const queryKeys = {
    userProfile: ['user-profile', userId] as const,
    artistProfile: ['artist-profile', userId] as const
  };

  // Función para obtener datos de usuario
  const fetchUserProfile = useCallback(async (): Promise<UserData> => {
    const response = await apiRequest(
      'GET', 
      `/api/users/${userId}/profile`
    );
    const json = await response.json();
    return json.data;
  }, [userId]);

  // Función para obtener perfil artístico
  const fetchArtistProfile = useCallback(async (): Promise<ArtistProfile | null> => {
    try {
      const response = await apiRequest(
        'GET', 
        `/api/users/${userId}/artist-profile`
      );
      const json = await response.json();
      return json.data;
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  }, [userId]);

  // Query para datos de usuario
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser
  } = useQuery<UserData>({
    queryKey: queryKeys.userProfile,
    queryFn: fetchUserProfile,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5 // 5 minutos de cache
  });

  // Query para perfil artístico
  const {
    data: artistProfile,
    isLoading: isLoadingArtist,
    error: artistError,
    refetch: refetchArtist
  } = useQuery<ArtistProfile | null>({
    queryKey: queryKeys.artistProfile,
    queryFn: fetchArtistProfile,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  });

  // Función para revalidar ambos perfiles
  const refetchProfile = useCallback(async () => {
    await Promise.all([refetchUser(), refetchArtist()]);
  }, [refetchUser, refetchArtist]);

  return {
    userId,
    isLoading: isLoadingUser || isLoadingArtist,
    hasArtistProfile: !!artistProfile, // Propiedad explícita en el objeto de retorno
    userData,
    artistProfile,
    error: userError || artistError,
    refetchProfile
  };
}