import { Skeleton } from '@/components/ui/skeleton';

interface ProfileSkeletonProps {
  showAvatar?: boolean;
  showGalleryPreview?: boolean;
}

/**
 * Componente de esqueleto de carga para el perfil de usuario.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {boolean} [props.showAvatar=true] - Mostrar esqueleto para el avatar
 * @param {boolean} [props.showGalleryPreview=true] - Mostrar esqueleto para la previsualización de galería
 */
export function ProfileSkeleton({
  showAvatar = true,
  showGalleryPreview = true
}: ProfileSkeletonProps) {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Sección de cabecera con avatar */}
      {showAvatar && (
        <div className="text-center mb-8 space-y-4">
          <Skeleton className="h-24 w-24 rounded-full mx-auto" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 mx-auto" />
            <Skeleton className="h-5 w-32 mx-auto" />
          </div>
        </div>
      )}

      {/* Sección principal de contenido */}
      <div className="space-y-6">
        {/* Sección de información básica */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>

        {/* Sección de detalles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        {/* Previsualización de galería */}
        {showGalleryPreview && (
          <div className="space-y-3">
            <Skeleton className="h-7 w-24" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="aspect-square rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}