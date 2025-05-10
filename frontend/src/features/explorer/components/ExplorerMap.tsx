import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/features/ui/components/card';
import { cn } from '@/lib/utils';
export function ExplorerMap (props: any){ places, events, onPlaceClick, onEventClick, className }) {
    return (_jsxs(Card, { className: cn('h-[600px] relative', className), children: [_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-muted", children: _jsx("p", { className: "text-muted-foreground", children: "Mapa en desarrollo" }) }), places.map((place) => (_jsx("div", { className: "absolute cursor-pointer", style: {
                    left: `${place.location.lat}%`,
                    top: `${place.location.lng}%`
                }, onClick: () => onPlaceClick?.(place), children: _jsx("div", { className: "w-4 h-4 bg-primary rounded-full" }) }, place.id))), events.map((event) => (_jsx("div", { className: "absolute cursor-pointer", style: {
                    left: `${event.location.lat}%`,
                    top: `${event.location.lng}%`
                }, onClick: () => onEventClick?.(event), children: _jsx("div", { className: "w-4 h-4 bg-secondary rounded-full" }) }, event.id)))] }));
}
