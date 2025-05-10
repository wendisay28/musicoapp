import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/features/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/shared/components/ui/tabs';
import { Input } from '@/features/shared/components/ui/input';
import { Calendar, Clock, MapPin, Star, Heart, Share2, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
export default function EventDetailsPage (props: any)) {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('details');
    const [tickets, setTickets] = useState(1);
    // Datos de ejemplo
    const event: any = {
        id, // Usa el id obtenido de useParams
        title: 'Taller de Pintura al Óleo',
        description: 'Aprende las técnicas básicas de la pintura al óleo en este taller práctico. Perfecto para principiantes y artistas intermedios que quieran mejorar sus habilidades.',
        date: new Date('2024-03-20'),
        time: '15:00',
        location: 'Galería de Arte Moderno',
        address: 'Calle 123 #45-67, Bogotá',
        capacity: 20,
        available: 15,
        price: 50,
        category: 'Taller',
        imageUrl: 'https://source.unsplash.com/random/800x600?workshop',
        artist: {
            id: '1',
            name: 'María González',
            imageUrl: 'https://source.unsplash.com/random/800x600?artist',
            rating: 4.8,
            reviewCount: 24
        },
        reviews: [
            {
                id: '1',
                user: 'Juan Pérez',
                rating: 5,
                comment: 'Excelente taller, aprendí mucho sobre las técnicas básicas.',
                date: new Date('2024-02-15')
            }
        ]
    };
    return (_jsx("div", { className: "container mx-auto py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "relative h-96 rounded-lg overflow-hidden", children: [_jsx("img", { src: event.imageUrl, alt: event.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium", children: event.category })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold", children: event.title }), _jsxs("div", { className: "flex items-center gap-4 text-gray-500", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5" }), _jsx("span", { children: format(event.date, "EEEE d 'de' MMMM", { locale: es }) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-5 w-5" }), _jsx("span", { children: event.time })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5" }), _jsx("span", { children: event.location })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "details", children: "Detalles" }), _jsx(TabsTrigger, { value: "artist", children: "Artista" }), _jsx(TabsTrigger, { value: "reviews", children: "Rese\u00F1as" })] }), _jsxs(TabsContent, { value: "details", className: "space-y-4", children: [_jsx("p", { className: "text-gray-600", children: event.description }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-semibold", children: "Ubicaci\u00F3n" }), _jsx("p", { className: "text-gray-600", children: event.address })] })] }), _jsx(TabsContent, { value: "artist", className: "space-y-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: event.artist.imageUrl, alt: event.artist.name, className: "w-16 h-16 rounded-full object-cover" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: event.artist.name }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-400" }), _jsx("span", { children: event.artist.rating.toFixed(1) }), _jsxs("span", { children: ["(", event.artist.reviewCount, " ", event.artist.reviewCount === 1 ? 'reseña' : 'reseñas', ")"] })] })] })] }) }), _jsx(TabsContent, { value: "reviews", className: "space-y-4", children: event.reviews.map((review) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: review.user }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-500", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-400" }), _jsx("span", { children: review.rating }), _jsx("span", { children: format(review.date, "d 'de' MMMM yyyy", { locale: es }) })] })] }) }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-gray-600", children: review.comment }) })] }, review.id))) })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Reservar" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Precio por persona" }), _jsxs("span", { className: "text-xl font-bold", children: ["$", event.price] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Cantidad de entradas" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { type: "number", min: "1", max: event.available, value: tickets, onChange: (e) => setTickets(Number(e.target.value)), className: "w-20" }), _jsxs("span", { className: "text-sm text-gray-500", children: [event.available, " disponibles"] })] })] }), _jsxs("div", { className: "flex items-center justify-between font-semibold", children: [_jsx("span", { children: "Total" }), _jsxs("span", { children: ["$", event.price * tickets] })] }), _jsx(Button, { className: "w-full", children: "Reservar ahora" })] })] }), _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx(Button, { variant: "outline", size: "icon", children: _jsx(Heart, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Share2, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(MessageCircle, { className: "h-5 w-5" }) })] })] })] }) }));
}
