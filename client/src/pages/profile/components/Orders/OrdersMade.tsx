import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderCard } from './OrderCard';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { OrderCardOrder } from './OrdersSection';

interface OrdersMadeProps {
  className?: string;
  orders: OrderCardOrder[];
  isLoading: boolean;
}

export function OrdersMade({ className, orders, isLoading }: OrdersMadeProps) {
  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton 
            key={`skeleton-made-${i}`} 
            className="h-32 w-full rounded-lg" 
          />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <Card>
          <CardContent className="py-8 text-center">
            <div className="mx-auto w-max text-muted-foreground mb-4">
              <Download className="h-12 w-12" />
            </div>
            <h3 className="font-semibold text-xl mb-2">No hay pedidos realizados</h3>
            <p className="text-muted-foreground mb-6">
              Cuando realices pedidos a artistas, aparecerán aquí
            </p>
            <Button asChild>
              <Link href="/explore">
                <Plus className="h-4 w-4 mr-2" />
                Explorar artistas
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {orders.map((order) => {
        const firstItem = order.items[0];

        return (
          <OrderCard
            key={order.id}
            order={{
              id: order.id,
              userId: order.artistId ?? '',
              productId: order.productId ?? firstItem?.artworkId ?? '',
              quantity: firstItem?.quantity ?? 1,
              status: order.status,
              createdAt: order.createdAt,
              title: firstItem?.title ?? 'Sin título',
              categoryName: order.categoryName ?? 'Personalizada',
              price: firstItem?.price ?? 0,
              userName: order.artistName ?? 'Artista',
            }}
            variant="made"
            isProcessing={['pending', 'accepted'].includes(order.status)}
          />
        );
      })}
    </div>
  );
}