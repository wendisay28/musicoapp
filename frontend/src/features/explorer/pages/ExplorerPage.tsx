import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
export default function ExplorerPage (props: any)) {
    const { data: artists, isLoading } = useQuery({
        queryKey: ['artists'],
        queryFn: async () => {
            const response = await apiRequest('GET', '/api/artists');
            return response.data;
        }
    });
    if (isLoading) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Explorar Artistas" }), artists?.length === 0 ? (_jsx("p", { className: "text-muted-foreground", children: "No se encontraron artistas" })) : (_jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3" }))] }));
}
