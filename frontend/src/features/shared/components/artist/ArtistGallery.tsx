import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCachedQuery } from '@/features/shared/hooks/useCachedQuery';
import { errorMonitoring } from '@/lib/error-monitoring';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { cn } from '@/lib/utils';
/**
 * Galería de trabajos del artista
 * Soporta diferentes variantes de visualización incluyendo vista previa
 *
 * @example
 * ```tsx
 * // Vista completa
 * <ArtistGallery
 *   artist={artist}
 *   variant="grid"
 *   columns={3}
 * />
 *
 * // Vista previa
 * <ArtistGallery
 *   artist={artist}
 *   variant="preview"
 *   maxPreview={3}
 * />
 * ```
 */
export function ArtistGallery (props: any){ artist, variant = 'grid', columns = 3, maxPreview = 3, emptyMessage = "No hay trabajos para mostrar", className }) {
    const { data: portfolio = [], isLoading, error } = useCachedQuery(['artist-portfolio', artist.id], async () => {
        try {
            const response = await fetch(`/api/artists/${artist.id}/portfolio`);
            if (!response.ok) {
                throw new Error('Error al cargar el portafolio');
            }
            return response.json();
        }
        catch (error) {
            errorMonitoring.logError({
                message: 'Error al cargar el portafolio del artista',
                code: 'PORTFOLIO_LOAD_ERROR',
                context: { artistId: artist.id },
            });
            throw error;
        }
    }, {
        cacheKey: `artist-portfolio-${artist.id}`,
        cacheTime: 30 * 60 * 1000, // 30 minutos
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
    if (isLoading) {
        return (_jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 w-32 bg-gray-200 rounded mb-4" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [...Array(6)].map((_, i) => (_jsx("div", { className: "aspect-square bg-gray-200 rounded-lg" }, i))) })] }));
    }
    if (error) {
        return (_jsxs("div", { className: "text-center py-8", children: [_jsx("p", { className: "text-red-600", children: "Error al cargar el portafolio" }), _jsx("button", { onClick: () => window.location.reload(), className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Reintentar" })] }));
    }
    // Si no hay trabajos, mostrar mensaje
    if (!portfolio.length) {
        return (_jsx("div", { className: cn('text-center py-8', className), children: _jsx("p", { className: "text-muted-foreground", children: emptyMessage }) }));
    }
    // Vista previa
    if (variant === 'preview') {
        const previewItems = portfolio.slice(0, maxPreview);
        const remainingCount = portfolio.length - maxPreview;
        return (_jsxs(Card, { className: cn('w-full', className), children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [_jsx(CardTitle, { children: "Galer\u00EDa" }), _jsx(Button, { variant: "ghost", size: "sm", className: "flex items-center", "aria-label": "Ver toda la galer\u00EDa", onClick: () => window.location.href = `/artist/${artist.id}/gallery`, children: _jsxs("span", { className: "flex items-center", children: [_jsxs("svg", { className: "h-4 w-4 mr-2", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })] }), "Ver todo"] }) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-3 gap-2", children: [previewItems.map((item) => (_jsx("div", { className: "relative aspect-square rounded-md overflow-hidden", children: _jsx("img", { src: item.url, alt: item.alt || 'Trabajo del artista', className: "w-full h-full object-cover", loading: "lazy", decoding: "async" }) }, item.id))), remainingCount > 0 && (_jsx("div", { className: "relative aspect-square rounded-md overflow-hidden bg-muted flex items-center justify-center", children: _jsxs("span", { className: "text-sm font-medium", children: ["+", remainingCount] }) }))] }) })] }));
    }
    // Vista de cuadrícula
    if (variant === 'grid') {
        return (_jsx("div", { className: cn(`grid gap-4 grid-cols-1 md:grid-cols-${columns}`, className), children: portfolio.map((item) => (_jsx(Card, { className: "overflow-hidden", children: _jsxs(CardContent, { className: "p-0", children: [_jsx("img", { src: item.url, alt: item.alt || 'Trabajo del artista', className: "w-full h-48 object-cover" }), item.description && (_jsx("div", { className: "p-4", children: _jsx("p", { className: "text-sm text-muted-foreground", children: item.description }) }))] }) }, item.id))) }));
    }
    // Vista de lista
    if (variant === 'list') {
        return (_jsx("div", { className: cn('space-y-4', className), children: portfolio.map((item) => (_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex gap-4", children: [_jsx("img", { src: item.url, alt: item.alt || 'Trabajo del artista', className: "w-24 h-24 object-cover rounded" }), _jsx("div", { children: item.description && (_jsx("p", { className: "text-sm text-muted-foreground", children: item.description })) })] }) }) }, item.id))) }));
    }
    // Vista de carrusel
    return (_jsx("div", { className: cn('relative', className), children: _jsx("div", { className: "overflow-x-auto", children: _jsx("div", { className: "flex gap-4 pb-4", children: portfolio.map((item) => (_jsx(Card, { className: "flex-shrink-0 w-64", children: _jsxs(CardContent, { className: "p-0", children: [_jsx("img", { src: item.url, alt: item.alt || 'Trabajo del artista', className: "w-full h-48 object-cover" }), item.description && (_jsx("div", { className: "p-4", children: _jsx("p", { className: "text-sm text-muted-foreground", children: item.description }) }))] }) }, item.id))) }) }) }));
}
