import { api } from './api';
/**
 * Obtiene la disponibilidad de un usuario
 * @param userId ID del usuario
 * @returns Objeto de disponibilidad
 */
export const getAvailability: any = async (userId) => {
    try {
        const response: any = await api.get(`/availability/${userId}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener la disponibilidad');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener la disponibilidad: ${error.message}`);
        }
        throw new Error('Error al obtener la disponibilidad');
    }
};
/**
 * Actualiza la disponibilidad de un usuario
 * @param userId ID del usuario
 * @param data Datos de disponibilidad a actualizar
 * @returns Objeto de disponibilidad actualizado
 */
export const updateAvailability: any = async (userId, data) => {
    try {
        const response: any = await api.patch(`/availability/${userId}`, data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al actualizar la disponibilidad');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al actualizar la disponibilidad: ${error.message}`);
        }
        throw new Error('Error al actualizar la disponibilidad');
    }
};
/**
 * Agrega un horario a un día específico
 * @param userId ID del usuario
 * @param day Día de la semana
 * @param timeSlot Horario a agregar
 * @returns Objeto de disponibilidad actualizado
 */
export const addTimeSlot: any = async (userId, day, timeSlot) => {
    try {
        const response: any = await api.post(`/availability/${userId}/timeslots`, { day, timeSlot });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al agregar el horario');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al agregar el horario: ${error.message}`);
        }
        throw new Error('Error al agregar el horario');
    }
};
/**
 * Elimina un horario de un día específico
 * @param userId ID del usuario
 * @param day Día de la semana
 * @param timeSlot Horario a eliminar
 * @returns Objeto de disponibilidad actualizado
 */
export const removeTimeSlot: any = async (userId, day, timeSlot) => {
    try {
        const response: any = await api.delete(`/availability/${userId}/timeslots`, {
            params: { day, timeSlot }
        });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar el horario');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar el horario: ${error.message}`);
        }
        throw new Error('Error al eliminar el horario');
    }
};
/**
 * Agrega una fecha bloqueada
 * @param userId ID del usuario
 * @param date Fecha a bloquear
 * @returns Objeto de disponibilidad actualizado
 */
export const addBlockedDate: any = async (userId, date) => {
    try {
        const response: any = await api.post(`/availability/${userId}/blocked-dates`, { date });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al agregar la fecha bloqueada');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al agregar la fecha bloqueada: ${error.message}`);
        }
        throw new Error('Error al agregar la fecha bloqueada');
    }
};
/**
 * Elimina una fecha bloqueada
 * @param userId ID del usuario
 * @param date Fecha a desbloquear
 * @returns Objeto de disponibilidad actualizado
 */
export const removeBlockedDate: any = async (userId, date) => {
    try {
        const response: any = await api.delete(`/availability/${userId}/blocked-dates`, {
            params: { date }
        });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar la fecha bloqueada');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar la fecha bloqueada: ${error.message}`);
        }
        throw new Error('Error al eliminar la fecha bloqueada');
    }
};
/**
 * Agrega una fecha disponible
 * @param userId ID del usuario
 * @param date Fecha a marcar como disponible
 * @returns Objeto de disponibilidad actualizado
 */
export const addAvailableDate: any = async (userId, date) => {
    try {
        const response: any = await api.post(`/availability/${userId}/available-dates`, { date });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al agregar la fecha disponible');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al agregar la fecha disponible: ${error.message}`);
        }
        throw new Error('Error al agregar la fecha disponible');
    }
};
/**
 * Elimina una fecha disponible
 * @param userId ID del usuario
 * @param date Fecha a eliminar de disponibles
 * @returns Objeto de disponibilidad actualizado
 */
export const removeAvailableDate: any = async (userId, date) => {
    try {
        const response: any = await api.delete(`/availability/${userId}/available-dates`, {
            params: { date }
        });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar la fecha disponible');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar la fecha disponible: ${error.message}`);
        }
        throw new Error('Error al eliminar la fecha disponible');
    }
};
