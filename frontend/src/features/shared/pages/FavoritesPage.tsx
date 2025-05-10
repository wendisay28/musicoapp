import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/features/shared/hooks/use-toast';
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/shared/components/ui/tabs";
import { Button } from "@/features/shared/components/ui/button";
import { Link } from "wouter";
import { UserCheck, Calendar } from "lucide-react";
import FavoriteArtistsTab from "./FavoriteArtistsTab";
import FavoriteEventsTab from "./FavoriteEventsTab";
export default function FavoritesPage (props: any)) {
    const { user } = useAuth();
    const { toast } = useToast();
    const { data: favoriteArtists, isLoading: isLoadingArtists } = useQuery({
        queryKey: ['/api/favorites/artists'],
        queryFn: async () => {
            const response = await apiRequest({
                method: 'GET',
                url: '/api/favorites/artists'
            });
            return response.json();
        },
        enabled: !!user,
        throwOnError: false,
    });
    const { data: favoriteEvents, isLoading: isLoadingEvents } = useQuery({
        queryKey: ['/api/favorites/events'],
        queryFn: async () => {
            const response = await apiRequest({
                method: 'GET',
                url: '/api/favorites/events'
            });
            return response.json();
        },
        enabled: !!user,
        throwOnError: false,
    });
    const handleRemoveFavorite = async (id, type) => {
        if (!user) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Debes iniciar sesión para eliminar favoritos",
            });
            return;
        }
        try {
            await apiRequest({
                method: "DELETE",
                url: `/api/favorites/${type}/${id}`,
                data: {
                    userId: user.uid,
                }
            });
            queryClient.invalidateQueries({ queryKey: [`/api/favorites/${type}s`] });
            toast({
                title: "Favorito eliminado",
                description: `El ${type === 'artist' ? 'artista' : 'evento'} ha sido eliminado de tus favoritos`,
            });
        }
        catch (error) {
            console.error(`Error removing ${type}:`, error);
            toast({
                variant: "destructive",
                title: "Error",
                description: `Hubo un problema al eliminar el ${type === 'artist' ? 'artista' : 'evento'} de tus favoritos`,
            });
        }
    };
    const handleShareEvent: React.FC = (id) => {
        const event = favoriteEvents?.find(e => e.id === id);
        if (event) {
            const shareData: any = {
                title: event.title,
                text: `¡Mira este evento! ${event.title} - ${new Date(event.startDate).toLocaleDateString()}`,
                url: `${window.location.origin}/events/${id}`,
            };
            if (navigator.share) {
                navigator.share(shareData).catch(console.error);
            }
            else {
                toast({
                    title: "Compartir evento",
                    description: "Copia el enlace para compartir",
                });
            }
        }
    };
    if (!user) {
        return (_jsxs("div", { className: "container mx-auto px-4 py-8 text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDD12" }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Inicio de sesi\u00F3n requerido" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Debes iniciar sesi\u00F3n para ver tus favoritos" }), _jsx(Link, { href: "/", children: _jsx(Button, { children: "Ir al inicio" }) })] }));
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-6", children: [_jsxs("header", { className: "mb-6", children: [_jsx("h1", { className: "font-bold text-2xl", children: "Mis Favoritos" }), _jsx("p", { className: "text-muted-foreground", children: "Guarda artistas y eventos para acceder r\u00E1pidamente" })] }), _jsxs(Tabs, { defaultValue: "artists", children: [_jsxs(TabsList, { className: "w-full mb-6", children: [_jsxs(TabsTrigger, { value: "artists", className: "flex-1", children: [_jsx(UserCheck, { className: "h-4 w-4 mr-2" }), "Artistas"] }), _jsxs(TabsTrigger, { value: "events", className: "flex-1", children: [_jsx(Calendar, { className: "h-4 w-4 mr-2" }), "Eventos"] })] }), _jsx(TabsContent, { value: "artists", children: _jsx(FavoriteArtistsTab, { artists: favoriteArtists ?? [], isLoading: isLoadingArtists, onRemove: (id) => handleRemoveFavorite(id, 'artist') }) }), _jsx(TabsContent, { value: "events", children: _jsx(FavoriteEventsTab, { events: favoriteEvents ?? [], isLoading: isLoadingEvents, onRemove: (id) => handleRemoveFavorite(id, 'event'), onShare: handleShareEvent }) })] })] }));
}
