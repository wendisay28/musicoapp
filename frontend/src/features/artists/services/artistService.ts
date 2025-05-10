import { api } from './api';
/**
 * Obtiene un artista por su ID
 */
export const getArtist: any = async (id) => {
    try {
        const response: any = await api.get(`/artists/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener el artista');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener el artista: ${error.message}`);
        }
        throw new Error('Error al obtener el artista');
    }
};
/**
 * Obtiene una lista paginada de artistas
 */
export const getArtists: any = async (params) => {
    try {
        const response: any = await api.get('/artists', { params });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener los artistas');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener los artistas: ${error.message}`);
        }
        throw new Error('Error al obtener los artistas');
    }
};
/**
 * Crea un nuevo artista
 */
export const createArtist: any = async (data) => {
    try {
        const response: any = await api.post('/artists', data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al crear el artista');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al crear el artista: ${error.message}`);
        }
        throw new Error('Error al crear el artista');
    }
};
/**
 * Actualiza un artista existente
 */
export const updateArtist: any = async (id, data) => {
    try {
        const response: any = await api.put(`/artists/${id}`, data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al actualizar el artista');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al actualizar el artista: ${error.message}`);
        }
        throw new Error('Error al actualizar el artista');
    }
};
/**
 * Elimina un artista
 */
export const deleteArtist: any = async (id) => {
    try {
        const response: any = await api.delete(`/artists/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar el artista');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar el artista: ${error.message}`);
        }
        throw new Error('Error al eliminar el artista');
    }
};
