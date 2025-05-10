import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@/features/ui/components/skeleton';
import { Card, CardContent } from '@/features/ui/components/card';
import { Button } from '@/features/ui/components/button';
import BaseCard from '@/features/shared/components/artist-card';
import { Calendar } from "lucide-react";
import { Link } from "wouter";
export default function FavoriteEventsTab (props: any){ events, isLoading, onRemove, onShare, }) {
    if (isLoading) {
        return (_jsx("div", { className: "space-y-4", children: Array(3).fill(0).map((_, i) => (_jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, i))) }));
    }
    if (events.length === 0) {
        return (_jsx(Card, { children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx(Calendar, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }), _jsx("h3", { className: "font-semibold text-xl mb-2", children: "No tienes eventos favoritos" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Explora eventos y a\u00F1\u00E1delos a tus favoritos para verlos aqu\u00ED" }), _jsx(Link, { href: "/explore", children: _jsx(Button, { children: "Explorar eventos" }) })] }) }));
    }
    return (_jsx("div", { className: "space-y-4", children: events.map((event) => (_jsx(BaseCard, { id: event.id, title: event.name, image: event.image, description: event.description, location: event.location, type: "event", onFavorite: () => onRemove(event.id), isFavorite: true, additionalInfo: {
                date: event.date,
                capacity: event.capacity,
                isOpen: !new Date(event.date) < new Date()
            } }, event.id))) }));
}
