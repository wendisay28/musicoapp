import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/features/ui/components/input';
import { Label } from '@/features/ui/components/label';
import { cn } from '@/lib/utils';
export function LocationSection (props: any){ location, onLocationChange, className }) {
    return (_jsx("div", { className: cn('space-y-4', className), children: _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "location", children: "Ubicaci\u00F3n" }), _jsx(Input, { id: "location", value: location, onChange: (e) => onLocationChange(e.target.value), placeholder: "Ingresa la ubicaci\u00F3n del evento" })] }) }));
}
