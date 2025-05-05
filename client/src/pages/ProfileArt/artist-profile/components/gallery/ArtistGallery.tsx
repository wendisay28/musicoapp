/**
 * Galería de trabajos del artista con estilo Instagram
 * Soporta:
 * - Fotos y videos
 * - Grid responsive
 * - Hover effects
 * - Lazy loading
 * - Placeholder cuando no hay contenido
 */

import { Card, CardContent } from "@/components/ui/card";
import { Play, Image } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaType = 'image' | 'video';

interface MediaItem {
  url: string;
  type: MediaType;
  alt?: string;
}

interface ArtistGalleryProps {
  gallery?: MediaItem[];
  artistName: string;
  className?: string;
}

export const ArtistGallery = ({ 
  gallery, 
  artistName,
  className 
}: ArtistGalleryProps) => {
  // Si no hay galería, mostrar placeholder
  if (!gallery?.length) {
    return (
      <div className={className}>
        <h2 className="font-semibold text-lg mb-4">Galería</h2>
        <Card className="col-span-full">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Image className="h-12 w-12" />
              <p>Este artista aún no ha agregado contenido a su galería</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="font-semibold text-lg">Galería</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
        {gallery.map((media, index) => (
          <MediaCard
            key={`${media.url}-${index}`}
            media={media}
            artistName={artistName}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

// Componente interno para cada ítem de media
const MediaCard = ({ 
  media, 
  artistName,
  index 
}: { 
  media: MediaItem; 
  artistName: string;
  index: number;
}) => {
  return (
    <div className="relative group aspect-square overflow-hidden rounded-md bg-muted">
      {media.type === 'image' ? (
        <img
          src={media.url}
          alt={media.alt || `Trabajo de ${artistName} - ${index + 1}`}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="relative w-full h-full">
          <video
            src={media.url}
            className="w-full h-full object-cover"
            playsInline
            muted
            loop
            preload="metadata"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3">
              <Play className="h-6 w-6 text-white fill-white" />
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay en hover */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        {media.type === 'video' && (
          <Play className="h-8 w-8 text-white fill-white" />
        )}
      </div>
    </div>
  );
};