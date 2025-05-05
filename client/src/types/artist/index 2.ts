import { z } from 'zod';

// Enums
export enum PriceUnit {
  HOUR = 'hora',
  EVENT = 'evento',
  DAY = 'día'
}

export enum ArtistAvailability {
  AVAILABLE = 'available',
  BUSY = 'busy',
  UNAVAILABLE = 'unavailable'
}

// Esquemas de validación
export const mediaItemSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'video']),
  url: z.string().url(),
  alt: z.string().optional(),
  thumbnail: z.string().url().optional()
});

export const artistServiceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  duration: z.string().optional(),
  category: z.string().min(1, 'La categoría es requerida')
});

export const availabilityDateSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  isAvailable: z.boolean()
});

// Interfaces principales
export interface ArtistProfile {
  id: string;
  userId: string;
  displayName: string;
  photoURL: string;
  coverImage: string;
  role: string;
  location?: string;
  bio?: string;
  skills?: string[];
  rating?: number;
  reviewCount?: number;
  category: string;
  subcategory?: string;
  minPrice: number;
  maxPrice: number;
  priceUnit?: PriceUnit;
  gallery: string[];
  tags?: string[];
  portfolioUrl?: string;
  experienceYears?: number;
  available?: boolean;
  availability?: ArtistAvailability;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
}

export interface ArtistService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

export interface ArtistReview {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  rating: number;
  comment: string;
  date: string;
  service?: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  alt?: string;
  thumbnail?: string;
}

// Tipos para formularios
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

// Props de componentes
export interface ArtistProfileProps {
  profile: ArtistProfile;
  onUpdate?: (updatedProfile: Partial<ArtistProfile>) => Promise<void>;
  isLoading?: boolean;
}

export interface ArtistGalleryProps {
  gallery?: MediaItem[];
  artistName: string;
  className?: string;
}

export interface ArtistServicesProps {
  services: ArtistService[];
  onContact?: () => void;
}

export interface ArtistReviewsProps {
  reviews: ArtistReview[];
  rating?: number;
  reviewCount?: number;
} 