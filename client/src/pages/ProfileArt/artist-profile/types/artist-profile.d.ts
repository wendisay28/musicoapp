/**
 * Definiciones de tipos para el perfil de artista
 * Contiene las interfaces principales usadas en el feature
 */

export interface Artist {
    id: string;
    displayName: string;
    photoURL: string;
    coverImage: string;
    role: string;
    location: string;
    bio: string;
    rating?: number;
    reviewCount?: number;
    skills?: string[];
    availability?: any;
    gallery?: string[];
  }
  
  export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
  }
  
  export interface Review {
    id: string;
    userName: string;
    userPhotoURL: string;
    rating: number;
    comment: string;
    date: string;
  }
  
  export interface DateAvailability {
    date: Date;
    isAvailable: boolean;
  }