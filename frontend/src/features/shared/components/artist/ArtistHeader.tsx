import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarImage, AvatarFallback } from '@/features/shared/components/ui/avatar';
import { Button } from '@/features/shared/components/ui/button';
import { Card, CardContent } from '@/features/shared/components/ui/card';
import { cn } from '@/lib/utils';
/**
 * Encabezado que muestra la información principal de un artista
 *
 * @example
 * ```tsx
 * // Variante por defecto (para páginas de perfil)
 * <ArtistHeader
 *   artist={artist}
 *   variant="default"
 *   onFollow={() => handleFollow()}
 *   onContact={() => handleContact()}
 * />
 *
 * // Variante de perfil (dentro de una tarjeta)
 * <ArtistHeader
 *   artist={artist}
 *   variant="profile"
 *   isOwnProfile={true}
 *   onEditProfile={() => handleEdit()}
 * />
 *
 * // Variante completa (con todos los detalles)
 * <ArtistHeader
 *   artist={artist}
 *   variant="full"
 *   onViewServices={() => handleViewServices()}
 * />
 *
 * // Variante compacta (para listados)
 * <ArtistHeader
 *   artist={artist}
 *   variant="compact"
 * />
 * ```
 */
export function ArtistHeader (props: any){ artist, variant = 'default', isOwnProfile = false, onEditProfile, onFollow, onContact, onViewServices, className }) {
    // Variante compacta (para listados)
    if (variant === 'compact') {
        return (_jsxs("div", { className: cn('flex items-center gap-4', className), children: [_jsxs(Avatar, { className: "h-12 w-12", children: [_jsx(AvatarImage, { src: artist.avatar, alt: artist.name }), _jsx(AvatarFallback, { children: artist.name.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold truncate", children: artist.name }), artist.specialties && artist.specialties.length > 0 && (_jsx("p", { className: "text-sm text-muted-foreground truncate", children: artist.specialties.join(', ') }))] })] }));
    }
    // Variante completa (con imagen de portada)
    if (variant === 'full') {
        return (_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "h-64 w-full", children: [_jsx("img", { src: artist.coverImage, alt: `Portada de ${artist.name}`, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black/50" })] }), _jsx("div", { className: "container mx-auto px-4 -mt-16 relative", children: _jsxs("div", { className: "flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg shadow-lg p-6", children: [_jsxs(Avatar, { className: "h-32 w-32 border-4 border-white", children: [_jsx(AvatarImage, { src: artist.avatar, alt: artist.name }), _jsx(AvatarFallback, { children: artist.name.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: "flex-1 text-center md:text-left", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: artist.name }), _jsx("p", { className: "text-muted-foreground mb-4", children: artist.bio }), _jsxs("div", { className: "flex gap-4 justify-center md:justify-start", children: [onContact && (_jsx(Button, { onClick: onContact, children: "Contactar" })), onViewServices && (_jsx(Button, { variant: "outline", onClick: onViewServices, children: "Ver Servicios" }))] })] })] }) })] }));
    }
    // Variante de perfil (dentro de una tarjeta)
    if (variant === 'profile') {
        return (_jsx(Card, { className: cn('w-full', className), children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsxs(Avatar, { className: "h-24 w-24", children: [_jsx(AvatarImage, { src: artist.avatar, alt: artist.name }), _jsx(AvatarFallback, { children: artist.name.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold", children: artist.name }), isOwnProfile ? (_jsx(Button, { onClick: onEditProfile, children: "Editar Perfil" })) : (_jsx(Button, { onClick: onFollow, children: "Seguir" }))] }), artist.bio && (_jsx("p", { className: "mt-2 text-muted-foreground", children: artist.bio })), _jsxs("div", { className: "mt-4 flex gap-6", children: [_jsxs("div", { children: [_jsx("span", { className: "font-semibold", children: artist.eventsCount }), _jsx("span", { className: "text-muted-foreground", children: " eventos" })] }), _jsxs("div", { children: [_jsx("span", { className: "font-semibold", children: artist.followersCount }), _jsx("span", { className: "text-muted-foreground", children: " seguidores" })] }), _jsxs("div", { children: [_jsx("span", { className: "font-semibold", children: artist.rating }), _jsx("span", { className: "text-muted-foreground", children: " calificaci\u00F3n" })] })] })] })] }) }) }));
    }
    // Variante por defecto
    return (_jsxs("div", { className: cn('flex items-center gap-6', className), children: [_jsxs(Avatar, { className: "h-24 w-24", children: [_jsx(AvatarImage, { src: artist.avatar, alt: artist.name }), _jsx(AvatarFallback, { children: artist.name.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h1", { className: "text-2xl font-bold", children: artist.name }), _jsx("p", { className: "text-muted-foreground", children: artist.bio }), _jsxs("div", { className: "mt-4 flex items-center gap-4", children: [_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-semibold", children: artist.eventsCount }), " eventos"] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-semibold", children: artist.followersCount }), " seguidores"] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-semibold", children: artist.rating }), " calificaci\u00F3n"] })] })] }), _jsxs("div", { className: "flex gap-2", children: [onFollow && _jsx(Button, { onClick: onFollow, children: "Seguir" }), onContact && _jsx(Button, { variant: "outline", onClick: onContact, children: "Contactar" })] })] }));
}
