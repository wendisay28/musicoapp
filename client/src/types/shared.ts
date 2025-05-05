import { ReactNode } from 'react';

export interface BaseProps {
  /** Clases CSS personalizadas */
  className?: string;
  /** ID del elemento */
  id?: string;
  /** Estilos en línea */
  style?: React.CSSProperties;
}

export interface WithChildren {
  /** Contenido del componente */
  children?: ReactNode;
}

export interface WithRequiredChildren {
  /** Contenido requerido del componente */
  children: ReactNode;
}

export interface LoadingState {
  /** Estado de carga */
  isLoading: boolean;
  /** Error si existe */
  error?: Error | null;
}

export interface PaginationParams {
  /** Página actual */
  page: number;
  /** Tamaño de página */
  pageSize: number;
}

export interface PaginatedResponse<T> {
  /** Datos paginados */
  data: T[];
  /** Total de elementos */
  total: number;
  /** Página actual */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
}

export interface ValidationError {
  /** Campo con error */
  field: string;
  /** Mensaje de error */
  message: string;
}

export interface ApiError {
  /** Código de error */
  code: string;
  /** Mensaje de error */
  message: string;
  /** Detalles adicionales */
  details?: unknown;
}

export interface Location {
  /** Latitud */
  lat: number;
  /** Longitud */
  lng: number;
  /** Dirección */
  address?: string;
  /** Ciudad */
  city?: string;
  /** País */
  country?: string;
}

export interface Image {
  /** URL de la imagen */
  url: string;
  /** Alt text */
  alt?: string;
  /** Ancho */
  width?: number;
  /** Alto */
  height?: number;
}

export interface Rating {
  /** Valor de la calificación */
  value: number;
  /** Total de reseñas */
  count: number;
  /** Promedio */
  average: number;
}

export interface SocialLinks {
  /** Facebook */
  facebook?: string;
  /** Instagram */
  instagram?: string;
  /** Twitter */
  twitter?: string;
  /** LinkedIn */
  linkedin?: string;
  /** Website */
  website?: string;
}

export interface ContactInfo {
  /** Email */
  email?: string;
  /** Teléfono */
  phone?: string;
  /** WhatsApp */
  whatsapp?: string;
  /** Otros medios */
  other?: string[];
} 