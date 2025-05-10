import React from 'react';
import { useState, useCallback } from 'react';
import * as userService from '../services/userService';
export const useUsers: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchUsers = useCallback(async (params) => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getUsers(params);
            setUsers(response.data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener los usuarios');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const getUser = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const user = await userService.getUser(id);
            return user;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener el usuario');
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const getArtistUser = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const artistUser = await userService.getArtistUser(id);
            return artistUser;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener el usuario artista');
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const updateUser = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            await userService.updateUser(id, data);
            await fetchUsers();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar el usuario');
        }
        finally {
            setLoading(false);
        }
    }, [fetchUsers]);
    const deleteUser = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            await userService.deleteUser(id);
            await fetchUsers();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar el usuario');
        }
        finally {
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
