import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { portfolioSchema } from '@/shared/schemas/portfolio';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/features/shared/components/ui/form';
import { Input } from '@/features/shared/components/ui/input';
import { Button } from '@/features/shared/components/ui/button';
import { Textarea } from '@/features/shared/components/ui/textarea';
export function PortfolioForm (props: any){ initialData, onSubmit, isSubmitting, onCancel }) {
    const form = useForm({
        resolver: zodResolver(portfolioSchema),
        defaultValues: {
            title: '',
            description: '',
            images: [],
            ...initialData
        }
    });
    const handleSubmit = async (data) => {
        try {
            await onSubmit(data);
        }
        catch (error) {
            console.error('Error submitting form:', error);
            form.setError('root', {
                type: 'manual',
                message: 'Ocurrió un error al guardar el portafolio'
            });
        }
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-6", children: [_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "T\u00EDtulo" }), _jsx(FormControl, { children: _jsx(Controller, { control: form.control, name: "title", render: ({ field }) => (_jsx(Input, { placeholder: "T\u00EDtulo del proyecto", ...field, disabled: isSubmitting })) }) }), _jsx(FormMessage, {})] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Descripci\u00F3n" }), _jsx(FormControl, { children: _jsx(Controller, { control: form.control, name: "description", render: ({ field }) => (_jsx(Textarea, { placeholder: "Descripci\u00F3n del proyecto...", ...field, rows: 4, disabled: isSubmitting })) }) }), _jsx(FormMessage, {})] }), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [onCancel && (_jsx(Button, { type: "button", variant: "outline", onClick: onCancel, disabled: isSubmitting, children: "Cancelar" })), _jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? 'Guardando...' : 'Guardar' })] })] }) }));
}
