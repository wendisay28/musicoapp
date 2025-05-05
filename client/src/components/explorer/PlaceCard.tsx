
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Star, Clock, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PlaceCardProps {
  /** ID del lugar */
  id: string;
  /** Nombre del lugar */
  name: string;
  /** Descripción del lugar */
  description: string;
  /** Dirección del lugar */
  address: string;
  /** Teléfono del lugar */
  phone?: string;
  /** Horario del lugar */
  schedule: string;
  /** Calificación del lugar */
  rating: number;
  /** Número de reseñas */
  reviewCount: number;
  /** Imagen del lugar */
  imageUrl?: string;
  /** Categoría del lugar */
  category: string;
  /** Callback cuando se hace clic en el lugar */
  onClick?: (id: string) => void;
  /** Callback cuando se hace clic en contactar */
  onContact?: (id: string) => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar un lugar en el explorador
 * @component
 * @example
 * ```tsx
 * <PlaceCard
 *   id="1"
 *   name="Galería de Arte Moderno"
 *   description="Galería especializada en arte contemporáneo"
 *   address="Calle 123 #45-67"
 *   phone="+57 123 456 7890"
 *   schedule="Lunes a Viernes: 9am - 6pm"
 *   rating={4.8}
 *   reviewCount={24}
 *   category="Galería"
 *   onClick={(id) => console.log(id)}
 *   onContact={(id) => console.log(id)}
 * />
 * ```
 */
export function PlaceCard({
  id,
  name,
  description,
  address,
  phone,
  schedule,
  rating,
  reviewCount,
  imageUrl,
  category,
  onClick,
  onContact,
  className
}: PlaceCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",
        className
      )}
      onClick={() => onClick?.(id)}
    >
      {imageUrl && (
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </div>
        </div>
      )}
      
      <CardHeader>
        <h3 className="text-xl font-semibold line-clamp-2">{name}</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 line-clamp-2">{description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{address}</span>
          </div>
          {phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-gray-400">
              ({reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'})
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onContact?.(id);
          }}
        >
          Contactar
        </Button>
      </CardFooter>
    </Card>
  );
} 