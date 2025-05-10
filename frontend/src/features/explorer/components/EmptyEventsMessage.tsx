import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
export function EmptyEventsMessage (props: any){ className }) {
    return (_jsxs("div", { className: cn('flex flex-col items-center justify-center p-8 text-center', className), children: [_jsx(AlertCircle, { className: "h-12 w-12 text-muted-foreground mb-4" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "No hay eventos cercanos" }), _jsx("p", { className: "text-muted-foreground", children: "No encontramos eventos en tu ubicaci\u00F3n actual. Intenta buscar en otra \u00E1rea o m\u00E1s tarde." })] }));
}
