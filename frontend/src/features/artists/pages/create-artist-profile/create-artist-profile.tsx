import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/features/ui/components/card';
import { Button } from '@/features/ui/components/button';
import ArtistInfoSection from './ArtistInfoSection';
import PricingSection from './PricingSection';
import MediaSection from './MediaSection';
import ServiceListSection from './ServiceListSection';
import AvailabilitySection from './AvailabilitySection';
import { apiRequest } from '@/lib/queryClient';
// Esquema de validación del formulario con Zod
const artistProfileSchema = z.object({
    category: z.string().min(1, 'La categoría es requerida'),
    subcategory: z.string().min(1, 'La subcategoría es requerida'),
    description: z.string().min(1, 'La descripción es requerida'),
    minPrice: z.string(),
    maxPrice: z.string(),
    priceUnit: z.string(),
    gallery: z.any().optional(),
    services: z.array(z.object({
        title: z.string(),
        description: z.string(),
        price: z.string(),
        video: z.any().optional()
    })).optional(),
    availability: z.array(z.string()).optional(),
});
export default function CreateArtistProfile (props: any)) {
    const methods = useForm({
        resolver: zodResolver(artistProfileSchema),
        defaultValues: {
            category: '',
            subcategory: '',
            description: '',
            minPrice: '',
            maxPrice: '',
            priceUnit: 'hora',
            gallery: [],
            services: [],
            availability: []
        }
    });
    const [, setLocation] = useLocation();
    const onSubmit = async (data) => {
        try {
            const auth = await import('firebase/auth');
            const currentUser = auth.getAuth().currentUser;
            if (!currentUser)
                throw new Error('Debes iniciar sesión para crear tu perfil');
            await apiRequest('POST', '/api/artists', {
                ...data,
                userId: currentUser.uid,
                minPrice: parseInt(data.minPrice),
                maxPrice: parseInt(data.maxPrice),
            });
            setLocation('/profile');
        }
        catch (error) {
            console.error('Error al crear perfil de artista:', error);
        }
    };
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Mejorar Perfil a Artista" }), _jsx(CardDescription, { children: "Completa la informaci\u00F3n para activar tu perfil art\u00EDstico y publicar tus servicios." })] }), _jsx(CardContent, { children: _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(ArtistInfoSection, {}), _jsx(PricingSection, {}), _jsx(MediaSection, {}), _jsx(ServiceListSection, {}), _jsx(AvailabilitySection, {}), _jsx(Button, { type: "submit", className: "w-full", children: "Crear Perfil de Artista" })] }) }) })] }) }));
}
