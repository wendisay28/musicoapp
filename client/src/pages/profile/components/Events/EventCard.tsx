import { format } from 'date-fns';
import { Calendar, Check, Clock, MapPin, Video } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Event {
  id: string;
  name: string;
  date: string;
  image?: string;
  eventType: 'virtual' | 'in-person';
}

/**
 * Componente que muestra una tarjeta individual de evento
 * con toda la información relevante y acciones
 */
export function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Imagen del evento */}
          <div className="w-full sm:w-32 h-32 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={event.image || '/placeholder-event.jpg'}
              alt={event.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-medium text-lg line-clamp-1">{event.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>{format(eventDate, 'PPP')}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  {event.eventType === 'virtual' ? (
                    <>
                      <Video className="h-4 w-4 mr-1.5" />
                      <span>Evento virtual</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-1.5" />
                      <span>Evento presencial</span>
                    </>
                  )}
                </div>
              </div>

              <Badge
                variant={isPastEvent ? 'outline' : 'default'}
                className={isPastEvent ? 'opacity-80' : ''}
              >
                <div className="flex items-center">
                  {isPastEvent ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      <span>Realizado</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Próximo</span>
                    </>
                  )}
                </div>
              </Badge>
            </div>

            {/* Acciones */}
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/events/${event.id}/edit`}>Editar</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/events/${event.id}`}>Ver detalles</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}