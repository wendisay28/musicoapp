import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface GalleryPreviewProps {
  gallery: string[];
  maxPreview?: number;
  emptyStateMessage?: string;
}

/**
 * Componente que muestra una vista previa de la galería del artista con opción para ver más.
 * 
 * @param {GalleryPreviewProps} props - Propiedades del componente
 * @param {string[]} props.gallery - Array de URLs de imágenes
 * @param {number} [props.maxPreview=3] - Número máximo de imágenes a mostrar en la vista previa
 * @param {string} [props.emptyStateMessage="No hay imágenes en la galería"] - Mensaje cuando no hay imágenes
 */
export function GalleryPreview({ 
  gallery, 
  maxPreview = 3, 
  emptyStateMessage = "No hay imágenes en la galería" 
}: GalleryPreviewProps) {
  const previewImages = gallery.slice(0, maxPreview);
  const remainingCount = gallery.length - maxPreview;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Galería</CardTitle>
        <ViewAllButton />
      </CardHeader>
      
      <CardContent>
        {gallery.length === 0 ? (
          <EmptyState message={emptyStateMessage} />
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {previewImages.map((image, index) => (
              <GalleryImage key={`${image}-${index}`} image={image} index={index} />
            ))}
            
            {remainingCount > 0 && (
              <RemainingCount count={remainingCount} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Componentes auxiliares

const ViewAllButton = () => (
  <Button 
    variant="ghost" 
    size="sm" 
    asChild
    className="flex items-center"
    aria-label="Ver toda la galería"
  >
    <Link href="/profile/gallery">
      <Plus className="h-4 w-4 mr-2" />
      Ver todo
    </Link>
  </Button>
);

interface GalleryImageProps {
  image: string;
  index: number;
}

const GalleryImage = ({ image, index }: GalleryImageProps) => (
  <div className="relative aspect-square rounded-md overflow-hidden">
    <img
      src={image}
      alt={`Muestra de galería ${index + 1}`}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
    />
  </div>
);

interface RemainingCountProps {
  count: number;
}

const RemainingCount = ({ count }: RemainingCountProps) => (
  <div 
    className="flex items-center justify-center aspect-square rounded-md bg-muted"
    aria-label={`${count} imágenes adicionales`}
  >
    <p className="text-sm">+{count}</p>
  </div>
);

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="text-center text-muted-foreground py-4">
    {message}
  </div>
);