import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/features/shared/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/shared/components/ui/tabs';
import { ProfileView } from './components/ProfileView/ProfileView';
import { ProfileForm } from './components/ProfileForm/ProfileForm';
import { OrdersSection } from './components/Orders/OrdersSection';
import { EventsList } from './components/Events/EventsList';
import { AuthDialog } from '@/features/shared/components/auth-dialog';
import { ProfileSkeleton } from './components/ProfileView/ProfileSkeleton';
import { Button } from '@/features/shared/components/ui/button';
import { Edit, User, ShoppingBag, Calendar, Settings } from 'lucide-react';
import { AccountSettings } from './components/Settings/AccountSettings';
/**
 * Componente principal de la página de perfil
 * Maneja:
 * - Autenticación
 * - Modo edición/vista
 * - Navegación por pestañas
 * - Carga de datos
 */
export default function ProfilePage (props: any)) {
    const [, navigate] = useLocation();
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    // Consulta para datos básicos del perfil
    const { data: userData, isLoading: isLoadingUser } = useQuery({
        queryKey: ['user-profile', user?.uid],
        queryFn: async () => {
            const response = await apiRequest({
                method: 'GET',
                url: `/api/users/${user?.uid}/profile`
            });
            return response.json();
        },
        enabled: !!user?.uid
    });
    // Consulta para perfil de artista
    const { data: artistProfile, isLoading: isLoadingArtist } = useQuery({
        queryKey: ['artist-profile', user?.uid],
        queryFn: async () => {
            const response = await apiRequest({
                method: 'GET',
                url: `/api/users/${user?.uid}/artist-profile`
            });
            return response.json();
        },
        enabled: !!user?.uid
    });
    // Estados de carga combinados
    const isLoadingProfile = isLoadingUser || isLoadingArtist;
    const isLoading = isLoadingProfile || (isEditing && isLoadingArtist);
    // Manejo de autenticación
    if (!user) {
        return (_jsxs("div", { className: "container mx-auto px-4 py-8 text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDC64" }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Iniciar sesi\u00F3n" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Inicia sesi\u00F3n para ver tu perfil" }), _jsx(AuthDialog, { onClose: () => { } })] }));
    }
    // Estado de carga
    if (isLoading) {
        return _jsx(ProfileSkeleton, {});
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 pb-16", children: [_jsxs("div", { className: "flex justify-between items-start mb-6", children: [_jsx("h1", { className: "font-bold text-2xl", children: "Mi Perfil" }), !isEditing && (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => setIsEditing(true), disabled: isLoading, children: [_jsx(Edit, { className: "h-4 w-4 mr-2" }), "Editar perfil"] }))] }), isEditing ? (_jsx(ProfileForm, { initialData: {
                    ...userData,
                    ...artistProfile
                }, onCancel: () => setIsEditing(false), onSubmit: () => {
                    setIsEditing(false);
                    toast({
                        title: 'Perfil actualizado',
                        description: 'Tus cambios se han guardado correctamente'
                    });
                } })) : (_jsxs(Tabs, { defaultValue: "profile", className: "w-full", children: [_jsxs(TabsList, { className: "w-full grid grid-cols-4", children: [_jsxs(TabsTrigger, { value: "profile", children: [_jsx(User, { className: "h-4 w-4 mr-2" }), "Perfil"] }), _jsxs(TabsTrigger, { value: "orders", children: [_jsx(ShoppingBag, { className: "h-4 w-4 mr-2" }), "\u00D3rdenes"] }), _jsxs(TabsTrigger, { value: "events", children: [_jsx(Calendar, { className: "h-4 w-4 mr-2" }), "Eventos"] }), _jsxs(TabsTrigger, { value: "settings", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Configuraci\u00F3n"] })] }), _jsxs("div", { className: "mt-6", children: [_jsx(TabsContent, { value: "profile", children: _jsx(ProfileView, { userData: userData, artistProfile: artistProfile }) }), _jsx(TabsContent, { value: "orders", children: _jsx(OrdersSection, {}) }), _jsx(TabsContent, { value: "events", children: _jsx(EventsList, {}) }), _jsx(TabsContent, { value: "settings", children: _jsx(AccountSettings, { onLogout: () => {
                                        logout();
                                        navigate('/');
                                    }, onDeleteAccount: handleDeleteAccount }) })] })] }))] }));
    async function handleDeleteAccount (props: any)) {
        try {
            await apiRequest({
                method: 'DELETE',
                url: `/api/users/${user?.uid}`
            });
            await logout();
            toast({
                title: 'Cuenta eliminada',
                description: 'Tu cuenta ha sido eliminada exitosamente',
            });
            navigate('/');
        }
        catch (error) {
            console.error('Error deleting account:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo eliminar la cuenta. Inténtalo de nuevo.',
            });
        }
    }
}
