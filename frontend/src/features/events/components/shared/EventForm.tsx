import React from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '@/shared/schemas';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/features/ui/components/form';
import { Input } from '@/features/ui/components/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/features/ui/components/select';
import { Button } from '@/features/ui/components/button';
import { Textarea } from '@/features/ui/components/textarea';
import { Loader2 } from 'lucide-react';
export function EventForm (props: any){ initialData, onSubmit, isSubmitting, onCancel }) {
    const form = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            name: '',
            date: '',
            description: '',
            eventType: 'virtual',
            virtualLink: '',
            image: '',
            ...initialData
        },
        mode: 'onBlur'
    });
    const handleSubmit = async (data) => {
        try {
            await onSubmit(data);
        }
        catch (error) {
            console.error('Error submitting form:', error);
            form.setError('root', {
                type: 'manual',
                message: 'Ocurrió un error al guardar el evento'
            });
        }
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-6", children: [_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Nombre del Evento*" }), _jsx(FormControl, { children: _jsx(Controller, { control: form.control, name: "name", render: ({ field }) => (_jsx(Input, { placeholder: "Ej: Concierto de Jazz", ...field, disabled: isSubmitting })) }) }), _jsx(FormMessage, {})] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Tipo de Evento*" }), _jsx(FormControl, { children: _jsx(Controller, { control: form.control, name: "eventType", render: ({ field }) => (_jsxs(Select, { onValueChange: field.onChange, value: field.value, disabled: isSubmitting, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona un tipo" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "virtual", children: "Virtual" }), _jsx(SelectItem, { value: "in-person", children: "Presencial" })] })] })) }) }), _jsx(FormMessage, {})] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Fecha y Hora*" }), _jsx(FormControl, { children: _jsx(Controller, { control: form.control, name: "date", render: ({ field }) => (_jsx(Input, { type: "datetime-local", ...field, disabled: isSubmitting })) }) }), _jsx(FormMessage, {})] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Descripci\u00F3n" }), _jsx(FormControl, { children: _jsx(Controller, { control: form.control, name: "description", render: ({ field }) => (_jsx(Textarea, { placeholder: "Descripci\u00F3n detallada del evento...", ...field, rows: 4, disabled: isSubmitting })) }) }), _jsx(FormMessage, {})] }), form.watch('eventType') === 'virtual' && (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Enlace Virtual*" }), _jsx(FormControl, { children: _jsx(Controller, { control: form.control, name: "virtualLink", render: ({ field }) => (_jsx(Input, { placeholder: "https://meet.google.com/xxx-yyyy-zzz", ...field, disabled: isSubmitting })) }) }), _jsx(FormMessage, {})] })), _jsxs(FormItem, { children: [_jsx(FormLabel, { children: "URL de la Imagen" }), _jsx(FormControl, { children: _jsx(Controller, { control: form.control, name: "image", render: ({ field }) => (_jsx(Input, { placeholder: "https://ejemplo.com/imagen.jpg", ...field, disabled: isSubmitting })) }) }), _jsx(FormMessage, {})] }), form.formState.errors.root && (_jsx("div", { className: "text-sm font-medium text-destructive", children: form.formState.errors.root.message })), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [onCancel && (_jsx(Button, { type: "button", variant: "outline", onClick: onCancel, disabled: isSubmitting, children: "Cancelar" })), _jsx(Button, { type: "submit", disabled: isSubmitting, className: "min-w-32", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Guardando..."] })) : ('Guardar Evento') })] })] }) }));
}
