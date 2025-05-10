import { JSX } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useBusinessProfile } from '@/features/business/hooks/useBusinessProfile';
import { BusinessProfileForm } from '@/features/business/pages/profile/components/BusinessProfileForm';
import { BusinessProfileSkeleton } from '@/features/business/pages/profile/components/BusinessProfileSkeleton';

export function BusinessProfile(): JSX.Element {
  const { user } = useAuth({});
  const { profile, isLoading, error } = useBusinessProfile(user?.id);

  if (isLoading) {
    return <BusinessProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error al cargar el perfil</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontró el perfil</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BusinessProfileForm profile={profile} />
    </div>
  );
}
