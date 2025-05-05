import { z } from 'zod';

/**
 * Estado de una orden
 */
export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

/**
 * Esquema de validación para una orden
 */
export const orderSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  categoryName: z.string(),
  status: z.nativeEnum(OrderStatus),
  price: z.number().min(0),
  currency: z.string().default('USD'),
  userPhoto: z.string().url().optional(),
  userName: z.string(),
  userId: z.string(),
  artistPhoto: z.string().url().optional(),
  artistName: z.string().optional(),
  artistId: z.string().optional(),
  eventDate: z.string().datetime().optional(),
  serviceName: z.string().optional(),
  deadline: z.string().datetime().optional(),
  deliveryDate: z.string().datetime().optional(),
  revisions: z.number().min(0).default(0),
  requirements: z.string().optional(),
  attachments: z.array(z.string()).default([])
});

/**
 * Tipo inferido del esquema de orden
 */
export type Order = z.infer<typeof orderSchema>;

/**
 * Propiedades para el componente de lista de órdenes
 */
export interface OrderListProps {
  orders: Order[];
  variant: 'made' | 'received';
  onOrderClick?: (order: Order) => void;
  isLoading?: boolean;
}

/**
 * Propiedades para el componente de tarjeta de orden
 */
export interface OrderCardProps {
  order: Order;
  variant: 'made' | 'received';
  onAccept?: () => Promise<void>;
  onReject?: () => Promise<void>;
  onCancel?: () => Promise<void>;
  onComplete?: () => Promise<void>;
  isProcessing?: boolean;
}

/**
 * Propiedades para el componente de detalle de orden
 */
export interface OrderDetailsProps {
  order: Order;
  onUpdate?: (updatedOrder: Partial<Order>) => Promise<void>;
  onStatusChange?: (status: OrderStatus) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Retorno del hook useOrders
 */
export interface UseOrdersReturn {
  ordersReceived: Order[];
  ordersMade: Order[];
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  acceptOrder: (orderId: string) => Promise<void>;
  rejectOrder: (orderId: string) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  completeOrder: (orderId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
} 