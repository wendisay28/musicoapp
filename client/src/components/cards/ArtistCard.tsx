import { ArtistCardProps, CardFooterProps } from '@/types/cards';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Heart, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ArtistCard({
  artist,
  onViewProfile,
  onContact,
  showFavoriteButton = true,
  isFavorite = false,
  onToggleFavorite,
  className
}: ArtistCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={artist.imageUrl} alt={artist.name} />
            <AvatarFallback>{artist.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{artist.name}</h3>
            <p className="text-sm text-muted-foreground">{artist.category}</p>
          </div>
          {showFavoriteButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className={cn(
                "text-muted-foreground hover:text-destructive",
                isFavorite && "text-destructive"
              )}
            >
              <Heart className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {artist.bio}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <ArtistCardFooter
          rating={artist.rating}
          onViewProfile={onViewProfile}
          onContact={onContact}
          showFavoriteButton={showFavoriteButton}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      </CardFooter>
    </Card>
  );
}

function ArtistCardFooter({
  rating,
  onViewProfile,
  onContact,
  showFavoriteButton,
  isFavorite,
  onToggleFavorite
}: CardFooterProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-medium">{rating?.toFixed(1) || 'N/A'}</span>
      </div>
      <div className="flex gap-2">
        {onViewProfile && (
          <Button variant="outline" size="sm" onClick={onViewProfile}>
            Ver perfil
          </Button>
        )}
        {onContact && (
          <Button variant="outline" size="sm" onClick={onContact}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Contactar
          </Button>
        )}
      </div>
    </div>
  );
} 