import { api } from './api';
/**
 * Obtiene una reseña por su ID
 */
export const getReview: any = async (id) => {
    try {
        const response: any = await api.get(`/reviews/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener la reseña');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener la reseña: ${error.message}`);
        }
        throw new Error('Error al obtener la reseña');
    }
};
/**
 * Obtiene una lista paginada de reseñas
 */
export const getReviews: any = async (params) => {
    try {
        const response: any = await api.get('/reviews', { params });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener las reseñas');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener las reseñas: ${error.message}`);
        }
        throw new Error('Error al obtener las reseñas');
    }
};
/**
 * Crea una nueva reseña
 */
export const createReview: any = async (data) => {
    try {
        const response: any = await api.post('/reviews', data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al crear la reseña');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al crear la reseña: ${error.message}`);
        }
        throw new Error('Error al crear la reseña');
    }
};
/**
 * Actualiza una reseña existente
 */
export const updateReview: any = async (id, data) => {
    try {
        const response: any = await api.put(`/reviews/${id}`, data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al actualizar la reseña');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al actualizar la reseña: ${error.message}`);
        }
        throw new Error('Error al actualizar la reseña');
    }
};
/**
 * Elimina una reseña
 */
export const deleteReview: any = async (id) => {
    try {
        const response: any = await api.delete(`/reviews/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar la reseña');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar la reseña: ${error.message}`);
        }
        throw new Error('Error al eliminar la reseña');
    }
};
