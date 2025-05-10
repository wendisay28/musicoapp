import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/features/ui/components/ui/button';
import { Input } from '@/features/ui/components/ui/input';
import { Label } from '@/features/ui/components/ui/label';
import { Textarea } from '@/features/ui/components/ui/textarea';
import { eventSchema } from '../schema';
export function EventForm (props: any){ onSubmit, initialData, className }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData
    });
    return (_jsx("form", { onSubmit: handleSubmit(onSubmit), className: className, children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "T\u00EDtulo del Evento" }), _jsx(Input, { id: "title", ...register('title'), placeholder: "Ingresa el t\u00EDtulo del evento" }), errors.title && (_jsx("p", { className: "text-sm text-red-500", children: errors.title.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", children: "Descripci\u00F3n" }), _jsx(Textarea, { id: "description", ...register('description'), placeholder: "Describe el evento", rows: 4 }), errors.description && (_jsx("p", { className: "text-sm text-red-500", children: errors.description.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "date", children: "Fecha" }), _jsx(Input, { id: "date", type: "datetime-local", ...register('date') }), errors.date && (_jsx("p", { className: "text-sm text-red-500", children: errors.date.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "location", children: "Ubicaci\u00F3n" }), _jsx(Input, { id: "location", ...register('location'), placeholder: "Ingresa la ubicaci\u00F3n" }), errors.location && (_jsx("p", { className: "text-sm text-red-500", children: errors.location.message }))] }), _jsx(Button, { type: "submit", className: "w-full", children: "Crear Evento" })] }) }));
}
