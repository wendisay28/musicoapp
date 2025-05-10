import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
export function EventHeader (props: any){ event, className }) {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx("h1", { className: "text-3xl font-bold", children: event.title }), _jsx("p", { className: "text-muted-foreground", children: event.description }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: new Date(event.date).toLocaleDateString() }), _jsx("span", { className: "text-sm text-muted-foreground", children: event.location.address })] })] }));
}
