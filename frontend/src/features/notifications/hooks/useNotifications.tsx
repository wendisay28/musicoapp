import React from 'react';
import { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, } from '../services/notificationService';
export const useNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getNotifications();
            setNotifications(data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar las notificaciones');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchNotifications();
    }, []);
    const handleMarkAsRead = async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId);
            setNotifications((prev) => prev.map((notification) => notification.id === notificationId
                ? { ...notification, read: true }
                : notification));
        }
        catch (err) {
            throw new Error(err instanceof Error ? err.message : 'Error al marcar la notificación como leída');
        }
    };
    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();
            setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
        }
        catch (err) {
            throw new Error(err instanceof Error
                ? err.message
                : 'Error al marcar todas las notificaciones como leídas');
        }
    };
    return {
        notifications,
        loading,
        error,
        markAsRead: handleMarkAsRead,
        markAllAsRead: handleMarkAllAsRead,
        refresh: fetchNotifications,
    };
};
