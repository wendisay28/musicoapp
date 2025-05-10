import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/ui/components/card';
import { Button } from '@/features/ui/components/button';
import { ArtistInfoSection, ServiceListSection, AvailabilitySection, MediaSection, PricingSection } from '../components';
import { useCreateArtistProfile } from '../hooks';
import { artistProfileSchema } from '../schema';
export default function CreateArtistProfilePage (props: any)) {
    const navigate = useNavigate();
    const { createProfile, loading, error } = useCreateArtistProfile();
    const methods = useForm({
        resolver: zodResolver(artistProfileSchema),
        defaultValues: {
            name: '',
            bio: '',
            specialties: [],
            experience: 0,
            services: [],
            availability: [],
            media: [],
            pricing: {
                baseRate: 0,
                packages: []
            }
        }
    });
    const onSubmit = async (data) => {
        try {
            await createProfile(data);
            navigate('/artist/profile');
        }
        catch (err) {
            console.error('Error creating profile:', err);
        }
    };
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Crear Perfil de Artista" }) }), _jsxs(CardContent, { children: [error && (_jsx("div", { className: "mb-4 p-4 bg-destructive/10 text-destructive rounded-md", children: error.message })), _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(ArtistInfoSection, {}), _jsx(ServiceListSection, {}), _jsx(AvailabilitySection, {}), _jsx(MediaSection, {}), _jsx(PricingSection, {}), _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? 'Creando perfil...' : 'Crear Perfil' })] }) })] })] }) }));
}
