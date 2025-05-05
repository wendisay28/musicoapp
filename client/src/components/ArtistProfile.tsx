import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, MapPin, Calendar, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ArtistProfileProps {
  /** Nombre del artista */
  name: string;
  /** Imagen de perfil del artista */
  imageUrl?: string;
  /** Descripción del artista */
  description: string;
  /** Ubicación del artista */
  location: string;
  /** Calificación promedio */
  rating: number;
  /** Número de reseñas */
  reviewCount: number;
  /** Habilidades del artista */
  skills: string[];
  /** Precio por hora */
  hourlyRate: number;
  /** Disponibilidad del artista */
  availability: string;
  /** Callback cuando se hace clic en contactar */
  onContact?: () => void;
  /** Callback cuando se hace clic en ver perfil */
  onViewProfile?: () => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar el perfil de un artista
 * @component
 * @example
 * ```tsx
 * <ArtistProfile
 *   name="Juan Pérez"
 *   description="Artista visual especializado en pintura al óleo"
 *   location="Bogotá, Colombia"
 *   rating={4.8}
 *   reviewCount={24}
 *   skills={['Pintura', 'Dibujo', 'Escultura']}
 *   hourlyRate={50}
 *   availability="Disponible para proyectos"
 *   onContact={() => console.log('Contactar')}
 *   onViewProfile={() => console.log('Ver perfil')}
 * />
 * ```
 */
export function ArtistProfile({
  name,
  imageUrl,
  description,
  location,
  rating,
  reviewCount,
  skills,
  hourlyRate,
  availability,
  onContact,
  onViewProfile,
  className
}: ArtistProfileProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{name}</h2>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold">{rating}</span>
              <span className="text-gray-500">({reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{availability}</span>
          </div>

          <p className="mt-4 text-gray-700">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-xl font-bold">
              ${hourlyRate}/hora
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onViewProfile}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Ver Perfil
              </Button>
              <Button
                onClick={onContact}
                className="flex items-center gap-2"
              >
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 