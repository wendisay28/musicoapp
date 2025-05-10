import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, MapPin, Users, Video, Clock, Share2 } from 'lucide-react';
import { EventStats } from '../components/EventStats';
import { EventChat } from '@/features/chat/components/EventChat';
import { useGoogleCalendar } from '../hooks/useGoogleCalendar';
export function EventDetailsPage (props: any)) {
    const { id } = useParams();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('details');
    const { addToGoogleCalendar, sendReminder } = useGoogleCalendar();
    const { data: event, isLoading } = useQuery({
        queryKey: ['/api/events', id],
        queryFn: async () => {
            const response = await apiRequest({
                method: 'GET',
                url: `/api/events/${id}`
            });
            return response.json();
        }
    });
    const { data: stats } = useQuery({
        queryKey: ['/api/events/stats', id],
        queryFn: async () => {
            const response = await apiRequest({
                method: 'GET',
                url: `/api/events/${id}/stats`
            });
            return response.json();
        }
    });
    const handleRegister = async () => {
        try {
            await apiRequest({
                method: 'POST',
                url: `/api/events/${id}/register`
            });
            toast({
                title: 'Registro exitoso',
                description: 'Te has registrado al evento correctamente'
            });
        }
        catch (error) {
            console.error('Error registering to event:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo registrar al evento'
            });
        }
    };
    const handleShare = async () => {
        try {
            await navigator.share({
                title: event.title,
                text: event.description,
                url: window.location.href
            });
        }
        catch (error) {
            console.error('Error sharing event:', error);
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "container mx-auto px-4 py-6", children: _jsx("div", { className: "h-64 w-full rounded-lg bg-muted animate-pulse" }) }));
    }
    return (_jsx("div", { className: "container mx-auto px-4 py-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: event.imageUrl, alt: event.title, className: "w-full h-64 object-cover rounded-lg" }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute top-4 right-4 bg-background/80 backdrop-blur-sm", onClick: handleShare, children: _jsx(Share2, { className: "h-5 w-5" }) })] }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: event.title }), _jsx("p", { className: "text-muted-foreground", children: event.description })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Fecha y hora" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: format(new Date(event.startDate), "d 'de' MMMM 'de' yyyy", {
                                                                locale: es
                                                            }) })] }), _jsxs("div", { className: "flex items-center space-x-2 mt-2", children: [_jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }), _jsxs("span", { children: [format(new Date(event.startDate), 'HH:mm'), " -", ' ', format(new Date(event.endDate), 'HH:mm')] })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Ubicaci\u00F3n" }) }), _jsx(CardContent, { children: event.type === 'virtual' ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Video, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: "Evento virtual" })] })) : (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: event.location })] })) })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "details", children: "Detalles" }), _jsx(TabsTrigger, { value: "chat", children: "Chat" }), _jsx(TabsTrigger, { value: "stats", children: "Estad\u00EDsticas" })] }), _jsx(TabsContent, { value: "details", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Informaci\u00F3n adicional" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [event.maxParticipants && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Users, { className: "h-4 w-4 text-muted-foreground" }), _jsxs("span", { children: [event.currentParticipants, " / ", event.maxParticipants, " participantes"] })] })), event.virtualLink && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Video, { className: "h-4 w-4 text-muted-foreground" }), _jsx("a", { href: event.virtualLink, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "Enlace de la reuni\u00F3n" })] }))] }) })] }) }), _jsx(TabsContent, { value: "chat", children: _jsx(EventChat, { eventId: id }) }), _jsx(TabsContent, { value: "stats", children: stats && _jsx(EventStats, { stats: stats }) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Acciones" }) }), _jsxs(CardContent, { className: "space-y-2", children: [_jsx(Button, { className: "w-full", onClick: handleRegister, disabled: event.isRegistered || event.currentParticipants >= (event.maxParticipants || Infinity), children: event.isRegistered
                                                ? 'Registrado'
                                                : event.currentParticipants >= (event.maxParticipants || Infinity)
                                                    ? 'Cupos agotados'
                                                    : 'Registrarse' }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => addToGoogleCalendar(event), children: "Agregar a Google Calendar" }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => sendReminder(event, event.artist.email), children: "Enviar recordatorio" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Organizador" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("img", { src: event.artist.avatar, alt: event.artist.name, className: "h-12 w-12 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: event.artist.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: event.artist.role })] })] }) })] })] })] }) }));
}
