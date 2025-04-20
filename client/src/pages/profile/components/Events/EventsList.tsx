import { Calendar, Plus } from 'lucide-react';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';
import { EventCard } from './EventCard';
import { Button } from '@/components/ui/button';
import { useEvents } from '../../hooks/useEvents';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

/**
 * Componente que muestra la lista de eventos del usuario
 * Maneja los estados de carga y vacío
 */
export function EventsList() {
  const { events, isLoading, isEmpty } = useEvents();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Mis Eventos
        </h2>
        <Button asChild>
          <Link href="/events/create">
            <Plus className="h-4 w-4 mr-2" />
            Crear evento
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={`event-skeleton-${i}`} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      ) : isEmpty ? (
        <EmptyEventsState />
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Componente para mostrar cuando no hay eventos
 */
function EmptyEventsState() {
  return (
    <Card>
      <CardContent className="py-8 text-center">
        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <CardTitle className="text-xl mb-2">No tienes eventos creados</CardTitle>
        <p className="text-muted-foreground mb-6">
          Crea tu primer evento para compartirlo con la comunidad
        </p>
        <Button asChild>
          <Link href="/events/create">
            <Plus className="h-4 w-4 mr-2" />
            Crear evento
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}