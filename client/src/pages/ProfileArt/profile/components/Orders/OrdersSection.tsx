import { Tabs, TabsContent } from '@/components/ui/tabs';
import { OrdersTabs } from './OrdersTabs';
import { OrdersMade } from './OrdersMade';
import { OrdersReceived } from './OrdersReceived';
import { OrdersAccepted } from './OrdersAccepted';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { Order, OrderStatus } from '@/types/artist';

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
      userId: 'user123',
      artistId: 'artist456',
      serviceId: 'service1',
      status: OrderStatus.PENDING,
      price: 120,
      date: new Date().toISOString(),
      location: {
        city: 'Ciudad',
        state: 'Estado',
        country: 'País'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userName: 'María González',
      artistName: 'Carlos Pintor',
      categoryName: 'Pintura Abstracta',
      productId: 'art001'
    },
    {
      id: '2',
      userId: 'user456',
      artistId: 'artist789',
      serviceId: 'service2',
      status: OrderStatus.CONFIRMED,
      price: 250,
      date: new Date(Date.now() - 86400000).toISOString(),
      location: {
        city: 'Ciudad',
        state: 'Estado',
        country: 'País'
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
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