import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Order } from '@/types/models'; // Adjusted to use the correct alias or relative path
import { useToast } from '@/hooks/use-toast';
import { useCallback } from 'react';

interface UseOrdersOptions {
  refetchInterval?: number;
}

interface UseOrdersResult {
  ordersMade: Order[];
  ordersReceived: Order[];
  ordersAccepted: Order[];
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  acceptOrder: (orderId: string) => Promise<void>;
  rejectOrder: (orderId: string) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

/**
 * Hook personalizado para manejar la lógica de órdenes
 * 
 * @param {string} userId - ID del usuario autenticado (requerido)
 * @param {UseOrdersOptions} options - Opciones adicionales
 * @returns {UseOrdersResult} Objeto con las órdenes y funciones de gestión
 */
export function useOrders(userId: string, options?: UseOrdersOptions): UseOrdersResult {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Funciones de fetching
  const fetchOrdersMade = useCallback(async (): Promise<Order[]> => {
    const response = await apiRequest('GET', `/api/users/${userId}/orders/made`);
    return await response.json();
  }, [userId]);

  const fetchOrdersReceived = useCallback(async (): Promise<Order[]> => {
    const response = await apiRequest('GET', `/api/users/${userId}/orders/received`);
    return await response.json();
  }, [userId]);

  const fetchOrdersAccepted = useCallback(async (): Promise<Order[]> => {
    const response = await apiRequest('GET', `/api/users/${userId}/orders/accepted`);
    return await response.json();
  }, [userId]);

  // Queries para órdenes
  const commonQueryOptions = {
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
    refetchInterval: options?.refetchInterval,
  };

  const {
    data: ordersMade = [],
    isLoading: isLoadingMade,
    error: errorMade
  } = useQuery<Order[]>({
    queryKey: ['orders', 'made', userId],
    queryFn: fetchOrdersMade,
    ...commonQueryOptions
  });

  const {
    data: ordersReceived = [],
    isLoading: isLoadingReceived,
    error: errorReceived
  } = useQuery<Order[]>({
    queryKey: ['orders', 'received', userId],
    queryFn: fetchOrdersReceived,
    ...commonQueryOptions
  });

  const {
    data: ordersAccepted = [],
    isLoading: isLoadingAccepted,
    error: errorAccepted
  } = useQuery<Order[]>({
    queryKey: ['orders', 'accepted', userId],
    queryFn: fetchOrdersAccepted,
    ...commonQueryOptions
  });

  // Función para refrescar órdenes
  const refreshOrders = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['orders', 'made', userId] }),
      queryClient.invalidateQueries({ queryKey: ['orders', 'received', userId] }),
      queryClient.invalidateQueries({ queryKey: ['orders', 'accepted', userId] }),
    ]);
  }, [queryClient, userId]);

  // Mutaciones para manejar órdenes
  const handleOrderAction = useCallback(async (orderId: string, action: 'accept' | 'reject') => {
    try {
      await apiRequest('PATCH', `/api/orders/${orderId}/${action}`);
      return true;
    } catch (error) {
      console.error(`Error al ${action} la orden:`, error);
      throw error;
    }
  }, []);

  const {
    mutateAsync: acceptOrderMutation,
    isPending: isAccepting
  } = useMutation({
    mutationFn: (orderId: string) => handleOrderAction(orderId, 'accept'),
    onSuccess: () => {
      toast({
        title: 'Orden aceptada',
        description: 'Has aceptado la solicitud de servicio',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `No se pudo aceptar la orden: ${error.message}`,
        variant: 'destructive',
      });
    },
    onSettled: refreshOrders
  });

  const {
    mutateAsync: rejectOrderMutation,
    isPending: isRejecting
  } = useMutation({
    mutationFn: (orderId: string) => handleOrderAction(orderId, 'reject'),
    onSuccess: () => {
      toast({
        title: 'Orden rechazada',
        description: 'Has rechazado la solicitud de servicio',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `No se pudo rechazar la orden: ${error.message}`,
        variant: 'destructive',
      });
    },
    onSettled: refreshOrders
  });

  // Wrappers para las mutaciones
  const acceptOrder = useCallback(async (orderId: string) => {
    await acceptOrderMutation(orderId);
  }, [acceptOrderMutation]);

  const rejectOrder = useCallback(async (orderId: string) => {
    await rejectOrderMutation(orderId);
  }, [rejectOrderMutation]);

  // Estado combinado
  const error = errorMade || errorReceived || errorAccepted;
  const isLoading = isLoadingMade || isLoadingReceived || isLoadingAccepted;
  const isUpdating = isAccepting || isRejecting;

  return {
    ordersMade,
    ordersReceived,
    ordersAccepted,
    isLoading,
    isUpdating,
    error,
    acceptOrder,
    rejectOrder,
    refreshOrders,
  };
}