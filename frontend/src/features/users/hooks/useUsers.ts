import { useState, useCallback } from 'react';
import { User, ArtistUser } from '../types/user';
import { PaginatedResponse } from '../types/common';
import * as userService from '../services/userService';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => Promise<void>;
  getUser: (id: string) => Promise<User>;
  getArtistUser: (id: string) => Promise<ArtistUser>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers(params);
      setUsers(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener los usuarios');
    } finally {
      setLoading(false);
    }
  }, []);

  const getUser = useCallback(async (id: string): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const user = await userService.getUser(id);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getArtistUser = useCallback(async (id: string): Promise<ArtistUser> => {
    try {
      setLoading(true);
      setError(null);
      const artistUser = await userService.getArtistUser(id);
      return artistUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el usuario artista');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      await userService.updateUser(id, data);
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el usuario');
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  const deleteUser = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await userService.deleteUser(id);
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el usuario');
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    getUser,
    getArtistUser,
    updateUser,
    deleteUser,
  };
}; 