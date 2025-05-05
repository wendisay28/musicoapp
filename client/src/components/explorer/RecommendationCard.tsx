
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Star, ThumbsUp, Clock, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface RecommendationCardProps {
  /** ID de la recomendación */
  id: string;
  /** Título de la recomendación */
  title: string;
  /** Descripción de la recomendación */
  description: string;
  /** Tipo de recomendación */
  type: 'event' | 'place' | 'artist';
  /** Fecha de la recomendación (si es evento) */
  date?: Date;
  /** Ubicación de la recomendación */
  location: string;
  /** Calificación de la recomendación */
  rating: number;
  /** Número de reseñas */
  reviewCount: number;
  /** Número de likes */
  likes: number;
  /** Imagen de la recomendación */
  imageUrl?: string;
  /** Callback cuando se hace clic en la recomendación */
  onClick?: (id: string) => void;
  /** Callback cuando se hace clic en ver más */
  onViewMore?: (id: string) => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar recomendaciones personalizadas
 * @component
 * @example
 * ```tsx
 * <RecommendationCard
 *   id="1"
 *   title="Exposición de Arte Contemporáneo"
 *   description="Una muestra imperdible de los artistas más destacados"
 *   type="event"
 *   date={new Date('2024-03-20')}
 *   location="Galería de Arte Moderno"
 *   rating={4.8}
 *   reviewCount={24}
 *   likes={156}
 *   onClick={(id) => console.log(id)}
 *   onViewMore={(id) => console.log(id)}
 * />
 * ```
 */
export function RecommendationCard({
  id,
  title,
  description,
  type,
  date,
  location,
  rating,
  reviewCount,
  likes,
  imageUrl,
  onClick,
  onViewMore,
  className
}: RecommendationCardProps) {
  const getTypeLabel = () => {
    switch (type) {
      case 'event':
        return 'Evento';
      case 'place':
        return 'Lugar';
      case 'artist':
        return 'Artista';
      default:
        return '';
    }
  };

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
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
            {getTypeLabel()}
          </div>
        </div>
      )}
      
      <CardHeader>
        <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 line-clamp-2">{description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          {date && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {format(date, "EEEE d 'de' MMMM", { locale: es })}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-gray-400">
              ({reviewCount} {reviewCount === 1 ? 'reseña' : 'reseñas'})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-blue-500" />
            <span>{likes} {likes === 1 ? 'me gusta' : 'me gustan'}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onViewMore?.(id);
          }}
        >
          Ver más
        </Button>
      </CardFooter>
    </Card>
  );
} 