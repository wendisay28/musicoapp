import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFormContext } from 'react-hook-form';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/features/shared/components/ui/select';
export function PricingForm (props: any)) {
    const { register, setValue, watch } = useFormContext();
    const priceUnit = watch('priceUnit');
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "minPrice", children: "Precio M\u00EDnimo" }), _jsx(Input, { id: "minPrice", type: "number", placeholder: "Ej: 50000", ...register('minPrice') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "maxPrice", children: "Precio M\u00E1ximo" }), _jsx(Input, { id: "maxPrice", type: "number", placeholder: "Ej: 200000", ...register('maxPrice') })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "priceUnit", children: "Unidad de Precio" }), _jsxs(Select, { value: priceUnit, onValueChange: (value) => setValue('priceUnit', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona la unidad" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "hora", children: "Por Hora" }), _jsx(SelectItem, { value: "evento", children: "Por Evento" }), _jsx(SelectItem, { value: "dia", children: "Por D\u00EDa" })] })] })] })] }));
}
