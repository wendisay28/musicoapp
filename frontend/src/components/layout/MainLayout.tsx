import React from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
export function MainLayout (props: any){ children }) {
    const { user, logout } = useAuth();
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx("header", { className: "border-b", children: _jsxs("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold", children: "ArtConect" }), _jsx("nav", { className: "flex items-center gap-4", children: user ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-sm", children: ["Welcome, ", user.name] }), _jsx(Button, { variant: "outline", onClick: logout, children: "Logout" })] })) : (_jsx(Button, { variant: "outline", asChild: true, children: _jsx("a", { href: "/login", children: "Login" }) })) })] }) }), _jsx("main", { className: "flex-1 container mx-auto px-4 py-8", children: children }), _jsx("footer", { className: "border-t", children: _jsx("div", { className: "container mx-auto px-4 py-6", children: _jsxs("p", { className: "text-center text-sm text-gray-500", children: ["\u00A9 ", new Date().getFullYear(), " ArtConect. All rights reserved."] }) }) })] }));
}
