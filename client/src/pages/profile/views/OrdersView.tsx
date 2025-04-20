import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrdersReceived } from '../components/Orders/OrdersReceived';
import { useEffect, useState } from 'react';
import { Order } from '@/types/models';
import { toast } from 'sonner';

interface OrdersViewProps {
  hasArtistProfile: boolean;
  isLoadingProfile: boolean;
  profileError: any;
}

export function OrdersView({
  hasArtistProfile,
  isLoadingProfile,
  profileError,
}: OrdersViewProps) {
  const [ordersReceived, setOrdersReceived] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: '1',
          clientId: 'user1',
          artistId: 'artist1', // Este debería ser tu ID de artista
          items: [
            {
              id: 'item1',
              artworkId: 'art1',
              title: 'Retrato personalizado',
              price: 50,
              quantity: 1,
              imageUrl: '/path/to/image.jpg'
            }
          ],
          total: 50,
          status: 'pending',
          createdAt: new Date().toISOString(),
          deliveryAddress: 'Calle Falsa 123, Ciudad',
          specialRequests: 'Por favor incluir marco'
        },
        {
          id: '2',
          clientId: 'user2',
          artistId: 'artist1', // Este debería ser tu ID de artista
          items: [
            {
              id: 'item2',
              artworkId: 'art2',
              title: 'Paisaje al óleo',
              price: 120,
              quantity: 1,
              imageUrl: '/path/to/image2.jpg'
            }
          ],
          total: 120,
          status: 'pending',
          createdAt: new Date().toISOString(),
          deliveryAddress: 'Avenida Siempreviva 742, Ciudad'
        }
      ];
      setOrdersReceived(mockOrders);
      setIsLoadingOrders(false);
    }, 1000);
  }, []);

  const acceptOrder = async (orderId: string) => {
    try {
      setOrdersReceived(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: 'accepted' } : order
        )
      );
      toast.success('Pedido aceptado');
    } catch (error) {
      console.error('Error al aceptar pedido:', error);
      toast.error('Error al aceptar pedido');
    }
  };

  const rejectOrder = async (orderId: string) => {
    try {
      setOrdersReceived(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: 'rejected' } : order
        )
      );
      toast.success('Pedido rechazado');
    } catch (error) {
      console.error('Error al rechazar pedido:', error);
      toast.error('Error al rechazar pedido');
    }
  };

  return (
    <Tabs defaultValue="received" className="w-full">
      <TabsList>
        <TabsTrigger value="received">Solicitudes</TabsTrigger>
      </TabsList>
      <TabsContent value="received">
        <OrdersReceived
          className="pt-4"
          ordersReceived={ordersReceived}
          isLoading={isLoadingOrders}
          hasArtistProfile={hasArtistProfile}
          isLoadingProfile={isLoadingProfile}
          profileError={profileError}
          acceptOrder={acceptOrder}
          rejectOrder={rejectOrder}
        />
      </TabsContent>
    </Tabs>
  );
}
