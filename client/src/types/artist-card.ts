import { ArtistProfile } from './artist';

export interface ArtistCardProps {
  /** Perfil del artista */
  artist: ArtistProfile;
  /** Callback cuando se hace clic en ver perfil */
  onViewProfile?: () => void;
  /** Callback cuando se hace clic en contactar */
  onContact?: () => void;
  /** Clases CSS personalizadas */
  className?: string;
  /** Mostrar botón de favoritos */
  showFavoriteButton?: boolean;
  /** Estado de favorito */
  isFavorite?: boolean;
  /** Callback cuando se hace clic en favorito */
  onToggleFavorite?: () => void;
}

export interface ArtistCardFooterProps {
  /** Rating del artista */
  rating: number | null;
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