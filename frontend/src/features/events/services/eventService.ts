import { api } from './api';
/**
 * Obtiene un evento por su ID
 */
export const getEvent: any = async (id) => {
    try {
        const response: any = await api.get(`/events/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener el evento');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener el evento: ${error.message}`);
        }
        throw new Error('Error al obtener el evento');
    }
};
/**
 * Obtiene una lista paginada de eventos
 */
export const getEvents: any = async (params) => {
    try {
        const response: any = await api.get('/events', { params });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener los eventos');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener los eventos: ${error.message}`);
        }
        throw new Error('Error al obtener los eventos');
    }
};
/**
 * Crea un nuevo evento
 */
export const createEvent: any = async (data) => {
    try {
        const response: any = await api.post('/events', data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al crear el evento');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al crear el evento: ${error.message}`);
        }
        throw new Error('Error al crear el evento');
    }
};
/**
 * Actualiza un evento existente
 */
export const updateEvent: any = async (id, data) => {
    try {
        const response: any = await api.put(`/events/${id}`, data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al actualizar el evento');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al actualizar el evento: ${error.message}`);
        }
        throw new Error('Error al actualizar el evento');
    }
};
/**
 * Elimina un evento
 */
export const deleteEvent: any = async (id) => {
    try {
        const response: any = await api.delete(`/events/${id}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar el evento');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar el evento: ${error.message}`);
        }
        throw new Error('Error al eliminar el evento');
    }
};
/**
 * Reserva un evento
 */
export const reserveEvent: any = async (eventId) => {
    try {
        const response: any = await api.post(`/events/${eventId}/reserve`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al reservar el evento');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al reservar el evento: ${error.message}`);
        }
        throw new Error('Error al reservar el evento');
    }
};
