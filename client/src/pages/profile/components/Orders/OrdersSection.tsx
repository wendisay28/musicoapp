import { Tabs, TabsContent } from '@/components/ui/tabs';
import { OrdersTabs } from './OrdersTabs';
import { OrdersMade } from './OrdersMade';
import { OrdersReceived } from './OrdersReceived';
import { OrdersAccepted } from './OrdersAccepted';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { Order } from '@/types/models';

// Tipo extendido para OrderCard
export interface OrderCardOrder extends Order {
  userName?: string;
  artistName?: string;
  categoryName?: string;
  productId?: string;
}

interface OrdersSectionProps {
  defaultTab?: 'made' | 'received' | 'accepted';
  className?: string;
}

export function OrdersSection({ 
  defaultTab = 'made', 
  className
}: OrdersSectionProps) {

  const mockOrders: OrderCardOrder[] = [
    {
      id: '1',
      clientId: 'user123',
      artistId: 'artist456',
      items: [
        {
          id: 'item1',
          artworkId: 'art001',
          title: 'Cuadro de gato abstracto',
          price: 120,
          quantity: 1,
          imageUrl: '/images/art1.jpg'
        }
      ],
      total: 120,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deliveryAddress: 'Calle Principal 123, Ciudad',
      specialRequests: 'Favor usar tonos cálidos',
      userName: 'María González',
      artistName: 'Carlos Pintor',
      categoryName: 'Pintura Abstracta',
      productId: 'art001' // Para compatibilidad con OrderCard
    },
    {
      id: '2',
      clientId: 'user456',
      artistId: 'artist789',
      items: [
        {
          id: 'item2',
          artworkId: 'art002',
          title: 'Escultura en madera',
          price: 250,
          quantity: 1,
          imageUrl: '/images/art2.jpg'
        }
      ],
      total: 250,
      status: 'accepted',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      deliveryAddress: 'Avenida Central 456, Ciudad',
      userName: 'Juan Pérez',
      artistName: 'Ana Escultora',
      categoryName: 'Escultura',
      productId: 'art002'
    }
  ];

  return (
    <Tabs defaultValue={defaultTab} className={cn("w-full", className)}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48">
          <OrdersTabs className="md:flex-col md:w-full" />
        </div>
        
        <div className="flex-1 mt-0 md:mt-6">
          <Suspense fallback={<OrdersSkeleton />}>
            <TabsContent value="made" className="m-0">
              <OrdersMade orders={mockOrders} isLoading={false} />
            </TabsContent>
            
            <TabsContent value="received" className="m-0">
              <OrdersReceived 
                ordersReceived={mockOrders}
                isLoading={false}
                hasArtistProfile={true}
                isLoadingProfile={false}
                profileError={null}
                acceptOrder={async () => {}}
                rejectOrder={async () => {}}
              />
            </TabsContent>
            
            <TabsContent value="accepted" className="m-0">
              <OrdersAccepted orders={mockOrders} isLoading={false} />
            </TabsContent>
          </Suspense>
        </div>
      </div>
    </Tabs>
  );
}

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div 
          key={`order-skeleton-${i}`}
          className="h-24 w-full rounded-lg bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}