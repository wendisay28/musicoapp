import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Badge } from '@/features/shared/components/ui/badge';
import { cn } from '@/lib/utils';
/**
 * Componente que muestra información detallada del artista
 * Incluye biografía, especialidades, experiencia y más
 *
 * @example
 * ```tsx
 * <ArtistAbout
 *   artist={artist}
 *   variant="default"
 * />
 *
 * <ArtistAbout
 *   artist={artist}
 *   variant="editable"
 *   onEdit={() => handleEdit()}
 * />
 * ```
 */
export function ArtistAbout (props: any){ artist, variant = 'default', onEdit, className }) {
    const specialties = artist.specialties || [];
    return (_jsxs(Card, { className: cn('w-full', variant === 'editable' && 'hover:border-primary cursor-pointer', variant === 'compact' && 'p-4', className), onClick: variant === 'editable' ? onEdit : undefined, children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Sobre el Artista" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("section", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Biograf\u00EDa" }), _jsx("p", { className: "text-muted-foreground", children: artist.bio })] }), specialties.length > 0 && (_jsxs("section", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Especialidades" }), _jsx("div", { className: "flex flex-wrap gap-2", children: specialties.map((specialty) => (_jsx(Badge, { variant: "secondary", className: "px-3 py-1", children: specialty }, specialty))) })] })), artist.experience && (_jsxs("section", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Experiencia" }), _jsxs("p", { className: "text-muted-foreground", children: [artist.experience, " a\u00F1os de experiencia"] })] })), artist.contactInfo && (_jsxs("section", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Contacto" }), _jsxs("div", { className: "space-y-2", children: [artist.contactInfo.email && (_jsxs("p", { className: "text-muted-foreground", children: ["Email: ", artist.contactInfo.email] })), artist.contactInfo.phone && (_jsxs("p", { className: "text-muted-foreground", children: ["Tel\u00E9fono: ", artist.contactInfo.phone] })), artist.contactInfo.website && (_jsxs("p", { className: "text-muted-foreground", children: ["Sitio web: ", artist.contactInfo.website] }))] })] })), artist.socialMedia && Object.keys(artist.socialMedia).length > 0 && (_jsxs("section", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Redes Sociales" }), _jsx("div", { className: "space-y-2", children: Object.entries(artist.socialMedia).map(([platform, url]) => (_jsxs("p", { className: "text-muted-foreground", children: [platform, ": ", url] }, platform))) })] }))] })] }));
}
