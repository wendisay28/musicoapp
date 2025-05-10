import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from '@/features/ui/components/avatar';
export function ChatHeader (props: any){ user, isTyping }) {
    return (_jsxs("div", { className: "border-b p-4 flex items-center gap-3", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: user.avatar }), _jsx(AvatarFallback, { children: user.name[0] })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h2", { className: "font-medium", children: user.name }), isTyping && (_jsx("p", { className: "text-sm text-muted-foreground", children: "Escribiendo..." }))] })] }));
}
