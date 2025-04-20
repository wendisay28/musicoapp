/**
 * Tipos fundamentales para la aplicación
 * 
 * Organización:
 * 1. Usuarios y autenticación
 * 2. Órdenes y transacciones
 * 3. Tipos compartidos / utilitarios
 * 4. Formularios
 */

// ==================== 1. USUARIOS Y AUTENTICACIÓN ====================

export interface UserBase {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ClientProfile extends UserBase {
  role: 'CLIENT';
  shippingAddresses?: string[];
}

export interface ArtistProfile extends UserBase {
  role: 'ARTIST';
  specialties: string[];
  portfolioUrls: string[];
  rating?: number;
}

export type User = ClientProfile | ArtistProfile;

// ==================== 2. ÓRDENES Y TRANSACCIONES ====================

export type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'delivered' | 'active';

export type OrderStatusLabel = 'Pendiente' | 'Aceptada' | 'Rechazada' | 'Cancelada' | 'Completada';


export interface OrderItem {
  id: string;
  artworkId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  clientId: string;
  artistId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
  deliveryAddress?: string;
  specialRequests?: string;
}

// ==================== 3. TIPOS COMPARTIDOS / UTILITARIOS ====================

export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

export interface Timestamp {
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

// ==================== 4. FORMULARIOS ====================

export interface LoginForm {
  email: string;
  password: string;
}

export interface OrderCreateForm {
  artistId: string;
  items: Array<{
    artworkId: string;
    quantity: number;
  }>;
  deliveryAddress: string;
}
export interface OrderUpdateForm {
  status: OrderStatus;
  specialRequests?: string;
}
export interface EventFormValues {
  name: string;
  date: string;
  description: string;
  eventType: 'virtual' | 'in-person';
  virtualLink?: string;
  image?: string;
  location?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  capacity?: number;
  price?: number;
  category?: string;
  tags?: string[];
}