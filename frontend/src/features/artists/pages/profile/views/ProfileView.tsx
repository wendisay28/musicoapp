import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Button } from '@/features/ui/components/button';
import { Loader2 } from 'lucide-react';
import { ProfileForm } from '@/features/shared/components/ProfileForm/ProfileForm';
import { useProfileForm } from '../hooks/useProfileForm';
/**
 * Vista para editar el perfil del usuario
 */
export function ProfileEditView (props: any){ userId, initialData, onCancel, onSuccess }) {
    const { form, isSubmitting, submitForm } = useProfileForm(userId);
    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        }
    }, [initialData, form]);
    const handleSubmit = async (data) => {
        try {
            await submitForm(data);
            onSuccess();
        }
        catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Editar Perfil" }), _jsxs(Button, { variant: "outline", onClick: onCancel, disabled: isSubmitting, children: [isSubmitting && _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Cancelar"] })] }), _jsx(ProfileForm, { initialData: initialData, onSubmit: handleSubmit, isSubmitting: isSubmitting, onCancel: onCancel })] }));
}
