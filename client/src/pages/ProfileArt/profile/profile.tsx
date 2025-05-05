import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileView } from './components/ProfileView/ProfileView';
import { ProfileForm } from './components/ProfileForm/ProfileForm';
import { OrdersSection } from './components/Orders/OrdersSection';
import { EventsList } from './components/Events/EventsList';
import AuthDialog from '@/components/auth-dialog';
import { ProfileSkeleton } from './components/ProfileView/ProfileSkeleton';
import { Button } from '@/components/ui/button';
import { Edit, User, ShoppingBag, Calendar, Settings } from 'lucide-react';
import { AccountSettings } from './components/Settings/AccountSettings';

/**
 * Componente principal de la página de perfil
 * Maneja:
 * - Autenticación
 * - Modo edición/vista
 * - Navegación por pestañas
 * - Carga de datos
 */
export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Consulta para datos básicos del perfil
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user-profile', user?.uid],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/users/${user?.uid}/profile`);
      return response.json();
    },
    enabled: !!user?.uid
  });

  // Consulta para perfil de artista
  const { data: artistProfile, isLoading: isLoadingArtist } = useQuery({
    queryKey: ['artist-profile', user?.uid],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/users/${user?.uid}/artist-profile`);
      return response.json();
    },
    enabled: !!user?.uid
  });

  // Estados de carga combinados
  const isLoadingProfile = isLoadingUser || isLoadingArtist;
  const isLoading = isLoadingProfile || (isEditing && isLoadingArtist);

  // Manejo de autenticación
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h1 className="text-2xl font-bold mb-2">Iniciar sesión</h1>
        <p className="text-muted-foreground mb-6">Inicia sesión para ver tu perfil</p>
        <AuthDialog onClose={() => {}} />
      </div>
    );
  }

  // Estado de carga
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-6 pb-16">
      {/* Header y botón de edición */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="font-bold text-2xl">Mi Perfil</h1>
        {!isEditing && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar perfil
          </Button>
        )}
      </div>

      {/* Contenido principal */}
      {isEditing ? (
        <ProfileForm
          initialData={{
            ...userData,
            ...artistProfile
          }}
          onCancel={() => setIsEditing(false)}
          onSubmit={() => {
            setIsEditing(false);
            toast({
              title: 'Perfil actualizado',
              description: 'Tus cambios se han guardado correctamente'
            });
          }}
        />
      ) : (
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Órdenes
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </TabsTrigger>
          </TabsList>

          {/* Contenido de las pestañas */}
          <div className="mt-6">
            <TabsContent value="profile">
              <ProfileView 
                userData={userData} 
                artistProfile={artistProfile} 
              />
            </TabsContent>

            <TabsContent value="orders">
              <OrdersSection />
            </TabsContent>

            <TabsContent value="events">
              <EventsList />
            </TabsContent>

            <TabsContent value="settings">
              <AccountSettings 
                onLogout={() => {
                  logout();
                  navigate('/');
                }}
                onDeleteAccount={handleDeleteAccount}
              />
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  );

  async function handleDeleteAccount() {
    try {
      await apiRequest('DELETE', `/api/users/${user?.uid}`);
      await logout();
      toast({
        title: 'Cuenta eliminada',
        description: 'Tu cuenta ha sido eliminada exitosamente',
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar la cuenta. Inténtalo de nuevo.',
      });
    }
  }
}