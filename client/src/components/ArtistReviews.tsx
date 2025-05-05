import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { Review } from '@/types/artist-profile';

export interface ArtistReviewsProps {
  /** Lista de reseñas */
  reviews: Review[];
  /** Calificación promedio */
  averageRating: number;
  /** Número total de reseñas */
  totalReviews: number;
  /** Callback cuando se hace clic en ver más */
  onViewMore?: () => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar las reseñas de un artista
 * @component
 * @example
 * ```tsx
 * <ArtistReviews
 *   reviews={[
 *     {
 *       id: '1',
 *       userId: 'user1',
 *       userName: 'María López',
 *       userImage: '/avatar.jpg',
 *       rating: 5,
 *       comment: 'Excelente trabajo!',
 *       date: '2024-03-15'
 *     }
 *   ]}
 *   averageRating={4.8}
 *   totalReviews={24}
 *   onViewMore={() => console.log('Ver más')}
 * />
 * ```
 */
export function ArtistReviews({
  reviews,
  averageRating,
  totalReviews,
  onViewMore,
  className
}: ArtistReviewsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-400" />
          <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
        </div>
        <div className="text-gray-600">
          {totalReviews} {totalReviews === 1 ? 'reseña' : 'reseñas'}
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.userImage} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="font-medium">{review.rating}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {onViewMore && (
        <button
          onClick={onViewMore}
          className="w-full py-2 text-center text-primary hover:underline"
        >
          Ver todas las reseñas
        </button>
      )}
    </div>
  );
} 