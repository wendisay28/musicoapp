import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation as useWouterLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "../../../context/location-context";
import { useToast } from '@/features/shared/components/use-toast';
import { Card, CardContent } from '@/features/shared/components/card';
import { Button } from '@/features/shared/components/button';
import { Input } from '@/features/shared/components/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/shared/components/tabs';
import { Skeleton } from '@/features/shared/components/skeleton';
import { BaseCard } from "@/features/shared/components/base/BaseCard";
import { ArrowLeft } from "lucide-react";
import { useDebounce } from "../../../features/shared/hooks/ui/useDebounce";
import SearchFilters from '@/features/shared/components/SearchFilters';
export default function SearchPage (props: any)) {
    const [searchParams] = useWouterLocation();
    const params = new URLSearchParams(searchParams);
    const initialType = params.get("type") === "events" ? "events" : "artists";
    const [activeTab, setActiveTab] = useState(initialType);
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedFilters, setAppliedFilters] = useState({});
    const { locationData } = useLocation();
    const { toast } = useToast();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: artists, isLoading: isLoadingArtists } = useQuery({
        queryKey: [
            '/api/search/artists',
            debouncedSearchTerm,
            locationData?.coordinates?.latitude,
            locationData?.coordinates?.longitude,
            appliedFilters
        ],
        enabled: activeTab === "artists",
        throwOnError: false,
    });
    const { data: events, isLoading: isLoadingEvents } = useQuery({
        queryKey: [
            '/api/search/events',
            debouncedSearchTerm,
            locationData?.coordinates?.latitude,
            locationData?.coordinates?.longitude,
            appliedFilters
        ],
        enabled: activeTab === "events",
        throwOnError: false,
    });
    const handleApplyFilters: React.FC = (filters) => {
        setAppliedFilters(filters);
        toast({
            title: "Filtros aplicados",
            description: "Los resultados han sido actualizados según tus filtros",
        });
    };
    const handleSaveEvent: React.FC = (id) => {
        toast({
            title: "Evento guardado",
            description: `El evento con ID ${id} ha sido añadido a tus favoritos`,
        });
    };
    const handleShareEvent: React.FC = (id) => {
        toast({
            title: "Compartir evento",
            description: `Compartiendo el evento con ID ${id}. Funcionalidad en desarrollo.`,
        });
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx(Button, { variant: "ghost", size: "icon", children: _jsx(ArrowLeft, { className: "h-6 w-6" }) }), _jsx("div", { className: "flex-1", children: _jsx(Input, { placeholder: "Buscar artistas o eventos...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full" }) }), _jsx(SearchFilters, { onApplyFilters: handleApplyFilters })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "artists", children: "Artistas" }), _jsx(TabsTrigger, { value: "events", children: "Eventos" })] }), _jsx(TabsContent, { value: "artists", children: isLoadingArtists ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsx(Skeleton, { className: "h-48 w-full mb-4" }), _jsx(Skeleton, { className: "h-4 w-3/4 mb-2" }), _jsx(Skeleton, { className: "h-4 w-1/2" })] }) }, i))) })) : artists && artists.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: artists.map((artist) => (_jsx(BaseCard, { id: artist.id, name: artist.name, role: artist.role, price: artist.price, priceUnit: artist.priceUnit, imageUrl: artist.imageUrl, variant: "artist" }, artist.id))) })) : (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500", children: "No se encontraron artistas" }) })) }), _jsx(TabsContent, { value: "events", children: isLoadingEvents ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4", children: [_jsx(Skeleton, { className: "h-48 w-full mb-4" }), _jsx(Skeleton, { className: "h-4 w-3/4 mb-2" }), _jsx(Skeleton, { className: "h-4 w-1/2" })] }) }, i))) })) : events && events.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: events.map((event) => (_jsx(BaseCard, { id: event.id, name: event.name, price: event.price, priceUnit: event.priceUnit, imageUrl: event.imageUrl, variant: "event" }, event.id))) })) : (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-gray-500", children: "No se encontraron eventos" }) })) })] })] }));
}
