import React from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/features/auth/hooks/useAuth';
export function ProductCard (props: any){ product, onAddToCart, onToggleFavorite, onViewArtist }) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const handleAddToCart = async () => {
        if (!user) {
            toast({
                title: 'Inicia sesión',
                description: 'Debes iniciar sesión para agregar productos al carrito',
                variant: 'destructive'
            });
            return;
        }
        setIsLoading(true);
        try {
            await onAddToCart?.(product.id);
            toast({
                title: 'Producto agregado',
                description: 'El producto ha sido agregado a tu carrito'
            });
        }
        catch (error) {
            console.error('Error adding to cart:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo agregar el producto al carrito'
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleToggleFavorite = async () => {
        if (!user) {
            toast({
                title: 'Inicia sesión',
                description: 'Debes iniciar sesión para guardar favoritos',
                variant: 'destructive'
            });
            return;
        }
        try {
            await onToggleFavorite?.(product.id);
        }
        catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };
    return (_jsxs(Card, { className: "group relative overflow-hidden", children: [_jsx(CardHeader, { className: "p-0", children: _jsxs("div", { className: "relative aspect-square", children: [_jsx("img", { src: product.imageUrl, alt: product.name, className: "object-cover w-full h-full transition-transform group-hover:scale-105" }), _jsx(Button, { variant: "ghost", size: "icon", className: cn("absolute top-2 right-2 bg-background/80 backdrop-blur-sm", product.isFavorite && "text-red-500"), onClick: handleToggleFavorite, children: _jsx(Heart, { className: cn("h-4 w-4", product.isFavorite && "fill-current") }) })] }) }), _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx(Badge, { variant: "secondary", children: product.category }), product.stock <= 5 && (_jsx(Badge, { variant: "destructive", children: "\u00A1\u00DAltimas unidades!" }))] }), _jsx("h3", { className: "font-semibold text-lg mb-1", children: product.name }), _jsx("p", { className: "text-sm text-muted-foreground mb-2 line-clamp-2", children: product.description }), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [_jsxs("p", { className: "text-lg font-bold", children: ["$", product.price.toLocaleString('es-ES')] }), _jsxs("button", { onClick: () => onViewArtist?.(product.artist.id), className: "text-sm text-muted-foreground hover:underline", children: ["Por ", product.artist.name] })] }) })] }), _jsx(CardFooter, { className: "p-4 pt-0", children: _jsx(Button, { className: "w-full", onClick: handleAddToCart, disabled: isLoading || product.stock === 0, children: isLoading ? ('Agregando...') : product.stock === 0 ? ('Sin stock') : (_jsxs(_Fragment, { children: [_jsx(ShoppingCart, { className: "h-4 w-4 mr-2" }), "Agregar al carrito"] })) }) })] }));
}
