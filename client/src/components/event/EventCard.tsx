import { Event } from '@/types/artist';
import { BaseCard } from '@/components/common/BaseCard';
import { Button } from '@/components/ui/button';
import { Calendar,} from 'lucide-react';

interface EventCardProps {
  event: Event;
  onViewDetails?: () => void;
  onBook?: () => void;
}

export function EventCard({ event, onViewDetails, onBook }: EventCardProps) {
  const footer = (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">{new Date(event.startDate).toLocaleDateString()}</span>
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
      id={event.id}
      title={event.title}
      description={event.description}
      imageUrl={event.imageURL || ''}
      footer={footer}
      onClick={onViewDetails}
    />
  );
} 