import { User, Palette } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PersonalInfo } from './PersonalInfo';
import { ArtistProfile } from './ArtistProfile';
import { GalleryPreview } from './GalleryPreview';
import { UserData, ArtistProfile as ArtistProfileType } from '../../types';

interface ProfileViewProps {
  userData: UserData;
  artistProfile?: ArtistProfileType;
  onEdit?: (section: 'personal' | 'artist') => void;
  className?: string;
  isLoading?: boolean;
}

/**
 * Vista principal del perfil de usuario con navegación por pestañas.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {UserData} props.userData - Datos básicos del usuario
 * @param {ArtistProfileType} [props.artistProfile] - Perfil artístico (opcional)
 * @param {Function} [props.onEdit] - Callback para editar secciones
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {boolean} [props.isLoading] - Estado de carga
 */
export function ProfileView({
  userData,
  artistProfile,
  onEdit,
  className = '',
  isLoading = false
}: ProfileViewProps) {
  const hasArtistProfile = !!artistProfile;
  const displayNameInitials = userData.displayName?.slice(0, 2).toUpperCase() || 'US';

  if (isLoading) {
    return <ProfileViewSkeleton />;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <ProfileHeader 
        userData={userData} 
        displayNameInitials={displayNameInitials}
        hasArtistProfile={hasArtistProfile}
      />

      <ProfileTabs 
        hasArtistProfile={hasArtistProfile}
        userData={userData}
        artistProfile={artistProfile}
        onEdit={onEdit}
      />
    </div>
  );
}

// Componente para el esqueleto de carga
const ProfileViewSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="text-center space-y-4">
      <div className="h-24 w-24 rounded-full bg-muted mx-auto" />
      <div className="h-6 w-48 bg-muted mx-auto" />
      <div className="h-4 w-32 bg-muted mx-auto" />
    </div>
    
    <div className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="h-10 bg-muted rounded-md" />
        <div className="h-10 bg-muted rounded-md" />
      </div>
      
      <div className="space-y-4">
        <div className="h-32 bg-muted rounded-md" />
        <div className="h-20 bg-muted rounded-md" />
      </div>
    </div>
  </div>
);

// Componente para el encabezado del perfil
const ProfileHeader = ({
  userData,
  displayNameInitials,
  hasArtistProfile
}: {
  userData: UserData;
  displayNameInitials: string;
  hasArtistProfile: boolean;
}) => (
  <div className="text-center space-y-3">
    <Avatar className="h-24 w-24 mx-auto border-2 border-primary/20 hover:border-primary/40 transition-colors">
      <AvatarImage 
        src={userData.photoURL} 
        alt={userData.displayName || 'Foto de perfil'}
        className="object-cover"
      />
      <AvatarFallback 
        className="bg-primary/10 text-primary font-medium text-2xl"
      >
        {displayNameInitials}
      </AvatarFallback>
    </Avatar>
    
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{userData.displayName}</h2>
      <p className="text-muted-foreground">@{userData.username}</p>
    </div>
    
    <div className="flex justify-center gap-2">
      <Badge variant="outline" className="capitalize">
        {userData.role?.toLowerCase() || 'usuario'}
      </Badge>
      {hasArtistProfile && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Palette className="h-3 w-3" />
          <span>Artista</span>
        </Badge>
      )}
    </div>
  </div>
);

// Componente para las pestañas de navegación
const ProfileTabs = ({
  hasArtistProfile,
  userData,
  artistProfile,
  onEdit
}: {
  hasArtistProfile: boolean;
  userData: UserData;
  artistProfile?: ArtistProfileType;
  onEdit?: (section: 'personal' | 'artist') => void;
}) => (
  <Tabs defaultValue="info" className="w-full">
    <TabsList className="w-full grid grid-cols-2 bg-muted/50">
      <TabTrigger value="info" icon={<User className="h-4 w-4" />}>
        Información
      </TabTrigger>
      <TabTrigger 
        value="artist" 
        icon={<Palette className="h-4 w-4" />}
        disabled={!hasArtistProfile}
      >
        Artista
      </TabTrigger>
    </TabsList>

    <div className="mt-6 space-y-6">
      <TabContent value="info">
        <PersonalInfo 
          userData={userData} 
          onEdit={onEdit ? () => onEdit('personal') : undefined} 
        />
      </TabContent>

      {hasArtistProfile && (
        <TabContent value="artist" className="space-y-6">
          <ArtistProfile 
            profile={artistProfile!} 
            onEdit={onEdit ? () => onEdit('artist') : undefined} 
          />
          <GalleryPreview gallery={artistProfile?.gallery || []} />
        </TabContent>
      )}
    </div>
  </Tabs>
);

// Componente auxiliar para los triggers de pestaña
const TabTrigger = ({
  value,
  icon,
  children,
  disabled = false
}: {
  value: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}) => (
  <TabsTrigger 
    value={value} 
    disabled={disabled}
    className="data-[state=active]:bg-background data-[state=active]:shadow-sm flex items-center gap-2"
  >
    {icon}
    {children}
  </TabsTrigger>
);

// Componente auxiliar para el contenido de pestaña
const TabContent = ({
  value,
  children,
  className = ''
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <TabsContent value={value} className={className}>
    {children}
  </TabsContent>
);