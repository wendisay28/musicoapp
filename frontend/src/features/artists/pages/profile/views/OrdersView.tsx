import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/ui/components/tabs';
import { OrdersReceived } from '@/features/shared/components/Orders/OrdersReceived';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { OrderStatus } from '@/features/shared/types/artist';
import { useToast } from '@/features/shared/hooks/use-toast';
import { useErrorHandler } from '@/features/shared/hooks/useErrorHandler';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/features/ui/components/pagination';
// Tamaño de página para paginación
const PAGE_SIZE = 10;
// Función para crear una entrada de caché
const createCacheEntry: React.FC = (data, expiresIn = 5 * 60 * 1000) => ({
    data,
    timestamp: Date.now(),
    expiresIn
});
// Función para verificar si una entrada de caché es válida
const isCacheValid: React.FC = (entry) => {
    if (!entry)
        return false;
    return Date.now() - entry.timestamp < entry.expiresIn;
};
export function OrdersView (props: any){ hasArtistProfile, isLoadingProfile, profileError, }) {
    const [ordersReceived, setOrdersReceived] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ordersCache, setOrdersCache] = useState(null);
    const { toast } = useToast();
    const { handleError } = useErrorHandler();
    // Memoizar los datos de ejemplo
    const mockOrders = useMemo(() => [
        {
            id: '1',
            userId: 'user1',
            artistId: 'artist1',
            serviceId: 'service1',
            status: OrderStatus.PENDING,
            price: 50,
            date: new Date().toISOString(),
            location: {
                city: 'Ciudad',
                state: 'Estado',
                country: 'País'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '2',
            userId: 'user2',
            artistId: 'artist1',
            serviceId: 'service2',
            status: OrderStatus.PENDING,
            price: 120,
            date: new Date().toISOString(),
            location: {
                city: 'Ciudad',
                state: 'Estado',
                country: 'País'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ], []);
    // Cargar datos de forma asíncrona con paginación
    const loadOrders = useCallback(async (page) => {
        try {
            setIsLoadingOrders(true);
            // Verificar caché
            if (isCacheValid(ordersCache)) {
                const startIndex: React.FC = (page - 1) * PAGE_SIZE;
                const endIndex = startIndex + PAGE_SIZE;
                const paginatedData = ordersCache.data.slice(startIndex, endIndex);
                setOrdersReceived(paginatedData);
                setTotalPages(Math.ceil(ordersCache.data.length / PAGE_SIZE));
                setIsLoadingOrders(false);
                return;
            }
            // Simular carga de datos
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Actualizar caché
            const newCache = createCacheEntry(mockOrders);
            setOrdersCache(newCache);
            // Paginar datos
            const startIndex: React.FC = (page - 1) * PAGE_SIZE;
            const endIndex = startIndex + PAGE_SIZE;
            const paginatedData = mockOrders.slice(startIndex, endIndex);
            setOrdersReceived(paginatedData);
            setTotalPages(Math.ceil(mockOrders.length / PAGE_SIZE));
        }
        catch (error) {
            handleError(error);
        }
        finally {
            setIsLoadingOrders(false);
        }
    }, [mockOrders, handleError, ordersCache]);
    // Cargar datos iniciales
    useEffect(() => {
        loadOrders(currentPage);
    }, [currentPage, loadOrders]);
    // Memoizar las funciones de manejo de pedidos
    const acceptOrder = useCallback(async (orderId) => {
        try {
            setOrdersReceived(prev => prev.map(order => order.id === orderId ? { ...order, status: OrderStatus.CONFIRMED } : order));
            // Actualizar caché
            if (ordersCache) {
                const updatedCache = createCacheEntry(ordersCache.data.map(order => order.id === orderId ? { ...order, status: OrderStatus.CONFIRMED } : order));
                setOrdersCache(updatedCache);
            }
            toast({
                title: 'Pedido aceptado',
                description: 'El pedido ha sido aceptado correctamente'
            });
        }
        catch (error) {
            handleError(error);
        }
    }, [toast, handleError, ordersCache]);
    const rejectOrder = useCallback(async (orderId) => {
        try {
            setOrdersReceived(prev => prev.map(order => order.id === orderId ? { ...order, status: OrderStatus.CANCELLED } : order));
            // Actualizar caché
            if (ordersCache) {
                const updatedCache = createCacheEntry(ordersCache.data.map(order => order.id === orderId ? { ...order, status: OrderStatus.CANCELLED } : order));
                setOrdersCache(updatedCache);
            }
            toast({
                title: 'Pedido rechazado',
                description: 'El pedido ha sido rechazado correctamente'
            });
        }
        catch (error) {
            handleError(error);
        }
    }, [toast, handleError, ordersCache]);
    // Memoizar las props del componente OrdersReceived
    const ordersReceivedProps = useMemo(() => ({
        className: "pt-4",
        ordersReceived,
        isLoading: isLoadingOrders,
        hasArtistProfile,
        isLoadingProfile,
        profileError,
        acceptOrder,
        rejectOrder
    }), [
        ordersReceived,
        isLoadingOrders,
        hasArtistProfile,
        isLoadingProfile,
        profileError,
        acceptOrder,
        rejectOrder
    ]);
    // Generar números de página
    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }, [totalPages]);
    return (_jsxs(Tabs, { defaultValue: "received", className: "w-full", children: [_jsx(TabsList, { children: _jsx(TabsTrigger, { value: "received", children: "Solicitudes" }) }), _jsxs(TabsContent, { value: "received", children: [_jsx(OrdersReceived, { ...ordersReceivedProps }), _jsx("div", { className: "mt-4 flex justify-center", children: _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { onClick: () => setCurrentPage(prev => Math.max(1, prev - 1)), className: currentPage === 1 ? 'pointer-events-none opacity-50' : '' }) }), pageNumbers.map((page) => (_jsx(PaginationItem, { children: _jsx(PaginationLink, { onClick: () => setCurrentPage(page), isActive: currentPage === page, children: page }) }, page))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { onClick: () => setCurrentPage(prev => Math.min(totalPages, prev + 1)), className: currentPage === totalPages ? 'pointer-events-none opacity-50' : '' }) })] }) }) })] })] }));
}
