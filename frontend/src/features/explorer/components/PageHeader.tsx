import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/features/ui/components/button';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
export function PageHeader (props: any){ title, subtitle, onLocationChange, className }) {
    return (_jsxs("div", { className: cn('flex flex-col gap-2', className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold", children: title }), onLocationChange && (_jsxs(Button, { variant: "outline", onClick: onLocationChange, children: [_jsx(MapPin, { className: "h-4 w-4 mr-2" }), "Cambiar Ubicaci\u00F3n"] }))] }), subtitle && _jsx("p", { className: "text-muted-foreground", children: subtitle })] }));
}
