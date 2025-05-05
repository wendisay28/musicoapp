import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, DollarSign} from 'lucide-react';
import { cn } from '../lib/utils';
import { ArtistService } from '@/types/artist-profile';

export interface ArtistServicesPreviewProps {
  /** Lista de servicios del artista */
  services: ArtistService[];
  /** Número máximo de servicios a mostrar */
  maxServices?: number;
  /** Callback cuando se hace clic en ver más */
  onViewMore?: () => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar una vista previa de los servicios ofrecidos por un artista
 * @component
 * @example
 * ```tsx
 * <ArtistServicesPreview
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
 *   maxServices={3}
 *   onViewMore={() => console.log('Ver más')}
 * />
 * ```
 */
export function ArtistServicesPreview({
  services,
  maxServices = 3,
  onViewMore,
  className
}: ArtistServicesPreviewProps) {
  const displayedServices = services.slice(0, maxServices);
  const hasMore = services.length > maxServices;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Servicios Destacados</h3>
        {hasMore && (
          <button
            onClick={onViewMore}
            className="text-sm text-primary hover:underline"
          >
            Ver todos ({services.length})
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {displayedServices.map((service) => (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{service.name}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {service.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
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
    </div>
  );
} 