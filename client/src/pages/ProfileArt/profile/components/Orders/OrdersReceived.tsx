import { Skeleton } from '@/components/ui/skeleton';
import { OrderCard } from './OrderCard';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { OrderCardOrder } from './OrdersSection';

interface ErrorAlertProps {
  title: string;
  description: string;
  className?: string;
}

function ErrorAlert({ title, description, className }: ErrorAlertProps) {
  return (
    <div className={cn("bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", className)}>
      <strong className="font-bold">{title}</strong>
      <span className="block sm:inline"> {description}</span>
    </div>
  );
}

interface OrdersReceivedProps {
  className?: string;
  ordersReceived: OrderCardOrder[];
  isLoading: boolean;
  hasArtistProfile: boolean;
  isLoadingProfile: boolean;
  profileError: any;
  acceptOrder: (orderId: string) => Promise<void>;
  rejectOrder: (orderId: string) => Promise<void>;
}

export function OrdersReceived({
  className,
  ordersReceived,
  isLoading,
  hasArtistProfile,
  isLoadingProfile,
  profileError,
  acceptOrder,
  rejectOrder,
}: OrdersReceivedProps) {
  const handleAccept = useCallback(async (orderId: string) => {
    try {
      await acceptOrder(orderId);
    } catch (err) {
      console.error("Error accepting order:", err);
    }
  }, [acceptOrder]);

  const handleReject = useCallback(async (orderId: string) => {
    try {
      await rejectOrder(orderId);
    } catch (err) {
      console.error("Error rejecting order:", err);
    }
  }, [rejectOrder]);

  if (isLoading || isLoadingProfile) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={`skeleton-received-${i}`}
            className="h-32 w-full rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (profileError) {
    const errorMessage =
      typeof profileError === 'object' && profileError !== null && 'message' in profileError
        ? (profileError as { message: string }).message
        : 'Ocurrió un error inesperado al cargar tu perfil';

    return (
      <ErrorAlert
        title="Error al cargar perfil"
        description={errorMessage}
        className={className}
      />
    );
  }

  if (!hasArtistProfile) {
    return (
      <div className={cn("space-y-4", className)}>
        <Card>
          <CardContent className="py-8 text-center">
            <div className="mx-auto w-max text-muted-foreground mb-4">
              <Download className="h-12 w-12" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Perfil de artista no encontrado</h3>
            <p className="text-muted-foreground mb-6">
              Debes crear un perfil de artista para recibir solicitudes
            </p>
            <Button asChild>
              <Link href="/create-artist-profile">
                <Plus className="h-4 w-4 mr-2" />
                Crear perfil
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ordersReceived || ordersReceived.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <Card>
          <CardContent className="py-8 text-center">
            <div className="mx-auto w-max text-muted-foreground mb-4">
              <Download className="h-12 w-12" />
            </div>
            <h3 className="font-semibold text-xl mb-2">No tienes solicitudes pendientes</h3>
            <p className="text-muted-foreground mb-6">
              Cuando los usuarios te soliciten servicios, aparecerán aquí
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {ordersReceived.map((order) => {
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
            onAccept={handleAccept}
            onReject={handleReject}
            isProcessing={false}
          />
        );
      })}
    </div>
  );
}