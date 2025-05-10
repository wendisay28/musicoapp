import { api } from './api';
/**
 * Obtiene un servicio por su ID
 */
export const getService: any = async (id) => {
    try {
        const response: any = await api.get(`/services/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener el servicio');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener el servicio: ${error.message}`);
        }
        throw new Error('Error al obtener el servicio');
    }
};
/**
 * Obtiene una lista paginada de servicios
 */
export const getServices: any = async (params) => {
    try {
        const response: any = await api.get('/services', { params });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener los servicios');
        }
        return response.data.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener los servicios: ${error.message}`);
        }
        throw new Error('Error al obtener los servicios');
    }
};
/**
 * Crea un nuevo servicio
 */
export const createService: any = async (data) => {
    try {
        const response: any = await api.post('/services', data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al crear el servicio');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al crear el servicio: ${error.message}`);
        }
        throw new Error('Error al crear el servicio');
    }
};
/**
 * Actualiza un servicio existente
 */
export const updateService: any = async (id, data) => {
    try {
        const response: any = await api.put(`/services/${id}`, data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al actualizar el servicio');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al actualizar el servicio: ${error.message}`);
        }
        throw new Error('Error al actualizar el servicio');
    }
};
/**
 * Elimina un servicio
 */
export const deleteService: any = async (id) => {
    try {
        const response: any = await api.delete(`/services/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar el servicio');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar el servicio: ${error.message}`);
        }
        throw new Error('Error al eliminar el servicio');
    }
};
