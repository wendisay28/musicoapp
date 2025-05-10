import { api } from './api';
const API_URL: any = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
// Obtener notificaciones del usuario
export const getNotifications: any = async () => {
    try {
        const response: any = await api.get('/notifications');
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Error al obtener las notificaciones');
        }
        throw new Error('Error al obtener las notificaciones');
    }
};
// Marcar una notificación como leída
export const markNotificationAsRead: any = async (notificationId) => {
    try {
        await api.patch(`/notifications/${notificationId}/read`);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Error al marcar la notificación como leída');
        }
        throw new Error('Error al marcar la notificación como leída');
    }
};
// Marcar todas las notificaciones como leídas
export const markAllNotificationsAsRead: any = async () => {
    try {
        await api.patch('/notifications/read-all');
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Error al marcar todas las notificaciones como leídas');
        }
        throw new Error('Error al marcar todas las notificaciones como leídas');
    }
};
