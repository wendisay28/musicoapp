import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@/features/shared/components/ui/skeleton';
import { Card, CardContent } from '@/features/shared/components/ui/card';
import { Download, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderCard } from './OrderCard';
import { Button } from '@/features/shared/components/ui/button';
import { Link } from 'wouter';
export function OrdersMade (props: any){ className, orders, isLoading }) {
    if (isLoading) {
        return (_jsx("div", { className: cn("space-y-4", className), children: Array.from({ length: 3 }).map((_, i) => (_jsx(Skeleton, { className: "h-32 w-full rounded-lg" }, `skeleton-made-${i}`))) }));
    }
    if (orders.length === 0) {
        return (_jsx("div", { className: cn("space-y-4", className), children: _jsx(Card, { children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx("div", { className: "mx-auto w-max text-muted-foreground mb-4", children: _jsx(Download, { className: "h-12 w-12" }) }), _jsx("h3", { className: "font-semibold text-xl mb-2", children: "No hay pedidos realizados" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Cuando realices pedidos a artistas, aparecer\u00E1n aqu\u00ED" }), _jsx(Button, { asChild: true, children: _jsxs(Link, { href: "/explore", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Explorar artistas"] }) })] }) }) }));
    }
    return (_jsx("div", { className: cn("space-y-4", className), children: orders.map((order) => {
            const firstItem = order.items[0];
            return (_jsx(OrderCard, { order: {
                    id: order.id,
                    userId: order.artistId ?? '',
                    productId: order.productId ?? firstItem?.artworkId ?? '',
                    quantity: firstItem?.quantity ?? 1,
                    status: order.status,
                    createdAt: order.createdAt,
                    title: firstItem?.title ?? 'Sin título',
                    categoryName: order.categoryName ?? 'Personalizada',
                    price: firstItem?.price ?? 0,
                    userName: order.artistName ?? 'Artista',
                }, variant: "made", isProcessing: ['pending', 'accepted'].includes(order.status) }, order.id));
        }) }));
}
