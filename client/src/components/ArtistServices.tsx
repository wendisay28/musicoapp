import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, DollarSign} from 'lucide-react';
import { cn } from '../lib/utils';
import { ArtistService } from '@/types/artist-profile';

export interface ArtistServicesProps {
  /** Lista de servicios del artista */
  services: ArtistService[];
  /** Callback cuando se hace clic en un servicio */
  onServiceClick?: (service: ArtistService) => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar los servicios ofrecidos por un artista
 * @component
 * @example
 * ```tsx
 * <ArtistServices
 *   services={[
 *     {
 *       id: '1',
 *       name: 'Retrato al óleo',
 *       description: 'Retrato personalizado en óleo sobre lienzo',
 *       price: 200,
 *       duration: '2 semanas',
 *       category: 'Pintura'
 *     }
 *   ]}
 *   onServiceClick={(service) => console.log(service)}
 * />
 * ```
 */
export function ArtistServices({
  services,
  onServiceClick,
  className
}: ArtistServicesProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      {services.map((service) => (
        <Card
          key={service.id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onServiceClick?.(service)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{service.name}</CardTitle>
              <Badge variant="outline">{service.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>${service.price}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{service.duration}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 