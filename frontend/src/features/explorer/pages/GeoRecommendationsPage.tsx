import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardHeader, CardContent } from '@/features/ui/components/card';
import { SearchInput } from '@/features/shared/components/SearchInput';
import { PlaceCard } from '@/features/shared/components/PlaceCard';
export default function GeoRecommendationsPage (props: any)) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [places, setPlaces] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        // TODO: Implementar la lógica de carga de lugares
        setLoading(false);
    }, []);
    if (loading) {
        return _jsx("div", { children: "Cargando..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "container mx-auto py-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Explorar" }), _jsx(SearchInput, { value: searchQuery, onChange: setSearchQuery, placeholder: "Buscar lugares y eventos...", showClearButton: true, onClear: () => setSearchQuery('') })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx("h2", { className: "text-xl font-semibold", children: "Lugares cercanos" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: places.map((place) => (_jsx(PlaceCard, { id: place.id, name: place.name, description: place.description, imageUrl: place.imageUrl, rating: place.rating, distance: place.distance }, place.id))) }) })] })] }));
}
