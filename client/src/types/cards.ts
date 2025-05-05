import { ArtistProfile } from './artist';
import { Event } from './shared';

export interface BaseCardProps {
  /** Clases CSS personalizadas */
  className?: string;
  /** ID único del elemento */
  id?: string;
}

export interface ArtistCardProps extends BaseCardProps {
  /** Perfil del artista */
  artist: ArtistProfile;
  /** Callback cuando se hace clic en ver perfil */
  onViewProfile?: () => void;
  /** Callback cuando se hace clic en contactar */
  onContact?: () => void;
  /** Mostrar botón de favoritos */
  showFavoriteButton?: boolean;
  /** Estado de favorito */
  isFavorite?: boolean;
  /** Callback cuando se hace clic en favorito */
  onToggleFavorite?: () => void;
}

export interface EventCardProps extends BaseCardProps {
  /** Datos del evento */
  event: Event;
  /** Callback cuando se hace clic en ver detalles */
  onViewDetails?: () => void;
  /** Callback cuando se hace clic en reservar */
  onBook?: () => void;
  /** Mostrar botón de favoritos */
  showFavoriteButton?: boolean;
  /** Estado de favorito */
  isFavorite?: boolean;
  /** Callback cuando se hace clic en favorito */
  onToggleFavorite?: () => void;
}

export interface CardFooterProps {
  /** Rating del elemento */
  rating?: number | null;
  /** Callback cuando se hace clic en ver detalles */
  onViewDetails?: () => void;
  /** Callback cuando se hace clic en contactar */
  onContact?: () => void;
  /** Mostrar botón de favoritos */
  showFavoriteButton?: boolean;
  /** Estado de favorito */
  isFavorite?: boolean;
  /** Callback cuando se hace clic en favorito */
  onToggleFavorite?: () => void;
} 