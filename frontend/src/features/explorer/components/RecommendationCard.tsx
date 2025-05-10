import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/features/ui/components/card';
import { Button } from '@/features/ui/components/button';
import { MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
export function RecommendationCard (props: any){ title, description, location, rating, imageUrl, onSelect, className }) {
    return (_jsxs(Card, { className: cn('w-full', className), children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: title }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-4 w-4 text-yellow-400" }), _jsx("span", { children: rating })] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: description }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(MapPin, { className: "h-4 w-4" }), _jsx("span", { children: location })] }), onSelect && (_jsx(Button, { onClick: onSelect, className: "w-full", children: "Seleccionar" }))] }) })] }));
}
