import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from '@/features/ui/components/avatar';
export function OrganizerTab (props: any){ event }) {
    return (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Avatar, { className: "h-16 w-16", children: [_jsx(AvatarImage, { src: event.organizer.avatar }), _jsx(AvatarFallback, { children: event.organizer.name[0] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: event.organizer.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Organizador" })] })] }) }));
}
