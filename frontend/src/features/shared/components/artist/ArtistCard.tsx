import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from '@/features/shared/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/features/shared/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';
/**
 * Tarjeta que muestra la información básica de un artista
 * Se utiliza en listados y búsquedas
 *
 * @example
 * ```tsx
 * // Variante por defecto (vertical)
 * <ArtistCard
 *   artist={artist}
 *   variant="default"
 * />
 *
 * // Variante compacta
 * <ArtistCard
 *   artist={artist}
 *   variant="compact"
 * />
 *
 * // Variante horizontal
 * <ArtistCard
 *   artist={artist}
 *   variant="horizontal"
 * />
 * ```
 */
export function ArtistCard (props: any){ artist, variant = 'default', onClick, className }) {
    const handleClick: React.FC = () => {
        onClick?.(artist);
    };
    const specialties = artist.specialties || [];
    return (_jsx(Link, { href: `/artist/${artist.id}`, children: _jsxs(Card, { className: cn('cursor-pointer transition-all hover:shadow-md', variant === 'compact' ? 'p-2' : 'p-4', variant === 'horizontal' && 'flex items-center gap-4', className), onClick: handleClick, children: [_jsx(CardHeader, { className: cn('p-0', variant === 'compact' && 'pb-2', variant === 'horizontal' && 'flex-1'), children: _jsxs("div", { className: cn('flex items-center gap-4', variant === 'horizontal' && 'flex-1'), children: [_jsxs(Avatar, { className: cn('border-2 border-primary', variant === 'compact' ? 'h-12 w-12' : 'h-16 w-16'), children: [_jsx(AvatarImage, { src: artist.avatar, alt: artist.name }), _jsx(AvatarFallback, { children: artist.name.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold truncate", children: artist.name }), specialties.length > 0 && (_jsx("p", { className: "text-sm text-muted-foreground truncate", children: specialties.join(', ') }))] })] }) }), _jsx(CardContent, { className: cn('p-0', variant === 'horizontal' && 'flex items-center gap-4'), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400 fill-yellow-400" }), _jsx("span", { className: "text-sm font-medium", children: artist.rating?.toFixed(1) || 'N/A' })] }), artist.minPrice && (_jsxs("div", { className: "text-sm font-medium", children: ["Desde $", artist.minPrice, artist.priceUnit && _jsxs("span", { className: "text-muted-foreground", children: ["/", artist.priceUnit] })] }))] }) })] }) }));
}
