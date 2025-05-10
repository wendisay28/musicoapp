import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/features/shared/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/features/shared/components/ui/avatar';
import { Edit, Share2 } from 'lucide-react';
export function ProfileHeader (props: any){ displayName, photoURL, onEdit, onShare }) {
    const initials = displayName
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Avatar, { className: "h-16 w-16", children: [_jsx(AvatarImage, { src: photoURL, alt: displayName }), _jsx(AvatarFallback, { children: initials })] }), _jsx("div", { children: _jsx("h1", { className: "text-2xl font-bold", children: displayName }) })] }), _jsxs("div", { className: "flex gap-2", children: [onShare && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onShare, children: [_jsx(Share2, { className: "h-4 w-4 mr-2" }), "Compartir"] })), onEdit && (_jsxs(Button, { size: "sm", onClick: onEdit, children: [_jsx(Edit, { className: "h-4 w-4 mr-2" }), "Editar"] }))] })] }));
}
