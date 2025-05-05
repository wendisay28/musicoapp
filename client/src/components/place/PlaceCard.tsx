import { Place } from '@/types/artist';
import { BaseCard } from '@/components/common/BaseCard';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
  onViewDetails?: () => void;
  onBook?: () => void;
}

export function PlaceCard({ place, onViewDetails, onBook }: PlaceCardProps) {
  const footer = (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{place.location.city}</span>
        {place.rating && (
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">{place.rating}</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onViewDetails}>
          Ver Detalles
        </Button>
        <Button size="sm" onClick={onBook}>
          Reservar
        </Button>
      </div>
    </div>
  );

  return (
    <BaseCard
      id={place.id}
      title={place.name}
      description={place.description}
      imageUrl={place.imageURL || ''}
      footer={footer}
      onClick={onViewDetails}
    />
  );
} 