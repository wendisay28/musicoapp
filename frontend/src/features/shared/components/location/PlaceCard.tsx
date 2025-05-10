import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardFooter, CardHeader } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
/**
 * Tarjeta para mostrar información de un lugar
 *
 * @example
 * ```tsx
 * // Tarjeta simple
 * <PlaceCard
 *   place={place}
 *   onSelect={handleSelect}
 * />
 *
 * // Con botón de direcciones
 * <PlaceCard
 *   place={place}
 *   onSelect={handleSelect}
 *   onGetDirections={handleGetDirections}
 * />
 * ```
 */
export function PlaceCard (props: any){ place, onSelect, onGetDirections, className }) {
    return (_jsxs(Card, { className: cn('w-full', className), children: [_jsx(CardHeader, { className: "p-4", children: _jsx("h3", { className: "font-semibold", children: place.name }) }), _jsxs(CardContent, { className: "p-4 pt-0", children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 mt-1 text-muted-foreground" }), _jsx("p", { className: "text-sm text-muted-foreground", children: place.address })] }), place.distance && (_jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [place.distance.toFixed(1), " km"] }))] }), _jsxs(CardFooter, { className: "p-4 pt-0 flex gap-2", children: [onSelect && (_jsx(Button, { variant: "default", className: "flex-1", onClick: () => onSelect(place), children: "Seleccionar" })), onGetDirections && (_jsx(Button, { variant: "outline", size: "icon", onClick: () => onGetDirections(place), children: _jsx(Navigation, { className: "h-4 w-4" }) }))] })] }));
}
