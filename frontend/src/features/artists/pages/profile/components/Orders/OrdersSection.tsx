import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent } from '@/features/shared/components/ui/tabs';
import { OrdersTabs } from './OrdersTabs';
import { OrdersMade } from './OrdersMade';
import { OrdersReceived } from './OrdersReceived';
import { OrdersAccepted } from './OrdersAccepted';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/features/shared/types/artist';
export function OrdersSection (props: any){ defaultTab = 'made', className }) {
    const mockOrders = [
        {
            id: '1',
            userId: 'user123',
            artistId: 'artist456',
            serviceId: 'service1',
            status: OrderStatus.PENDING,
            price: 120,
            date: new Date().toISOString(),
            location: {
                city: 'Ciudad',
                state: 'Estado',
                country: 'País'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userName: 'María González',
            artistName: 'Carlos Pintor',
            categoryName: 'Pintura Abstracta',
            productId: 'art001'
        },
        {
            id: '2',
            userId: 'user456',
            artistId: 'artist789',
            serviceId: 'service2',
            status: OrderStatus.CONFIRMED,
            price: 250,
            date: new Date(Date.now() - 86400000).toISOString(),
            location: {
                city: 'Ciudad',
                state: 'Estado',
                country: 'País'
            },
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date().toISOString(),
            userName: 'Juan Pérez',
            artistName: 'Ana Escultora',
            categoryName: 'Escultura',
            productId: 'art002'
        }
    ];
    return (_jsx(Tabs, { defaultValue: defaultTab, className: cn("w-full", className), children: _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsx("div", { className: "md:w-48", children: _jsx(OrdersTabs, { className: "md:flex-col md:w-full" }) }), _jsx("div", { className: "flex-1 mt-0 md:mt-6", children: _jsxs(Suspense, { fallback: _jsx(OrdersSkeleton, {}), children: [_jsx(TabsContent, { value: "made", className: "m-0", children: _jsx(OrdersMade, { orders: mockOrders, isLoading: false }) }), _jsx(TabsContent, { value: "received", className: "m-0", children: _jsx(OrdersReceived, { ordersReceived: mockOrders, isLoading: false, hasArtistProfile: true, isLoadingProfile: false, profileError: null, acceptOrder: async () => { }, rejectOrder: async () => { } }) }), _jsx(TabsContent, { value: "accepted", className: "m-0", children: _jsx(OrdersAccepted, { orders: mockOrders, isLoading: false }) })] }) })] }) }));
}
function OrdersSkeleton (props: any)) {
    return (_jsx("div", { className: "space-y-4", children: Array.from({ length: 3 }).map((_, i) => (_jsx("div", { className: "h-24 w-full rounded-lg bg-muted animate-pulse" }, `order-skeleton-${i}`))) }));
}
