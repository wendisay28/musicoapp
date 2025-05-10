import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
export function AuthDialog (props: any){ open = true, onOpenChange, onClose }) {
    const handleClose: React.FC = () => {
        onOpenChange?.(false);
        onClose?.();
    };
    return (_jsx(Dialog, { open: open, onOpenChange: handleClose, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Bienvenido a ArtConect" }), _jsx(DialogDescription, { children: "Inicia sesi\u00F3n o reg\u00EDstrate para continuar" })] }), _jsxs(Tabs, { defaultValue: "login", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "login", children: "Iniciar Sesi\u00F3n" }), _jsx(TabsTrigger, { value: "register", children: "Registrarse" })] }), _jsx(TabsContent, { value: "login", children: _jsx(LoginForm, { onSuccess: handleClose }) }), _jsx(TabsContent, { value: "register", children: _jsx(RegisterForm, { onSuccess: handleClose }) })] })] }) }));
}
