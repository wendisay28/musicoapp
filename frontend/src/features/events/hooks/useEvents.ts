import { useState, useCallback } from 'react';
import { Event, EventFormData, EventReservation } from '../types/event';
import { PaginatedResponse } from '../types/common';
import * as eventService from '../services/eventService';

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    category?: string;
    status?: string;
  }) => Promise<void>;
  createEvent: (data: EventFormData) => Promise<void>;
  updateEvent: (id: string, data: Partial<EventFormData>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  reserveEvent: (eventId: string) => Promise<void>;
}

export const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (params?: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    category?: string;
    status?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventService.getEvents(params);
      setEvents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener los eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (data: EventFormData) => {
    try {
      setLoading(true);
      setError(null);
      await eventService.createEvent(data);
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el evento');
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  const updateEvent = useCallback(async (id: string, data: Partial<EventFormData>) => {
    try {
      setLoading(true);
      setError(null);
      await eventService.updateEvent(id, data);
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el evento');
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  const deleteEvent = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await eventService.deleteEvent(id);
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el evento');
    } finally {
      setLoading(false);
    }
  }, [fetchEvents]);

  const reserveEvent = useCallback(async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);
      await eventService.reserveEvent(eventId);
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al reservar el evento');
    } finally {
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