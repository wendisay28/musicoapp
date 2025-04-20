import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Share, Edit, MapPin, Calendar, Users, Video } from 'lucide-react';
import { Link } from 'wouter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  eventType: 'virtual' | 'in-person';
  location?: {
    address: string;
    city: string;
    country: string;
  };
  virtualLink?: string;
  attendees?: number;
}

export function EventDetails({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const attendeesCount = event.attendees || 0;

  return (
    <div className="space-y-6">
      {/* Header con título y acciones */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{event.name}</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Share className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-initial">
            <Link href={`/events/${event.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      {/* Grid de información principal */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Tarjeta de detalles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalles del evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{format(eventDate, 'PPP')}</p>
                <p className="text-sm text-muted-foreground">
                  {format(eventDate, 'hh:mm a')}
                </p>
              </div>
            </div>

            {event.eventType === 'in-person' ? (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{event.location?.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.location?.city}, {event.location?.country}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Evento Virtual</p>
                  {event.virtualLink && (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary hover:text-primary/80"
                      asChild
                    >
                      <a href={event.virtualLink} target="_blank" rel="noopener noreferrer">
                        {event.virtualLink}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tarjeta de descripción */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Descripción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line text-muted-foreground">
              {event.description || 'No hay descripción disponible'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tarjeta de asistentes */}
      {attendeesCount > 0 && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Asistentes</span>
            </CardTitle>
            <Badge variant="outline">
              {attendeesCount} {attendeesCount === 1 ? 'confirmado' : 'confirmados'}
            </Badge>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}