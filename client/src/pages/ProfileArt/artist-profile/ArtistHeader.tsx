/**
 * Cabecera del perfil del artista
 * Muestra información básica y botones de acciones principales
 */

import { Button } from "@/components/ui/button";
import { BookmarkPlus, Share2, MessageCircle } from "lucide-react";
import { Artist } from "../types/artist-profile";
import { RatingStars } from "../common/components/RatingStars";

interface ArtistHeaderProps {
  artist: Artist;
  onBookmark: () => void;
  onShare: () => void;
  onContact: () => void;
}

export const ArtistHeader = ({ 
  artist, 
  onBookmark, 
  onShare, 
  onContact 
}: ArtistHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
      <div>
        <h1 className="font-bold text-2xl">{artist.displayName}</h1>
        <div className="flex items-center mt-1">
          <span className="text-muted-foreground">{artist.role}</span>
          <div className="w-1 h-1 rounded-full bg-muted-foreground mx-2"></div>
          <span className="text-muted-foreground">{artist.location}</span>
        </div>
        {artist.rating && (
          <div className="flex items-center mt-2">
            <RatingStars rating={artist.rating} />
            <span className="ml-2 font-medium">{artist.rating.toFixed(1)}</span>
            {artist.reviewCount && (
              <span className="ml-1 text-muted-foreground">({artist.reviewCount} reseñas)</span>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="icon" onClick={onBookmark}>
          <BookmarkPlus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button onClick={onContact}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Contactar
        </Button>
      </div>
    </div>
  );
};