import { ArtistProfile } from '@/types/artist';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Share2, MessageCircle, Star } from 'lucide-react';

interface ArtistHeaderProps {
  artist: ArtistProfile;
  onBookmark?: () => void;
  onShare?: () => void;
  onContact?: () => void;
}

export const ArtistHeader = ({ 
  artist, 
  onBookmark, 
  onShare, 
  onContact 
}: ArtistHeaderProps) => {
  return (
    <div className="relative" role="banner" aria-label="Perfil del artista">
      <div 
        className="h-64 w-full bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${artist.coverImage})` }}
        role="img"
        aria-label="Imagen de portada del artista"
      />
      
      <div className="absolute -bottom-16 left-8 flex items-end gap-4">
        <img
          src={artist.photoURL}
          alt={`Foto de perfil de ${artist.displayName}`}
          className="w-32 h-32 rounded-full border-4 border-background"
          width={128}
          height={128}
          loading="eager"
        />
        
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{artist.displayName}</h1>
          <div className="flex items-center mt-1">
            <span className="text-muted-foreground">{artist.role}</span>
            {artist.location && (
              <>
                <div className="w-1 h-1 rounded-full bg-muted-foreground mx-2"></div>
                <span className="text-muted-foreground">{artist.location}</span>
              </>
            )}
          </div>
          
          {artist.rating && (
            <div className="flex items-center gap-1 mt-2" role="img" aria-label={`Calificación: ${artist.rating} de 5 estrellas`}>
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span className="font-medium">{artist.rating.toFixed(1)}</span>
              {artist.reviewCount && (
                <span className="ml-1 text-muted-foreground">({artist.reviewCount} reseñas)</span>
              )}
            </div>
          )}
        </div>
        
        <div className="ml-auto mb-4 flex gap-2">
          {onBookmark && (
            <Button variant="outline" size="icon" onClick={onBookmark}>
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          )}
          {onShare && (
            <Button variant="outline" size="icon" onClick={onShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          )}
          {onContact && (
            <Button onClick={onContact}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Contactar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}; 