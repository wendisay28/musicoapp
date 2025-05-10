import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { useToast } from '@/features/shared/hooks/useToast';
export function RegisterForm (props: any){ onSuccess }) {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const { toast } = useToast();
    const validateForm: React.FC = () => {
        if (password.length < 6) {
            toast({
                title: 'Error',
                description: 'La contraseña debe tener al menos 6 caracteres',
                variant: 'destructive',
            });
            return false;
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Las contraseñas no coinciden',
                variant: 'destructive',
            });
            return false;
        }
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            // Aquí deberías implementar la lógica de registro
            // Por ejemplo, usando Firebase Auth o tu propio sistema de autenticación
            await signIn(email, password);
            toast({
                title: '¡Bienvenido!',
                description: 'Tu cuenta ha sido creada correctamente',
            });
            onSuccess?.();
        }
        catch (error) {
            console.error('Error al registrar:', error);
            toast({
                title: 'Error',
                description: 'No se pudo crear la cuenta. Por favor, intenta nuevamente.',
                variant: 'destructive',
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "displayName", children: "Nombre completo" }), _jsx(Input, { id: "displayName", type: "text", placeholder: "Tu nombre", value: displayName, onChange: (e) => setDisplayName(e.target.value), required: true, disabled: isLoading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Correo electr\u00F3nico" }), _jsx(Input, { id: "email", type: "email", placeholder: "ejemplo@correo.com", value: email, onChange: (e) => setEmail(e.target.value), required: true, disabled: isLoading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Contrase\u00F1a" }), _jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, disabled: isLoading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "confirmPassword", children: "Confirmar contrase\u00F1a" }), _jsx(Input, { id: "confirmPassword", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, disabled: isLoading })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? 'Creando cuenta...' : 'Crear cuenta' })] }));
}
