import { ArtistReview } from "@/types/artist-profile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ArtistReviewsProps {
  reviews: ArtistReview[];
}

export function ArtistReviews({ reviews }: ArtistReviewsProps) {
  if (!reviews.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Este artista aún no tiene reseñas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="list" aria-label="Reseñas del artista">
      {reviews.map((review) => (
        <Card key={review.id} role="listitem">
          <CardHeader className="flex flex-row items-center gap-4">
            <img
              src={review.userPhoto}
              alt={`Foto de perfil de ${review.userName}`}
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
              loading="lazy"
            />
            <div>
              <h3 className="font-medium">{review.userName}</h3>
              <div className="flex items-center gap-1" role="img" aria-label={`Calificación: ${review.rating} de 5 estrellas`}>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                <span className="text-sm">{review.rating}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{review.comment}</p>
            <p className="text-sm text-muted-foreground mt-2" aria-label={`Fecha de la reseña: ${new Date(review.date).toLocaleDateString()}`}>
              {new Date(review.date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 