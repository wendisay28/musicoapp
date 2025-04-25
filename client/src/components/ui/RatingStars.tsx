/**
 * Componente reutilizable para mostrar valoraciones con estrellas
 */
import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export const RatingStars = ({ rating, className = "" }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className={`flex ${className}`}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />;
        if (i === fullStars && hasHalfStar) return <StarHalf key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />;
        return <Star key={i} className="h-5 w-5 text-yellow-400" />;
      })}
    </div>
  );
};