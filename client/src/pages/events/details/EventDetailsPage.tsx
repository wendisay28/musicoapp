import React from 'react';
import { useParams } from 'react-router-dom';
import { useEvent } from '../hooks/useEvent';
import { EventHeader } from './components/EventHeader';
import { Card } from '../../../components/ui/card';
import { GridList } from '../../../components/ui/GridList';
import { formatDate, formatTime, formatPrice } from '../../../lib/format';

export function EventDetailsPage() {
  const { id } = useParams();
  const { event, loading, error } = useEvent(id || '');

  if (loading) return <p>Cargando evento...</p>;
  if (error || !event) return <p>Error al cargar el evento.</p>;

  return (
    <div className="space-y-4">
      <EventHeader event={event} />
      
      <Card
        title="Información del Evento"
        imageUrl={event.imageUrl}
      >
        <>
          <p className="mb-4">{event.description}</p>
          <div className="space-y-2">
            <p><strong>Fecha:</strong> {formatDate(event.date)}</p>
            <p><strong>Hora:</strong> {formatTime(event.time)}</p>
            <p><strong>Ubicación:</strong> {event.location}</p>
            <p><strong>Precio:</strong> {formatPrice(event.price)}</p>
            <p><strong>Capacidad:</strong> {event.capacity} personas</p>
          </div>
        </>
      </Card>

      <Card title="Asistentes">
        <GridList
          items={event.attendees}
          renderItem={(attendee) => (
            <div className="flex items-center gap-2">
              <img
                src={attendee.avatarUrl || '/default-avatar.png'}
                alt={attendee.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{attendee.name}</p>
                <p className="text-sm text-muted-foreground">{attendee.email}</p>
              </div>
            </div>
          )}
          gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        />
      </Card>

      <Card title="Organizador">
        <div className="flex items-center gap-4">
          <img
            src={event.organizer.avatarUrl || '/default-avatar.png'}
            alt={event.organizer.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{event.organizer.name}</h3>
            <p className="text-muted-foreground">{event.organizer.email}</p>
            {event.organizer.bio && (
              <p className="mt-2 text-sm">{event.organizer.bio}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}