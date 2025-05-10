import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from '@/features/shared/components/ui/card';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
/**
 * Componente que muestra las reseñas de un artista
 *
 * @example
 * ```tsx
 * <ArtistReviews
 *   reviews={artist.reviews}
 *   emptyMessage="Este artista aún no tiene reseñas"
 * />
 *
 * <ArtistReviews
 *   reviews={artist.reviews}
 *   variant="editable"
 *   onEdit={() => handleEdit()}
 * />
 * ```
 */
export function ArtistReviews (props: any){ reviews = [], variant = 'default', emptyMessage = "Este artista aún no tiene reseñas.", onEdit, className }) {
    if (!reviews.length) {
        return (_jsx("div", { className: "text-center py-8 text-muted-foreground", children: _jsx("p", { children: emptyMessage }) }));
    }
    return (_jsx("div", { className: cn('space-y-4', className), role: "list", "aria-label": "Rese\u00F1as del artista", children: reviews.map((review) => (_jsxs(Card, { role: "listitem", className: cn(variant === 'preview' && 'border-dashed', variant === 'editable' && 'hover:border-primary cursor-pointer'), onClick: variant === 'editable' ? onEdit : undefined, children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-4", children: [_jsx("img", { src: review.userPhoto, alt: `Foto de perfil de ${review.userName}`, className: "w-10 h-10 rounded-full", width: 40, height: 40, loading: "lazy" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: review.userName }), _jsxs("div", { className: "flex items-center gap-1", role: "img", "aria-label": `Calificación: ${review.rating} de 5 estrellas`, children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400 fill-yellow-400", "aria-hidden": "true" }), _jsx("span", { className: "text-sm", children: review.rating })] })] })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground", children: review.comment }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", "aria-label": `Fecha de la reseña: ${new Date(review.date).toLocaleDateString()}`, children: new Date(review.date).toLocaleDateString() })] })] }, review.id))) }));
}
