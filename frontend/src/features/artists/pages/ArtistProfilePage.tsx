import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/ui/components/card';
import { ArtistAbout } from '@/features/shared/components/artist/ArtistAbout';
import { useArtistProfile } from '../hooks/useArtistProfile';
import { ArtistServices } from '@/features/shared/components/artist/ArtistServices';
import { ArtistReviews } from '@/features/shared/components/artist/ArtistReviews';
export default function ArtistProfilePage (props: any)) {
    const { id } = useParams();
    const { artist, loading, error } = useArtistProfile(id);
    if (loading) {
        return _jsx("div", { children: "Cargando perfil..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error al cargar el perfil: ", error.message] });
    }
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Perfil del Artista" }) }), _jsx(CardContent, { children: _jsx(ArtistAbout, { artist: artist }) })] }) }), _jsxs("div", { className: "space-y-8", children: [_jsx(ArtistServices, { services: artist.services }), _jsx(ArtistReviews, { reviews: artist.reviews })] })] }) }));
}
