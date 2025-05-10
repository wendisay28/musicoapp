import React from 'react';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/features/shared/components/ui/button';
import { Form } from '@/features/shared/components/ui/form';
import { profileFormSchema } from '@/features/artist/pages/profile/components/ProfileForm/schemas/profileFormSchema';
export function ProfileForm (props: any){ initialData = {}, onSubmit, isSubmitting = false, onCancel, children, form: externalForm, }) {
    const internalForm = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            displayName: '',
            username: '',
            bio: '',
            role: '',
            location: '',
            skills: [],
            photoURL: '',
            category: '',
            subcategory: '',
            tags: [],
            ...initialData,
        },
        mode: 'onBlur',
    });
    const form = externalForm ?? internalForm;
    const handleSubmit = async (data) => {
        try {
            await onSubmit(data);
        }
        catch (error) {
            console.error('Submission error:', error);
        }
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-6", children: [_jsx("div", { className: "grid gap-6", children: children }), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onCancel, disabled: isSubmitting, children: "Cancelar" }), _jsx(Button, { type: "submit", disabled: isSubmitting, "aria-disabled": isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Guardando..."] })) : ('Guardar cambios') })] })] }) }));
}
