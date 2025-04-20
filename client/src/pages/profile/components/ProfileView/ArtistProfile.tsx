import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ArtistProfile as ArtistProfileType } from '../../types';
import { Skeleton } from '@/components/ui/skeleton';

interface ArtistProfileProps {
  profile: ArtistProfileType | null;
  onEdit?: () => void;
  isLoading?: boolean;
}

/**
 * Componente para mostrar el perfil profesional de un artista.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {ArtistProfileType | null} props.profile - Datos del perfil del artista
 * @param {Function} [props.onEdit] - Callback para editar el perfil
 * @param {boolean} [props.isLoading=false] - Indica si los datos están cargando
 */
export function ArtistProfile({ profile, onEdit, isLoading = false }: ArtistProfileProps) {
  // Estado de carga
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Estado sin datos
  if (!profile) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6 text-center text-muted-foreground">
          No hay información de perfil disponible
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Perfil de Artista</CardTitle>
        {onEdit && <EditButton onClick={onEdit} />}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <CategorySection 
            category={profile.category} 
            subcategory={profile.subcategory} 
          />
          
          <PriceRange 
            minPrice={profile.minPrice} 
            maxPrice={profile.maxPrice} 
            priceUnit={profile.priceUnit} 
          />
          
          <TagsSection tags={profile.tags ?? []} />
        </div>
      </CardContent>
    </Card>
  );
}

// Componentes auxiliares

const ProfileSkeleton = () => (
  <Card className="mb-6">
    <CardHeader className="flex-row items-center justify-between">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-8 w-20" />
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const EditButton = ({ onClick }: { onClick: () => void }) => (
  <Button 
    variant="ghost" 
    size="sm" 
    onClick={onClick}
    aria-label="Editar perfil"
    className="flex items-center"
  >
    <Edit className="h-4 w-4 mr-2" />
    Editar
  </Button>
);

const CategorySection = ({ 
  category, 
  subcategory 
}: {
  category?: string;
  subcategory?: string;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h3 className="font-medium text-sm">Categoría</h3>
      <p className="text-muted-foreground">
        {category || 'No especificado'}
      </p>
    </div>
    {subcategory && (
      <div>
        <h3 className="font-medium text-sm">Especialidad</h3>
        <p className="text-muted-foreground">{subcategory}</p>
      </div>
    )}
  </div>
);

const PriceRange = ({ 
  minPrice, 
  maxPrice, 
  priceUnit 
}: {
  minPrice: number;
  maxPrice: number;
  priceUnit?: string;
}) => {
  const formatCurrency = (value: number) => (
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value)
  );

  return (
    <div>
      <h3 className="font-medium text-sm mb-1">Rango de precios</h3>
      <p className="text-muted-foreground">
        {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
        {priceUnit && (
          <span className="text-xs ml-1">({priceUnit})</span>
        )}
      </p>
    </div>
  );
};

const TagsSection = ({ tags }: { tags: string[] }) => {
  if (tags.length === 0) return null;

  return (
    <div>
      <h3 className="font-medium text-sm mb-1">Etiquetas profesionales</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};