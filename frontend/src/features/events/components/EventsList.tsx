import { Card, CardContent } from '@/features/shared/components/ui/card';
import { Calendar, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Lista de eventos con información básica
 *
 * @example
 * ```tsx
 * <EventsList
 *   events={events}
 *   onSelect={handleSelect}
 * />
 * ```
 */
interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: { id: string }[];
}

interface EventsListProps {
  events: Event[];
  onSelect?: (event: Event) => void;
  className?: string;
}

export function EventsList({ events, onSelect, className }: EventsListProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {events.map((event) => (
        <Card
          key={event.id}
          className="cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => onSelect?.(event)}
        >
          <CardContent className="p-4">
            <h3 className="font-semibold">{event.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{event.attendees.length} asistentes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
