import { EventCardProps, CardFooterProps } from '@/types/cards';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export function EventCard({
  event,
  onViewDetails,
  onBook,
  showFavoriteButton = true,
  isFavorite = false,
  onToggleFavorite,
  className
}: EventCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.category}</p>
          </div>
          {showFavoriteButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className={cn(
                "text-muted-foreground hover:text-destructive",
                isFavorite && "text-destructive"
              )}
            >
              <Heart className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {format(event.date, "EEEE d 'de' MMMM", { locale: es })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <EventCardFooter
          onViewDetails={onViewDetails}
          onBook={onBook}
          showFavoriteButton={showFavoriteButton}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      </CardFooter>
    </Card>
  );
}

function EventCardFooter({
  onViewDetails,
  onBook,
  showFavoriteButton,
  isFavorite,
  onToggleFavorite
}: CardFooterProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-2">
        {onViewDetails && (
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            Ver detalles
          </Button>
        )}
        {onBook && (
          <Button size="sm" onClick={onBook}>
            Reservar
          </Button>
        )}
      </div>
    </div>
  );
} 