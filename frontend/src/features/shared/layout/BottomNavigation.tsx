import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
export function BottomNavigation (props: any)) {
    const location = useLocation();
    const navItems = [
        { path: '/', icon: Home, label: 'Inicio' },
        { path: '/explorer', icon: Search, label: 'Explorar' },
        { path: '/favorites', icon: Heart, label: 'Favoritos' },
        { path: '/chat', icon: MessageCircle, label: 'Chat' },
    ];
    return (_jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden", children: _jsx("div", { className: "flex h-16 items-center justify-around", children: navItems.map(({ path, icon: Icon, label }) => (_jsxs(Link, { to: path, className: cn('flex flex-col items-center justify-center gap-1 px-3 py-2', location.pathname === path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'), children: [_jsx(Icon, { className: "h-6 w-6" }), _jsx("span", { className: "text-xs", children: label })] }, path))) }) }));
}
