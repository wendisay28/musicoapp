/**
 * Componente para mostrar estrellas de valoración
 * Recibe un rating (0-5) y muestra las estrellas correspondientes
 */

import { Star, StarHalf } from "lucide-react";
import { useCallback } from "react";

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export const RatingStars = ({ rating, className = "" }: RatingStarsProps) => {
  const renderStars = useCallback(() => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />);
    }
    
    return stars;
  }, [rating]);

  return <div className={`flex ${className}`}>{renderStars()}</div>;
};