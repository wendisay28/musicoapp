import { Button } from '@/components/ui/button';
import { OrderStatus } from '@/types/models';

export interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  createdAt: string | Date;
  title: string;
  categoryName: string;
  price: number;
  userName: string;
}

interface OrderCardProps {
  order: Order;
  variant: 'received' | 'made';
  onAccept?: (orderId: string) => void;
  onReject?: (orderId: string) => void;
  isProcessing: boolean;
}

export function OrderCard({
  order,
  variant,
  onAccept,
  onReject,
  isProcessing,
}: OrderCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{order.title}</h3>
          <p className="text-sm text-muted-foreground">{order.categoryName}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Solicitante: {order.userName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">${order.price}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {variant === 'received' && (
        <div className="flex gap-2 justify-end pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReject?.(order.id)}
            disabled={isProcessing}
          >
            Rechazar
          </Button>
          <Button
            size="sm"
            onClick={() => onAccept?.(order.id)}
            disabled={isProcessing}
          >
            Aceptar
          </Button>
        </div>
      )}
    </div>
  );
}
