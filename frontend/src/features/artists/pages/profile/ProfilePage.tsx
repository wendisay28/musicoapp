import React from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { ProfileHeader } from './components/ProfileView/ProfileHeader';
import { ProfileView } from './components/ProfileView/ProfileView';
import { ProfileTabs } from './components/ProfileView/ProfileTabs';
import { ProfileSkeleton } from './components/ProfileView/ProfileSkeleton';
import { useProfile } from '@/features/artist/hooks/useProfile';
export function ProfilePage (props: any)) {
    const [isEditing, setIsEditing] = useState(false);
    const { profile, isLoading, error } = useProfile();
    if (isLoading) {
        return _jsx(ProfileSkeleton, {});
    }
    if (error || !profile) {
        return (_jsx("div", { className: "container mx-auto px-4 py-6", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-red-600", children: "Error al cargar el perfil" }), _jsx("p", { className: "text-muted-foreground mt-2", children: error?.message || 'No se pudo cargar la información del perfil' })] }) }));
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsx(ProfileHeader, { displayName: profile.displayName, photoURL: profile.photoURL, onEdit: () => setIsEditing(true), onShare: () => {
                    navigator.clipboard.writeText(window.location.href);
                } }), isEditing ? (_jsx("div", { children: "Edit Mode" })) : (_jsxs(_Fragment, { children: [_jsx(ProfileView, { userData: {
                            displayName: profile.displayName,
                            email: profile.email,
                            phone: profile.phone,
                            location: profile.location,
                            website: profile.website,
                            bio: profile.bio,
                        }, artistProfile: {
                            specialties: profile.specialties,
                            experience: profile.experience,
                            services: profile.services,
                        } }), _jsx(ProfileTabs, { artworks: profile.artworks, reviews: profile.reviews, stats: {
                            followers: profile.stats.followers,
                            rating: profile.stats.rating,
                            completedProjects: profile.stats.completedProjects,
                            awards: profile.stats.awards,
                        }, averageRating: profile.stats.averageRating, totalReviews: profile.stats.totalReviews })] }))] }));
}
