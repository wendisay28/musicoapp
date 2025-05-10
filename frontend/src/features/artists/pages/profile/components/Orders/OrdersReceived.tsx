import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@/features/shared/components/ui/skeleton';
import { OrderCard } from './OrderCard';
import { Button } from '@/features/shared/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/features/shared/components/ui/card';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
function ErrorAlert (props: any){ title, description, className }) {
    return (_jsxs("div", { className: cn("bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", className), children: [_jsx("strong", { className: "font-bold", children: title }), _jsxs("span", { className: "block sm:inline", children: [" ", description] })] }));
}
export function OrdersReceived (props: any){ className, ordersReceived, isLoading, hasArtistProfile, isLoadingProfile, profileError, acceptOrder, rejectOrder, }) {
    const handleAccept = useCallback(async (orderId) => {
        try {
            await acceptOrder(orderId);
        }
        catch (err) {
            console.error("Error accepting order:", err);
        }
    }, [acceptOrder]);
    const handleReject = useCallback(async (orderId) => {
        try {
            await rejectOrder(orderId);
        }
        catch (err) {
            console.error("Error rejecting order:", err);
        }
    }, [rejectOrder]);
    if (isLoading || isLoadingProfile) {
        return (_jsx("div", { className: cn("space-y-4", className), children: Array.from({ length: 3 }).map((_, i) => (_jsx(Skeleton, { className: "h-32 w-full rounded-lg" }, `skeleton-received-${i}`))) }));
    }
    if (profileError) {
        const errorMessage = typeof profileError === 'object' && profileError !== null && 'message' in profileError
            ? profileError.message
            : 'Ocurrió un error inesperado al cargar tu perfil';
        return (_jsx(ErrorAlert, { title: "Error al cargar perfil", description: errorMessage, className: className }));
    }
    if (!hasArtistProfile) {
        return (_jsx("div", { className: cn("space-y-4", className), children: _jsx(Card, { children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx("div", { className: "mx-auto w-max text-muted-foreground mb-4", children: _jsx(Download, { className: "h-12 w-12" }) }), _jsx("h3", { className: "font-semibold text-xl mb-2", children: "Perfil de artista no encontrado" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Debes crear un perfil de artista para recibir solicitudes" }), _jsx(Button, { asChild: true, children: _jsxs(Link, { href: "/create-artist-profile", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Crear perfil"] }) })] }) }) }));
    }
    if (!ordersReceived || ordersReceived.length === 0) {
        return (_jsx("div", { className: cn("space-y-4", className), children: _jsx(Card, { children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx("div", { className: "mx-auto w-max text-muted-foreground mb-4", children: _jsx(Download, { className: "h-12 w-12" }) }), _jsx("h3", { className: "font-semibold text-xl mb-2", children: "No tienes solicitudes pendientes" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Cuando los usuarios te soliciten servicios, aparecer\u00E1n aqu\u00ED" })] }) }) }));
    }
    return (_jsx("div", { className: cn("space-y-4", className), children: ordersReceived.map((order) => {
            const firstItem = order.items[0];
            return (_jsx(OrderCard, { order: {
                    id: order.id,
                    userId: order.clientId,
                    productId: order.productId ?? firstItem?.artworkId ?? '',
                    quantity: firstItem?.quantity ?? 1,
                    status: order.status,
                    createdAt: order.createdAt,
                    title: firstItem?.title ?? 'Sin título',
                    categoryName: order.categoryName ?? 'Personalizada',
                    price: firstItem?.price ?? 0,
                    userName: order.userName ?? 'Cliente',
                }, variant: "received", onAccept: handleAccept, onReject: handleReject, isProcessing: false }, order.id));
        }) }));
}
