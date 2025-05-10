import React from 'react';
import { useState, useCallback } from 'react';
import * as eventService from '../services/eventService';
export const useEvents: React.FC = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchEvents = useCallback(async (params) => {
        try {
            setLoading(true);
            setError(null);
            const response = await eventService.getEvents(params);
            setEvents(response.data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener los eventos');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const createEvent = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            await eventService.createEvent(data);
            await fetchEvents();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear el evento');
        }
        finally {
            setLoading(false);
        }
    }, [fetchEvents]);
    const updateEvent = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            await eventService.updateEvent(id, data);
            await fetchEvents();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar el evento');
        }
        finally {
            setLoading(false);
        }
    }, [fetchEvents]);
    const deleteEvent = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            await eventService.deleteEvent(id);
            await fetchEvents();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar el evento');
        }
        finally {
            setLoading(false);
        }
    }, [fetchEvents]);
    const reserveEvent = useCallback(async (eventId) => {
        try {
            setLoading(true);
            setError(null);
            await eventService.reserveEvent(eventId);
            await fetchEvents();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al reservar el evento');
        }
        finally {
            setLoading(false);
        }
    }, [fetchEvents]);
    return {
        events,
        loading,
        error,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        reserveEvent,
    };
};
