import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useServices } from '../../hooks/useServices';
import { useEvents } from '../../hooks/useEvents';
import { useOffers } from '../../hooks/useOffers';
import { useUsers } from '../../hooks/useUsers';
import { SwipeCard } from './SwipeCard';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { LocationPicker } from './LocationPicker';
import { useGeolocation } from '../../hooks/useGeolocation';
export const Explorer: React.FC = () => {
    const [contentType, setContentType] = useState('artists');
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        priceRange: { min: 0, max: 1000 },
        sortBy: 'distance',
        sortOrder: 'asc',
        radius: 10, // Radio en kilómetros
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const { location, loading: locationLoading } = useGeolocation();
    const { services, loading: servicesLoading, error: servicesError, fetchServices } = useServices();
    const { events, loading: eventsLoading, error: eventsError, fetchEvents } = useEvents();
    const { offers, loading: offersLoading, error: offersError, fetchOffers } = useOffers();
    const { users, loading: usersLoading, error: usersError, fetchUsers } = useUsers();
    useEffect(() => {
        if (location) {
            fetchContent();
        }
    }, [location, contentType, filters]);
    const handleSearch: React.FC = (query) => {
        setSearchQuery(query);
        setCurrentIndex(0);
        fetchContent();
    };
    const handleFilterChange: React.FC = (newFilters) => {
        setFilters(newFilters);
        setCurrentIndex(0);
        fetchContent();
    };
    const handleSwipe: React.FC = (direction) => {
        // Aquí implementaremos la lógica de swipe
        if (direction === 'right') {
            // Guardar en favoritos o matches
        }
        setCurrentIndex(prev => prev + 1);
    };
    const handleViewDetails: React.FC = () => {
        setShowDetails(true);
    };
    const fetchContent: React.FC = () => {
        if (!location)
            return;
        const params: any = {
            search: searchQuery,
            ...filters,
            latitude: location.latitude,
            longitude: location.longitude,
        };
        switch (contentType) {
            case 'artists':
                fetchUsers({ ...params, type: 'artist' });
                break;
            case 'events':
                fetchEvents(params);
                break;
            case 'places':
                fetchUsers({ ...params, type: 'business' });
                break;
            case 'recommendations':
                // Implementar lógica de recomendaciones basada en preferencias del usuario
                break;
        }
    };
    const renderContent: React.FC = () => {
        if (locationLoading || servicesLoading || eventsLoading || offersLoading || usersLoading) {
            return _jsx("div", { className: "flex justify-center items-center h-64", children: "Cargando..." });
        }
        if (servicesError || eventsError || offersError || usersError) {
            return (_jsx("div", { className: "text-red-500 text-center p-4", children: servicesError || eventsError || offersError || usersError }));
        }
        const currentItem = getCurrentItem();
        if (!currentItem) {
            return _jsx("div", { className: "text-center p-4", children: "No hay m\u00E1s contenido para mostrar" });
        }
        return (_jsx("div", { className: "relative h-[600px]", children: _jsx(SwipeCard, { item: currentItem, onSwipe: handleSwipe, onViewDetails: handleViewDetails, showDetails: showDetails }) }));
    };
    const getCurrentItem: React.FC = () => {
        switch (contentType) {
            case 'artists':
                return users[currentIndex];
            case 'events':
                return events[currentIndex];
            case 'places':
                return users[currentIndex];
            case 'recommendations':
                return null; // Implementar lógica de recomendaciones
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs("div", { className: "flex flex-col space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Buscart" }), _jsxs("div", { className: "flex space-x-4", children: [_jsx("button", { className: `px-4 py-2 rounded-lg ${contentType === 'artists'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'}`, onClick: () => setContentType('artists'), children: "Artistas" }), _jsx("button", { className: `px-4 py-2 rounded-lg ${contentType === 'events'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'}`, onClick: () => setContentType('events'), children: "Eventos" }), _jsx("button", { className: `px-4 py-2 rounded-lg ${contentType === 'places'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'}`, onClick: () => setContentType('places'), children: "Lugares" }), _jsx("button", { className: `px-4 py-2 rounded-lg ${contentType === 'recommendations'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'}`, onClick: () => setContentType('recommendations'), children: "Recomendaciones" })] })] }), _jsx(LocationPicker, {}), _jsx(SearchBar, { onSearch: handleSearch }), _jsx(FilterBar, { filters: filters, onFilterChange: handleFilterChange }), renderContent()] }) }));
};
