import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
/**
 * Componente que muestra los servicios ofrecidos por un artista
 *
 * @example
 * ```tsx
 * <ArtistServices
 *   services={artist.services}
 *   variant="preview"
 *   onContact={() => handleContact(artist.id)}
 *   onViewAll={() => navigate(`/artist/${artist.id}/services`)}
 * />
 *
 * <ArtistServices
 *   services={artist.services}
 *   variant="editable"
 *   onEdit={() => handleEdit()}
 * />
 * ```
 */
export function ArtistServices (props: any){ services = [], variant = 'default', onContact, onViewAll, onEdit, className }) {
    if (!services?.length) {
        return (_jsx(Card, { className: className, children: _jsx(CardContent, { className: "p-6 text-center", children: _jsx("p", { className: "text-muted-foreground", children: "Este artista a\u00FAn no ha agregado servicios" }) }) }));
    }
    const displayServices = variant === 'preview' ? services.slice(0, 2) : services;
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx(CardHeader, { className: "px-0", children: _jsx(CardTitle, { children: variant === 'preview' ? 'Servicios y Tarifas' : variant === 'editable' ? 'Editar Servicios' : 'Todos los Servicios' }) }), _jsxs("div", { className: "space-y-3", children: [displayServices.map(service => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "font-medium", children: service.name }), _jsx("span", { className: "text-primary font-medium", children: new Intl.NumberFormat('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }).format(service.price) })] }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: service.description }), service.duration && (_jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: ["Duraci\u00F3n: ", service.duration, " minutos"] })), variant === 'default' && onContact && (_jsx("div", { className: "mt-4 flex justify-end", children: _jsxs(Button, { onClick: onContact, children: [_jsx(MessageCircle, { className: "mr-2 h-4 w-4" }), "Contactar"] }) }))] }) }, service.id))), variant === 'preview' && services.length > 2 && onViewAll && (_jsxs(Button, { variant: "outline", className: "w-full", onClick: onViewAll, children: ["Ver todos los servicios (", services.length, ")"] })), variant === 'editable' && onEdit && (_jsx("div", { className: "mt-4 flex justify-end", children: _jsxs(Button, { onClick: onEdit, children: [_jsx(MessageCircle, { className: "mr-2 h-4 w-4" }), "Editar"] }) }))] })] }));
}
