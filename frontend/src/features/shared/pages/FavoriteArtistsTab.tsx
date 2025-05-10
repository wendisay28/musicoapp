import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArtistCard } from '@/features/shared/components/artist/ArtistCard';
import { Skeleton } from '@/features/shared/components/ui/skeleton';
import { Button } from '@/features/shared/components/ui/button';
import { X } from 'lucide-react';
export default function FavoriteArtistsTab (props: any){ artists, isLoading, onRemove }) {
    if (isLoading) {
        return (_jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [...Array(3)].map((_, i) => (_jsx(Skeleton, { className: "h-[200px] w-full" }, i))) }));
    }
    if (!artists.length) {
        return (_jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No tienes artistas favoritos" }));
    }
    return (_jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: artists.map((artist) => (_jsxs("div", { className: "relative", children: [_jsx(ArtistCard, { artist: artist }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute top-2 right-2", onClick: () => onRemove(artist.id), children: _jsx(X, { className: "h-4 w-4" }) })] }, artist.id))) }));
}
