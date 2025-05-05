import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { ArtistServicesProps } from '@/pages/ProfileArt/common/types/artist';

/**
 * Hook para manejar los servicios de un artista
 * @param artistId - ID del artista
 */
export function useArtistServices(artistId: string) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addService = async (service: Omit<ArtistServicesProps['services'][0], 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await apiRequest('POST', `/api/artists/${artistId}/services`, service);
      
      toast({
        title: 'Servicio agregado',
        description: 'El servicio ha sido agregado exitosamente'
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al agregar el servicio'));
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo agregar el servicio'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateService = async (service: ArtistServicesProps['services'][0]) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await apiRequest('PUT', `/api/artists/${artistId}/services/${service.id}`, service);
      
      toast({
        title: 'Servicio actualizado',
        description: 'El servicio ha sido actualizado exitosamente'
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al actualizar el servicio'));
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo actualizar el servicio'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeService = async (serviceId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await apiRequest('DELETE', `/api/artists/${artistId}/services/${serviceId}`);
      
      toast({
        title: 'Servicio eliminado',
        description: 'El servicio ha sido eliminado exitosamente'
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al eliminar el servicio'));
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar el servicio'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    addService,
    updateService,
    removeService
  };
} 