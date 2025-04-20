import { useQuery, useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient'; // Asegúrate que esta ruta es correcta
import { Order } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useCallback } from 'react';

interface ApiResponse<T> {
  data: T;
  [key: string]: unknown;
}

interface UseOrdersReturn {
  ordersMade: Order[];
  ordersReceived: Order[];
  ordersAccepted: Order[];
  isLoading: boolean;
  acceptOrder: (orderId: string) => void;
  rejectOrder: (orderId: string) => void;
  refetchOrders: () => Promise<void>;
  isEmpty: {
    made: boolean;
    received: boolean;
    accepted: boolean;
  };
}

/**
 * Hook para manejar las órdenes del usuario
 */
export function useOrders(userId: string): UseOrdersReturn {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Definir las query keys como objetos válidos para invalidateQueries
  const ordersMadeQueryKey: QueryKey = ['orders-made', userId];
  const ordersReceivedQueryKey: QueryKey = ['orders-received', userId];
  const ordersAcceptedQueryKey: QueryKey = ['orders-accepted', userId];

  // Función genérica para obtener órdenes
  const fetchOrders = useCallback(async (endpoint: string): Promise<Order[]> => {
    try {
      const response = await apiRequest('GET', `/api/users/${userId}/orders/${endpoint}`);
      const jsonResponse: ApiResponse<Order[]> = await response.json();
      return jsonResponse.data || [];
    } catch (error) {
      console.error(`Error fetching ${endpoint} orders:`, error);
      toast({
        title: 'Error',
        description: `No se pudieron obtener las órdenes ${endpoint}`,
        variant: 'destructive'
      });
      return [];
    }
  }, [userId, toast]);

  // Obtener órdenes realizadas
  const { data: ordersMade = [], isLoading: isLoadingMade } = useQuery<Order[]>({
    queryKey: ordersMadeQueryKey,
    queryFn: () => fetchOrders('made'),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  });

  // Obtener órdenes recibidas
  const { data: ordersReceived = [], isLoading: isLoadingReceived } = useQuery<Order[]>({
    queryKey: ordersReceivedQueryKey,
    queryFn: () => fetchOrders('received'),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  });

  // Obtener órdenes aceptadas
  const { data: ordersAccepted = [], isLoading: isLoadingAccepted } = useQuery<Order[]>({
    queryKey: ordersAcceptedQueryKey,
    queryFn: () => fetchOrders('accepted'),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  });

  // Función genérica para mutaciones de orden
  const createOrderMutation = (action: 'accept' | 'reject') => {
    return useMutation<Order, Error, string>({
      mutationFn: async (orderId: string) => {
        const response = await apiRequest(
          'PATCH', 
          `/api/orders/${orderId}/${action}`
        );
        const result = await response.json();
        return result.data;
      },
      onSuccess: () => {
        toast({
          title: `Orden ${action === 'accept' ? 'aceptada' : 'rechazada'}`,
          description: action === 'accept' 
            ? 'Has aceptado la solicitud de servicio' 
            : 'Has rechazado la solicitud de servicio',
          variant: action === 'accept' ? 'default' : 'destructive'
        });
        queryClient.invalidateQueries({ queryKey: ordersReceivedQueryKey });
        queryClient.invalidateQueries({ queryKey: ordersAcceptedQueryKey });
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: `No se pudo ${action === 'accept' ? 'aceptar' : 'rechazar'} la orden`,
          variant: 'destructive'
        });
        console.error(`Error ${action}ing order:`, error);
      }
    });
  };

  const { mutate: acceptOrder } = createOrderMutation('accept');
  const { mutate: rejectOrder } = createOrderMutation('reject');

  // Refetch todas las órdenes
  const refetchOrders = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ordersMadeQueryKey }),
      queryClient.invalidateQueries({ queryKey: ordersReceivedQueryKey }),
      queryClient.invalidateQueries({ queryKey: ordersAcceptedQueryKey })
    ]);
  }, [queryClient, ordersMadeQueryKey, ordersReceivedQueryKey, ordersAcceptedQueryKey]);

  return {
    ordersMade,
    ordersReceived,
    ordersAccepted,
    isLoading: isLoadingMade || isLoadingReceived || isLoadingAccepted,
    acceptOrder,
    rejectOrder,
    refetchOrders,
    isEmpty: {
      made: !isLoadingMade && ordersMade.length === 0,
      received: !isLoadingReceived && ordersReceived.length === 0,
      accepted: !isLoadingAccepted && ordersAccepted.length === 0
    }
  };
}