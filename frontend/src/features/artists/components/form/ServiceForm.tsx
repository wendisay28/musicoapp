import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { Button } from '@/features/shared/components/ui/button';
import { Textarea } from '@/features/shared/components/ui/textarea';
export function ServiceForm (props: any)) {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services'
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Servicios" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Agrega uno o m\u00E1s servicios que ofreces como artista." })] }), fields.map((field, index) => (_jsxs("div", { className: "border rounded-xl p-4 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `services.${index}.title`, children: "T\u00EDtulo del Servicio" }), _jsx(Input, { id: `services.${index}.title`, placeholder: "Ej: Sesi\u00F3n musical en vivo", ...register(`services.${index}.title`) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `services.${index}.description`, children: "Descripci\u00F3n" }), _jsx(Textarea, { id: `services.${index}.description`, placeholder: "Describe lo que incluye el servicio...", ...register(`services.${index}.description`) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `services.${index}.price`, children: "Precio" }), _jsx(Input, { id: `services.${index}.price`, type: "number", placeholder: "Ej: 150000", ...register(`services.${index}.price`) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `services.${index}.video`, children: "Video Promocional (opcional)" }), _jsx(Input, { id: `services.${index}.video`, type: "file", accept: "video/*", ...register(`services.${index}.video`) })] }), _jsx(Button, { variant: "outline", type: "button", onClick: () => remove(index), children: "Eliminar servicio" })] }, field.id))), _jsx(Button, { type: "button", onClick: () => append({ title: '', description: '', price: '', video: null }), children: "Agregar Servicio" })] }));
}
