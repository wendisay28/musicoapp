import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/features/shared/components/ui/button';
import { cn } from '@/lib/utils';
export function HeroSection (props: any){ className }) {
    return (_jsx("div", { className: cn('relative py-20', className), children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-2xl", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: "Conecta con el Arte y la Cultura" }), _jsx("p", { className: "text-lg text-muted-foreground mb-8", children: "Descubre eventos, artistas y lugares \u00FAnicos en tu ciudad. \u00DAnete a nuestra comunidad y vive experiencias culturales inolvidables." }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { size: "lg", children: "Explorar Eventos" }), _jsx(Button, { size: "lg", variant: "outline", children: "Registrarse" })] })] }) }) }));
}
