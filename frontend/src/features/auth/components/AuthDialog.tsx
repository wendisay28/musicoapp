import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/features/shared/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/shared/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
export function AuthDialog (props: any){ open, onOpenChange }) {
    const [activeTab, setActiveTab] = useState('login');
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: activeTab === 'login' ? 'Iniciar sesión' : 'Crear cuenta' }) }), _jsxs(Tabs, { value: activeTab, onValueChange: (value) => setActiveTab(value), children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "login", children: "Iniciar sesi\u00F3n" }), _jsx(TabsTrigger, { value: "register", children: "Registrarse" })] }), _jsx(TabsContent, { value: "login", children: _jsx(LoginForm, {}) }), _jsx(TabsContent, { value: "register", children: _jsx(RegisterForm, {}) })] })] }) }));
}
