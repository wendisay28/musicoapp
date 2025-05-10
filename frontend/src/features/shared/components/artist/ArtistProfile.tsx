import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArtistGallery } from './ArtistGallery';
import { ArtistAbout } from './ArtistAbout';
import { ArtistServices } from './ArtistServices';
import { ArtistReviews } from './ArtistReviews';
import { cn } from '@/lib/utils';
/**
 * Componente que muestra el perfil completo de un artista
 * Incluye galería, información personal, servicios y reseñas
 *
 * @example
 * ```tsx
 * <ArtistProfile
 *   artist={artist}
 *   isOwnProfile={true}
 *   onEditProfile={() => handleEditProfile()}
 *   onEditServices={() => handleEditServices()}
 *   onEditReviews={() => handleEditReviews()}
 * />
 * ```
 */
export function ArtistProfile (props: any){ artist, isOwnProfile = false, onEditProfile, onEditServices, onEditReviews, className }) {
    return (_jsxs("div", { className: cn('space-y-8', className), children: [_jsx(ArtistGallery, { artist: artist, variant: "preview", maxPreview: 3, emptyMessage: "No hay im\u00E1genes en la galer\u00EDa" }), _jsx(ArtistAbout, { artist: artist, variant: isOwnProfile ? 'editable' : 'default', onEdit: isOwnProfile ? onEditProfile : undefined }), _jsx(ArtistServices, { services: artist.services, variant: isOwnProfile ? 'editable' : 'default', onEdit: isOwnProfile ? onEditServices : undefined }), _jsx(ArtistReviews, { reviews: artist.reviews, variant: isOwnProfile ? 'editable' : 'default', emptyMessage: "Este artista a\u00FAn no tiene rese\u00F1as", onEdit: isOwnProfile ? onEditReviews : undefined })] }));
}
