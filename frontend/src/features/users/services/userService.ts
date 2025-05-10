import { api } from './api';
/**
 * Obtiene un usuario por su ID
 */
export const getUser: any = async (id) => {
    try {
        const response: any = await api.get(`/users/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener el usuario');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener el usuario: ${error.message}`);
        }
        throw new Error('Error al obtener el usuario');
    }
};
/**
 * Obtiene un usuario artista por su ID
 */
export const getArtistUser: any = async (id) => {
    try {
        const response: any = await api.get(`/users/${id}/artist`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener el usuario artista');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener el usuario artista: ${error.message}`);
        }
        throw new Error('Error al obtener el usuario artista');
    }
};
/**
 * Obtiene una lista paginada de usuarios
 */
export const getUsers: any = async (params) => {
    try {
        const response: any = await api.get('/users', { params });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener los usuarios');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener los usuarios: ${error.message}`);
        }
        throw new Error('Error al obtener los usuarios');
    }
};
/**
 * Actualiza un usuario existente
 */
export const updateUser: any = async (id, data) => {
    try {
        const response: any = await api.put(`/users/${id}`, data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al actualizar el usuario');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
        throw new Error('Error al actualizar el usuario');
    }
};
/**
 * Elimina un usuario
 */
export const deleteUser: any = async (id) => {
    try {
        const response: any = await api.delete(`/users/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar el usuario');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
        throw new Error('Error al eliminar el usuario');
    }
};
