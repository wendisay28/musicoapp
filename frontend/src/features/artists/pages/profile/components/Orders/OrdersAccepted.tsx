import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { OrderCard } from './OrderCard';
import { Skeleton } from '@/features/shared/components/ui/skeleton';
import { Card, CardContent } from '@/features/shared/components/ui/card';
import { CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/features/shared/components/ui/button';
import { cn } from '@/lib/utils';
export const OrdersAccepted: React.FC = ({ orders, isLoading, className, onRefresh, isRefreshing = false, }) => {
    if (isLoading) {
        return (_jsx("div", { className: cn("space-y-4", className), children: Array.from({ length: 3 }).map((_, i) => (_jsx(Skeleton, { className: "h-28 w-full rounded-lg" }, `skeleton-accepted-${i}`))) }));
    }
    if (orders.length === 0) {
        return (_jsx(Card, { className: className, children: _jsxs(CardContent, { className: "py-8 text-center", children: [_jsx(CheckCircle, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }), _jsx("h3", { className: "font-semibold text-xl mb-2", children: "No hay \u00F3rdenes aceptadas" }), _jsx("p", { className: "text-muted-foreground", children: "Las \u00F3rdenes que aceptes aparecer\u00E1n aqu\u00ED" }), onRefresh && (_jsxs(Button, { variant: "outline", className: "mt-4", onClick: onRefresh, disabled: isRefreshing, children: [isRefreshing ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" })) : (_jsx(RefreshCw, { className: "h-4 w-4 mr-2" })), "Recargar"] }))] }) }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-xl font-semibold", children: "\u00D3rdenes Aceptadas" }), onRefresh && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onRefresh, disabled: isRefreshing, children: [isRefreshing ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" })) : (_jsx(RefreshCw, { className: "h-4 w-4 mr-2" })), "Recargar"] }))] }), _jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: orders.map((order) => {
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
                        }, variant: "received", isProcessing: false }, order.id));
                }) })] }));
};
