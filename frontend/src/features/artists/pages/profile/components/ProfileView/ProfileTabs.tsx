import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/features/shared/components/ui/tabs';
import { ProfileGallery } from './ProfileGallery';
import { ProfileReviews } from './ProfileReviews';
import { ProfileStats } from './ProfileStats';
export function ProfileTabs (props: any){ artworks, reviews, stats, averageRating, totalReviews, }) {
    return (_jsxs(Tabs, { defaultValue: "gallery", className: "space-y-6", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "gallery", children: "Galer\u00EDa" }), _jsx(TabsTrigger, { value: "reviews", children: "Rese\u00F1as" }), _jsx(TabsTrigger, { value: "stats", children: "Estad\u00EDsticas" })] }), _jsx(TabsContent, { value: "gallery", className: "space-y-4", children: _jsx(ProfileGallery, { artworks: artworks }) }), _jsx(TabsContent, { value: "reviews", className: "space-y-4", children: _jsx(ProfileReviews, { reviews: reviews, averageRating: averageRating, totalReviews: totalReviews }) }), _jsx(TabsContent, { value: "stats", className: "space-y-4", children: _jsx(ProfileStats, { stats: stats }) })] }));
}
