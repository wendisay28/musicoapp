import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/features/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
export function ServiceListSection (props: any)) {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services'
    });
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Servicios" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [fields.map((field, index) => (_jsxs("div", { className: "flex gap-4 items-start", children: [_jsxs("div", { className: "flex-1 space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: `services.${index}.name`, children: "Nombre del servicio" }), _jsx(Input, { id: `services.${index}.name`, ...register(`services.${index}.name`) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: `services.${index}.description`, children: "Descripci\u00F3n" }), _jsx(Input, { id: `services.${index}.description`, ...register(`services.${index}.description`) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: `services.${index}.price`, children: "Precio" }), _jsx(Input, { id: `services.${index}.price`, type: "number", ...register(`services.${index}.price`, { valueAsNumber: true }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: `services.${index}.duration`, children: "Duraci\u00F3n (minutos)" }), _jsx(Input, { id: `services.${index}.duration`, type: "number", ...register(`services.${index}.duration`, { valueAsNumber: true }) })] })] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(index), children: _jsx(Trash2, { className: "h-4 w-4" }) })] }, field.id))), _jsxs(Button, { type: "button", variant: "outline", onClick: () => append({ name: '', description: '', price: 0, duration: 30 }), className: "w-full", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Agregar Servicio"] })] }) })] }));
}
