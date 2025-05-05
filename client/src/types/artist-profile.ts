export interface ArtistProfile {
  /** ID único del artista */
  id: string;
  /** Nombre del artista */
  name: string;
  /** Imagen de perfil del artista */
  imageUrl?: string;
  /** Descripción del artista */
  description: string;
  /** Ubicación del artista */
  location: string;
  /** Calificación promedio */
  rating: number;
  /** Número de reseñas */
  reviewCount: number;
  /** Habilidades del artista */
  skills: string[];
  /** Precio por hora */
  hourlyRate: number;
  /** Disponibilidad del artista */
  availability: string;
  /** Servicios ofrecidos */
  services: ArtistService[];
  /** Redes sociales */
  socialMedia: SocialMedia;
  /** Portafolio */
  portfolio: PortfolioItem[];
  /** Reseñas */
  reviews: Review[];
}

export interface ArtistService {
  /** ID del servicio */
  id: string;
  /** Nombre del servicio */
  name: string;
  /** Descripción del servicio */
  description: string;
  /** Precio del servicio */
  price: number;
  /** Duración estimada */
  duration: string;
  /** Categoría del servicio */
  category: string;
}

export interface SocialMedia {
  /** URL de Instagram */
  instagram?: string;
  /** URL de Facebook */
  facebook?: string;
  /** URL de Twitter */
  twitter?: string;
  /** URL de LinkedIn */
  linkedin?: string;
  /** URL de sitio web personal */
  website?: string;
}

export interface PortfolioItem {
  /** ID del item */
  id: string;
  /** Título del trabajo */
  title: string;
  /** Descripción del trabajo */
  description: string;
  /** URL de la imagen */
  imageUrl: string;
  /** Categoría del trabajo */
  category: string;
  /** Fecha de creación */
  createdAt: string;
}

export interface Review {
  /** ID de la reseña */
  id: string;
  /** ID del usuario que escribió la reseña */
  userId: string;
  /** Nombre del usuario */
  userName: string;
  /** Imagen del usuario */
  userImage?: string;
  /** Calificación */
  rating: number;
  /** Comentario */
  comment: string;
  /** Fecha de la reseña */
  date: string;
} 