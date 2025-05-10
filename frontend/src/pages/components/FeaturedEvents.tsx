import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from '@/features/shared/components/ui/card';
import { cn } from '@/lib/utils';
export function FeaturedEvents (props: any){ events, className }) {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx("h2", { className: "text-2xl font-bold", children: "Eventos Destacados" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: events.map((event) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsxs(CardHeader, { className: "p-4", children: [_jsx("h3", { className: "font-medium", children: event.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: event.description })] }), _jsx(CardContent, { className: "p-4 pt-0", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: new Date(event.date).toLocaleDateString() }), _jsx("span", { className: "text-sm font-medium", children: event.location })] }) })] }, event.id))) })] }));
}
