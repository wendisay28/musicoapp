import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HeroSection } from '../components/HeroSection';
import { BannerCarousel } from '../components/BannerCarousel';
import { FeaturedEvents } from '../components/FeaturedEvents';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { FeaturedBlogPosts } from '../components/FeaturedBlogPosts';
import { FeaturedArtists } from '../components/FeaturedArtists';
import { getFeaturedContent, getRecommendedContent } from '@/features/shared/services/recommendations';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useUserPreferences } from '@/features/user/hooks/useUserPreferences';
export function HomePage (props: any)) {
    const { user } = useAuth();
    const { preferences } = useUserPreferences();
    const [recommendationConfig, setRecommendationConfig] = useState({
        algorithm: 'hybrid',
        filters: {
            location: true,
            age: true,
            history: true
        }
    });
    // Obtener contenido destacado
    const { data: featuredBanners } = useQuery({
        queryKey: ['featured-content', 'banner'],
        queryFn: () => getFeaturedContent('banner')
    });
    const { data: featuredProducts } = useQuery({
        queryKey: ['featured-content', 'product'],
        queryFn: () => getFeaturedContent('product')
    });
    const { data: featuredArtists } = useQuery({
        queryKey: ['featured-content', 'artist'],
        queryFn: () => getFeaturedContent('artist')
    });
    const { data: featuredBlogPosts } = useQuery({
        queryKey: ['featured-content', 'blog'],
        queryFn: () => getFeaturedContent('blog')
    });
    const { data: featuredEvents } = useQuery({
        queryKey: ['featured-content', 'event'],
        queryFn: () => getFeaturedContent('event')
    });
    // Obtener recomendaciones personalizadas si el usuario está autenticado
    const { data: recommendedContent } = useQuery({
        queryKey: ['recommended-content', user?.id, preferences],
        queryFn: () => {
            if (!user || !preferences)
                return null;
            return getRecommendedContent('all', preferences, recommendationConfig);
        },
        enabled: !!user && !!preferences
    });
    return (_jsxs("div", { className: "space-y-8", children: [_jsx(HeroSection, {}), _jsx(BannerCarousel, { banners: [
                    ...(featuredBanners || []),
                    ...(recommendedContent?.banners || [])
                ] }), _jsxs("div", { className: "container mx-auto px-4 space-y-12", children: [_jsx(FeaturedEvents, { events: [
                            ...(featuredEvents || []),
                            ...(recommendedContent?.events || [])
                        ] }), _jsx(FeaturedProducts, { products: [
                            ...(featuredProducts || []),
                            ...(recommendedContent?.products || [])
                        ] }), _jsx(FeaturedBlogPosts, { posts: [
                            ...(featuredBlogPosts || []),
                            ...(recommendedContent?.blogPosts || [])
                        ] }), _jsx(FeaturedArtists, { artists: [
                            ...(featuredArtists || []),
                            ...(recommendedContent?.artists || [])
                        ] })] })] }));
}
