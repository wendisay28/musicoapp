import { useState, useEffect, useCallback } from 'react';
import { Event } from '../../types';

export function useEventDetails(eventId: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Reemplazar con llamada real a la API
      const mockEvent: Event = {
        id: eventId,
        title: 'Exposición de Arte Contemporáneo',
        description: 'Una muestra de los artistas más destacados de la ciudad, incluyendo obras de pintura, escultura y arte digital.',
        date: '2024-03-15',
        time: '19:00',
        location: 'Museo de Arte Moderno, Calle Principal 123',
        imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3',
        organizer: {
          id: '1',
          name: 'Asociación de Artistas Locales',
          email: 'contacto@artistaslocales.com',
          avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
          bio: 'Organización dedicada a promover el arte local'
        },
        price: 15,
        capacity: 100,
        status: 'published', // Cambiado a uno de los valores permitidos
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        attendees: [
          {
            id: '1',
            name: 'Juan Pérez',
            email: 'juan@example.com',
            avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
            status: 'confirmed'
          }
        ]
      };
      
      setEvent(mockEvent);
    } catch (err) {
      setError('Error al cargar los detalles del evento');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId, fetchEvent]);

  const reserveTicket = useCallback(async (userId: string): Promise<boolean> => {
    try {
      if (!eventId) {
        throw new Error('No event ID provided');
      }
      
      // TODO: Implementar la llamada a la API para reservar el ticket
      console.log(`Reservando ticket para el usuario ${userId} en el evento ${eventId}`);
      return true;
    } catch (err) {
      console.error('Error al reservar el ticket:', err);
      return false;
    }
  }, [eventId]);

  return {
    event,
    loading,
    error,
    reserveTicket,
    refetch: fetchEvent
  };
}