import { MediaItem } from "@/types/artist-profile";
import { Card, CardContent } from "@/components/ui/card";

interface ArtistGalleryProps {
  gallery: MediaItem[];
}

export function ArtistGallery({ gallery }: ArtistGalleryProps) {
  if (!gallery.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Este artista aún no ha agregado elementos a su galería.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4" role="list" aria-label="Galería del artista">
      {gallery.map((item) => (
        <Card key={item.id} role="listitem">
          <CardContent className="p-0">
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.alt || 'Elemento de la galería del artista'}
                className="w-full h-48 object-cover rounded-t-lg"
                width={300}
                height={192}
                loading="lazy"
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-48 object-cover rounded-t-lg"
                controls
                aria-label={item.alt || 'Video de la galería del artista'}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 