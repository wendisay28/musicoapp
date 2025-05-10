import { useState, useCallback } from 'react';
import { Artist, CreateArtistData, UpdateArtistData } from '../types/artist';
import { PaginatedResponse } from '../types/common';
import * as artistService from '../services/artistService';

interface UseArtistsReturn {
  artists: Artist[];
  loading: boolean;
  error: string | null;
  fetchArtists: (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => Promise<void>;
  getArtist: (id: string) => Promise<Artist>;
  createArtist: (data: CreateArtistData) => Promise<void>;
  updateArtist: (id: string, data: UpdateArtistData) => Promise<void>;
  deleteArtist: (id: string) => Promise<void>;
}

export const useArtists = (): UseArtistsReturn => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArtists = useCallback(async (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await artistService.getArtists(params);
      setArtists(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener los artistas');
    } finally {
      setLoading(false);
    }
  }, []);

  const getArtist = useCallback(async (id: string): Promise<Artist> => {
    try {
      setLoading(true);
      setError(null);
      const artist = await artistService.getArtist(id);
      return artist;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el artista');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createArtist = useCallback(async (data: CreateArtistData) => {
    try {
      setLoading(true);
      setError(null);
      await artistService.createArtist(data);
      await fetchArtists();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el artista');
    } finally {
      setLoading(false);
    }
  }, [fetchArtists]);

  const updateArtist = useCallback(async (id: string, data: UpdateArtistData) => {
    try {
      setLoading(true);
      setError(null);
      await artistService.updateArtist(id, data);
      await fetchArtists();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el artista');
    } finally {
      setLoading(false);
    }
  }, [fetchArtists]);

  const deleteArtist = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await artistService.deleteArtist(id);
      await fetchArtists();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el artista');
    } finally {
      setLoading(false);
    }
  }, [fetchArtists]);

  return {
    artists,
    loading,
    error,
    fetchArtists,
    getArtist,
    createArtist,
    updateArtist,
    deleteArtist,
  };
}; 