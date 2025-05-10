import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/features/ui/components/avatar';
import { Button } from '@/features/ui/components/button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from "@/lib/utils";
/**
 * Componente de encabezado para perfiles de usuario
 *
 * @param {string} [title="Mi Perfil"] - Título del encabezado
 * @param {boolean} [showEditButton=true] - Mostrar botón de edición
 * @param {Function} [onEditClick] - Callback para el botón de edición
 * @param {string} [className] - Clases adicionales para el contenedor
 * @param {'sm'|'md'|'lg'} [avatarSize='md'] - Tamaño del avatar
 */
export function ProfileHeader (props: any){ title = "Mi Perfil", showEditButton = true, onEditClick, className = '', avatarSize = 'md' }) {
    const { user } = useAuth();
    const avatarClasses: any = {
        sm: 'h-10 w-10',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    };
    const getInitials: React.FC = () => {
        if (!user?.displayName)
            return 'US';
        return user.displayName
            .split(' ')
            .slice(0, 2)
            .map(name => name[0])
            .join('')
            .toUpperCase();
    };
    return (_jsxs("div", { className: cn("flex justify-between items-center mb-6", className), children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Avatar, { className: cn(avatarClasses[avatarSize], "border-2 border-muted"), children: [_jsx(AvatarImage, { src: user?.photoURL || undefined, alt: `Avatar de ${user?.displayName || 'usuario'}`, className: "object-cover" }), _jsx(AvatarFallback, { className: "bg-muted font-medium", children: getInitials() })] }), _jsx("h1", { className: "font-bold text-2xl tracking-tight", children: title })] }), showEditButton && onEditClick && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onEditClick, "aria-label": "Editar perfil", children: [_jsx(Edit, { className: "h-4 w-4 mr-2" }), "Editar perfil"] }))] }));
}
