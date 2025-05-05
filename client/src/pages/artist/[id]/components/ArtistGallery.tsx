import { ArtistGalleryProps } from "../../../../types/artist/index.ts";

export function ArtistGallery({ gallery = [], artistName, className = '' }: ArtistGalleryProps) {
  if (!gallery.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay imágenes en la galería
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {gallery.map(item => (
        <div key={item.id} className="relative aspect-square overflow-hidden rounded-lg">
          {item.type === 'image' ? (
            <img
              src={item.url}
              alt={item.alt || `Imagen de ${artistName}`}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <video
              src={item.url}
              className="object-cover w-full h-full"
              controls
              poster={item.thumbnail}
            />
          )}
        </div>
      ))}
    </div>
  );
} 