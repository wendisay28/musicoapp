import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from '@/features/ui/components/card';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Users } from 'lucide-react';
/**
 * Lista de eventos con información básica
 *
 * @example
 * ```tsx
 * // Lista simple
 * <EventsList
 *   events={events}
 *   onSelect={handleSelect}
 * />
 * ```
 */
export function EventsList (props: any){ events, onSelect, className }) {
    return (_jsx("div", { className: cn('space-y-4', className), children: events.map((event) => (_jsx(Card, { className: "cursor-pointer hover:bg-accent/50 transition-colors", onClick: () => onSelect?.(event), children: _jsxs(CardContent, { className: "p-4", children: [_jsx("h3", { className: "font-semibold", children: event.title }), _jsxs("div", { className: "mt-2 space-y-1 text-sm text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-4 w-4" }), _jsx("span", { children: new Date(event.date).toLocaleDateString() })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4" }), _jsx("span", { children: event.location })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4" }), _jsxs("span", { children: [event.attendees.length, " asistentes"] })] })] })] }) }, event.id))) }));
}
