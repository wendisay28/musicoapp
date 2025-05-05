
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Star, MapPin, Calendar, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { ArtistProfile } from '@/types/artist-profile';

export interface ArtistHeaderProps {
  /** Datos del artista */
  artist: ArtistProfile;
  /** Callback cuando se hace clic en contactar */
  onContact?: () => void;
  /** Callback cuando se hace clic en compartir */
  onShare?: () => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar la información principal de un artista
 * @component
 * @example
 * ```tsx
 * <ArtistHeader
 *   artist={{
 *     id: '1',
 *     name: 'Juan Pérez',
 *     imageUrl: '/avatar.jpg',
 *     description: 'Artista visual especializado en pintura al óleo',
 *     location: 'Bogotá, Colombia',
 *     rating: 4.8,
 *     reviewCount: 24,
 *     skills: ['Pintura', 'Dibujo', 'Escultura'],
 *     hourlyRate: 50,
 *     availability: 'Disponible para proyectos'
 *   }}
 *   onContact={() => console.log('Contactar')}
 *   onShare={() => console.log('Compartir')}
 * />
 * ```
 */
export function ArtistHeader({
  artist,
  onContact,
  onShare,
  className
}: ArtistHeaderProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={artist.imageUrl} alt={artist.name} />
          <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{artist.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{artist.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{artist.availability}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onShare}
                className="h-10 w-10"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                onClick={onContact}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contactar
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold">{artist.rating}</span>
            <span className="text-gray-500">
              ({artist.reviewCount} {artist.reviewCount === 1 ? 'reseña' : 'reseñas'})
            </span>
          </div>

          <p className="mt-4 text-gray-700">{artist.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {artist.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 text-xl font-bold">
            ${artist.hourlyRate}/hora
          </div>
        </div>
      </div>
    </div>
  );
} 