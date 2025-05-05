/**
 * Lista de reseñas del artista
 * Muestra las valoraciones y comentarios de los clientes
 */

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { RatingStars } from "../common/components/RatingStars";
import { Review } from "../common/types/artist";

interface ArtistReviewsProps {
  reviews?: Review[];
  rating?: number;
  reviewCount?: number;
}

export const ArtistReviews = ({ reviews, rating, reviewCount }: ArtistReviewsProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Reseñas</h2>
        {rating && (
          <div className="flex items-center">
            <RatingStars rating={rating} />
            <span className="ml-2 font-medium">{rating.toFixed(1)}</span>
            {reviewCount && <span className="ml-1 text-muted-foreground">({reviewCount})</span>}
          </div>
        )}
      </div>
      
      {reviews?.length ? (
        reviews.map(review => (
          <Card key={review.id} className="mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={review.userPhotoURL} alt={review.userName} />
                    <AvatarFallback>
                      {review.userName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{review.userName}</h3>
                    <p className="text-muted-foreground text-xs">
                      {format(new Date(review.date), "d 'de' MMMM, yyyy", { locale: es })}
                    </p>
                  </div>
                </div>
                <RatingStars rating={review.rating} />
              </div>
              <p className="mt-3 text-sm">{review.comment}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Este artista aún no tiene reseñas</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};