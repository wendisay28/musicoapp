import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
export function EventsList (props: any)) {
    const { data: events, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const response = await apiRequest('GET', '/api/events');
            return response.data;
        }
    });
    if (isLoading) {
        return _jsx("div", { children: "Cargando eventos..." });
    }
    return (_jsx("div", { className: "space-y-4", children: events?.length === 0 ? (_jsx(Card, { children: _jsx(CardContent, { className: "py-6 text-center text-muted-foreground", children: "No hay eventos disponibles" }) })) : (events?.map((event) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: event.title }) }), _jsxs(CardContent, { children: [_jsx("p", { children: event.description }), _jsxs("div", { className: "mt-2 text-sm text-muted-foreground", children: [_jsxs("p", { children: ["Fecha: ", new Date(event.startDate).toLocaleDateString()] }), _jsxs("p", { children: ["Ubicaci\u00F3n: ", event.location] })] })] })] }, event.id)))) }));
}
