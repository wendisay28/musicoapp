import { ArtistReview, ArtistReviewsProps } from "../../../../types/artist/index.ts";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card.tsx";
import { Star } from "lucide-react";

export function ArtistReviews({ reviews, rating, reviewCount }: ArtistReviewsProps) {
  return (
    <div className="space-y-6">
      {rating && reviewCount && (
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({reviewCount} reseñas)</span>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review: ArtistReview) => (
          <Card key={review.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={review.userPhoto}
                alt={review.userName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">{review.userName}</h3>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 