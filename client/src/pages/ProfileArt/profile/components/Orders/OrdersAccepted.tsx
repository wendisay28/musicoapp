import { OrderCard } from './OrderCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OrderCardOrder } from './OrdersSection';

interface OrdersAcceptedProps {
  orders: OrderCardOrder[];
  isLoading: boolean;
  className?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const OrdersAccepted: React.FC<OrdersAcceptedProps> = ({
  orders,
  isLoading,
  className,
  onRefresh,
  isRefreshing = false,
}) => {
  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={`skeleton-accepted-${i}`} className="h-28 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="py-8 text-center">
          <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-xl mb-2">No hay órdenes aceptadas</h3>
          <p className="text-muted-foreground">
            Las órdenes que aceptes aparecerán aquí
          </p>
          {onRefresh && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Recargar
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Órdenes Aceptadas</h2>
        {onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Recargar
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => {
          const firstItem = order.items[0];

          return (
            <OrderCard
              key={order.id}
              order={{
                id: order.id,
                userId: order.clientId,
                productId: order.productId ?? firstItem?.artworkId ?? '',
                quantity: firstItem?.quantity ?? 1,
                status: order.status,
                createdAt: order.createdAt,
                title: firstItem?.title ?? 'Sin título',
                categoryName: order.categoryName ?? 'Personalizada',
                price: firstItem?.price ?? 0,
                userName: order.userName ?? 'Cliente',
              }}
              variant="received"
              isProcessing={false}
            />
          );
        })}
      </div>
    </div>
  );
};