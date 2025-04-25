// src/pages/profile/types.ts

/**
 * Tipos relacionados con órdenes/pedidos
 */
export type OrderStatus = 'active' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  categoryName: string;
  status: OrderStatus;
  price: number;
  currency?: string;
  userPhoto?: string;
  userName: string;
  userId: string;
  artistPhoto?: string;
  artistName?: string;
  artistId?: string;
  eventDate?: string;
  serviceName?: string;
  deadline?: string;
  deliveryDate?: string;
  revisions?: number;
  requirements?: string;
  attachments?: string[];
}

/**
 * Tipos para el perfil de artista
 */
export interface ArtistProfile {
  id: string;
  userId: string;
  category: string;
  subcategory?: string;
  minPrice: number;
  maxPrice: number;
  priceUnit?: string;
  gallery: string[];
  tags?: string[];
  rating?: number;
  reviewsCount?: number;
  portfolioUrl?: string;
  experienceYears?: number;
  available?: boolean;
}

/**
 * Tipos para eventos
 */
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  image: string;
  eventType: 'virtual' | 'in-person';
  location?: {
    address: string;
    city: string;
    country: string;
    coordinates?: [number, number];
  };
  virtualLink?: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  artistId: string;
  price?: number;
  capacity?: number;
  isFeatured?: boolean;
}

/**
 * Tipos para datos de usuario
 */
export interface UserData {
  displayName: string;
  username: string;
  bio: string;
  role: 'artist' | 'client' | 'admin';
  location: string;
  skills: string[];
  photoURL: string;
  category: string;
  subcategory: string;
  tags: string[];
  email?: string;
  phone?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

/**
 * Tipos para formularios de perfil
 */
export interface ProfileFormValues {
  displayName: string;
  username: string;
  bio?: string;
  role: 'artist' | 'client';
  location?: string;
  skills: string[];
  photoURL?: string;
  category?: string;
  subcategory?: string;
  tags: string[];
  email?: string;
  phone?: string;
}

/**
 * Tipos para el hook useOrders
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

/**
 * Tipos para componentes de órdenes
 */
export interface OrdersSectionProps {
  defaultTab?: 'made' | 'received' | 'accepted';
  className?: string;
  userId: string;
}

export interface OrdersMadeProps {
  className?: string;
}

export interface OrdersReceivedProps {
  className?: string;
  userId: string;
}

export interface OrderCardProps {
  order: Order;
  variant: 'made' | 'received';
  status: OrderStatus;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  isProcessing?: boolean;
  className?: string;
}

/**
 * Tipos para notificaciones
 */
export interface Notification {
  id: string;
  type: 'order' | 'message' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
  senderId?: string;
  senderName?: string;
  senderPhoto?: string;
}

/**
 * Tipos para mensajes
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  read: boolean;
  attachments?: string[];
}

/**
 * Tipos para conversaciones
 */
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  updatedAt: string;
  unreadCount: number;
  orderId?: string;
}