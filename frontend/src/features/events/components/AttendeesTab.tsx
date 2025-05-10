import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from '@/features/ui/components/avatar';
export function AttendeesTab (props: any){ event }) {
    return (_jsx("div", { className: "space-y-4", children: event.attendees.map((attendee) => (_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: attendee.avatar }), _jsx(AvatarFallback, { children: attendee.name[0] })] }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: attendee.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: attendee.status === 'confirmed' ? 'Confirmado' : 'Pendiente' })] })] }, attendee.id))) }));
}
