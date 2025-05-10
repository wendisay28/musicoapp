import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/api';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
export function ShopPage (props: any)) {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        minPrice: 0,
        maxPrice: 1000000,
        sortBy: 'newest'
    });
    const [showFilters, setShowFilters] = useState(false);
    const { data: products, isLoading } = useQuery({
        queryKey: ['/api/products', search, filters],
        queryFn: async () => {
            const response = await apiRequest({
                method: 'GET',
                url: '/api/products',
                params: {
                    search,
                    ...filters
                }
            });
            return response.json();
        }
    });
    const handleAddToCart = async (productId) => {
        try {
            await apiRequest({
                method: 'POST',
                url: '/api/cart',
                data: { productId }
            });
        }
        catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };
    const handleToggleFavorite = async (productId) => {
        try {
            await apiRequest({
                method: 'POST',
                url: `/api/products/${productId}/favorite`
            });
        }
        catch (error) {
            console.error('Error toggling favorite:', error);
            throw error;
        }
    };
    const handleViewArtist: React.FC = (artistId) => {
        navigate(`/artists/${artistId}`);
    };
    const handleClearFilters: React.FC = () => {
        setFilters({
            category: '',
            minPrice: 0,
            maxPrice: 1000000,
            sortBy: 'newest'
        });
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-6", children: [_jsxs("header", { className: "mb-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Tienda" }), _jsx("p", { className: "text-muted-foreground", children: "Descubre obras \u00FAnicas de artistas independientes" })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Buscar productos...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9" })] }), _jsxs(Button, { variant: "outline", onClick: () => setShowFilters(!showFilters), className: "md:hidden", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filtros"] })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsxs("aside", { className: cn("w-full md:w-64 space-y-4", showFilters ? "block" : "hidden md:block"), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "font-semibold", children: "Filtros" }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: handleClearFilters, className: "text-muted-foreground", children: [_jsx(X, { className: "h-4 w-4 mr-2" }), "Limpiar"] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Categor\u00EDa" }), _jsxs(Select, { value: filters.category, onValueChange: (value) => setFilters((prev) => ({ ...prev, category: value })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Todas las categor\u00EDas" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "", children: "Todas las categor\u00EDas" }), _jsx(SelectItem, { value: "pintura", children: "Pintura" }), _jsx(SelectItem, { value: "escultura", children: "Escultura" }), _jsx(SelectItem, { value: "fotografia", children: "Fotograf\u00EDa" }), _jsx(SelectItem, { value: "digital", children: "Arte Digital" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Rango de precio" }), _jsx(Slider, { min: 0, max: 1000000, step: 10000, value: [filters.minPrice, filters.maxPrice], onValueChange: ([min, max]) => setFilters((prev) => ({
                                                    ...prev,
                                                    minPrice: min,
                                                    maxPrice: max
                                                })), className: "mb-2" }), _jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [_jsxs("span", { children: ["$", filters.minPrice.toLocaleString('es-ES')] }), _jsxs("span", { children: ["$", filters.maxPrice.toLocaleString('es-ES')] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium mb-2 block", children: "Ordenar por" }), _jsxs(Select, { value: filters.sortBy, onValueChange: (value) => setFilters((prev) => ({ ...prev, sortBy: value })), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Ordenar por" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "newest", children: "M\u00E1s recientes" }), _jsx(SelectItem, { value: "price_asc", children: "Menor precio" }), _jsx(SelectItem, { value: "price_desc", children: "Mayor precio" }), _jsx(SelectItem, { value: "popular", children: "M\u00E1s populares" })] })] })] })] })] }), _jsx("main", { className: "flex-1", children: isLoading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }).map((_, i) => (_jsx("div", { className: "aspect-square rounded-lg bg-muted animate-pulse" }, i))) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: products?.map((product) => (_jsx(ProductCard, { product: product, onAddToCart: handleAddToCart, onToggleFavorite: handleToggleFavorite, onViewArtist: handleViewArtist }, product.id))) })) })] })] }));
}
