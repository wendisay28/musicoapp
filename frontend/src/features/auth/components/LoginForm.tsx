import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { useToast } from '@/features/shared/hooks/useToast';
export function LoginForm (props: any){ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const { toast } = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signIn(email, password);
            toast({
                title: '¡Bienvenido!',
                description: 'Has iniciado sesión correctamente',
            });
            onSuccess?.();
        }
        catch (error) {
            console.error('Error al iniciar sesión:', error);
            toast({
                title: 'Error',
                description: 'No se pudo iniciar sesión. Por favor, verifica tus credenciales.',
                variant: 'destructive',
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Correo electr\u00F3nico" }), _jsx(Input, { id: "email", type: "email", placeholder: "ejemplo@correo.com", value: email, onChange: (e) => setEmail(e.target.value), required: true, disabled: isLoading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Contrase\u00F1a" }), _jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, disabled: isLoading })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' })] }));
}
