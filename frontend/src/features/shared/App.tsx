import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import * as Sentry from "@sentry/react";
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/components/ui/toaster';
// Providers
import { AuthProvider } from "@/features/auth/context/auth-context";
import { LocationProvider } from "@/features/location/context/location-context";
import { ThemeProvider } from "@/features/shared/context/theme-context";
import { queryClient } from "@/lib/queryClient";
// UI Components
import { LoadingSpinner } from '@/features/shared/components/ui/loading-spinner';
import { BottomNavigation } from '@/features/layout/components/BottomNavigation';
import { Layout } from '@/features/layout/components/Layout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
// Lazy loaded pages
const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const ExplorerPage = lazy(() => import('@/features/explorer/pages/ExplorerPage'));
const ArtistProfilePage = lazy(() => import('@/features/artist/pages/ArtistProfilePage'));
const EventDetailsPage = lazy(() => import('@/features/events/pages/EventDetailsPage'));
const EventCreatePage = lazy(() => import('@/features/events/pages/CreateEventPage'));
const FavoritesPage = lazy(() => import('@/features/favorites/pages/FavoritesPage'));
const ChatPage = lazy(() => import('@/features/chat/pages/ChatPage'));
const CreateArtistProfile = lazy(() => import('@/features/artist/pages/CreateArtistProfilePage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'));
const BlogPage = lazy(() => import('@/features/blog/pages/BlogPage'));
const ShopPage = lazy(() => import('@/features/shop/pages/ShopPage'));
const EventsPage = lazy(() => import('@/features/events/pages/EventsPage'));
// Lazy loaded components
const OfferList = lazy(() => import('@/features/offers/pages/OfferList'));
const CreateOffer = lazy(() => import('@/features/offers/pages/CreateOffer'));
const OfferDetails = lazy(() => import('@/features/offers/pages/OfferDetails'));
// Error fallback component
const ErrorFallback: React.FC = () => (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background", children: _jsxs("div", { className: "w-full max-w-md p-6 space-y-4", children: [_jsx("h1", { className: "text-2xl font-bold text-foreground", children: "\u00A1Ups! Algo sali\u00F3 mal" }), _jsx("p", { className: "text-muted-foreground", children: "Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la p\u00E1gina o contacta con soporte si el problema persiste." }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("button", { onClick: () => window.location.reload(), className: "w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors", children: "Recargar p\u00E1gina" }), _jsx("button", { onClick: () => window.location.href = '/', className: "w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors", children: "Volver al inicio" })] })] }) }));
// Main App component
function MainApp (props: any)) {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(LocationProvider, { children: _jsxs(Router, { children: [_jsxs("div", { className: "min-h-screen pb-16 md:pb-0 bg-background", children: [_jsx(Suspense, { fallback: _jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx(LoadingSpinner, { size: "lg" }) }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/blog", element: _jsx(BlogPage, {}) }), _jsx(Route, { path: "/shop", element: _jsx(ShopPage, {}) }), _jsx(Route, { path: "/events", element: _jsx(EventsPage, {}) }), _jsx(Route, { path: "/favorites", element: _jsx(ProtectedRoute, { children: _jsx(FavoritesPage, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { children: _jsx(ProfilePage, {}) }) })] }), _jsx(Route, { path: "/explorer", element: _jsx(ExplorerPage, {}) }), _jsx(Route, { path: "/artist/:id", element: _jsx(ArtistProfilePage, {}) }), _jsx(Route, { path: "/events/:id", element: _jsx(EventDetailsPage, {}) }), _jsx(Route, { path: "/events/create", element: _jsx(EventCreatePage, {}) }), _jsx(Route, { path: "/chat", element: _jsx(ChatPage, {}) }), _jsx(Route, { path: "/create-artist-profile", element: _jsx(CreateArtistProfile, {}) }), _jsx(Route, { path: "/offers", element: _jsx(OfferList, {}) }), _jsx(Route, { path: "/offers/create", element: _jsx(CreateOffer, {}) }), _jsx(Route, { path: "/offers/:offerId", element: _jsx(OfferDetails, {}) }), _jsx(Route, { path: "*", element: _jsx(ErrorFallback, {}) })] }) }), _jsx(BottomNavigation, {})] }), _jsx(Toaster, {})] }) }) }) }) }));
}
// Initialize Sentry
import "./sentry";
// Create root and render
const root = createRoot(document.getElementById("root"));
root.render(_jsx(Sentry.ErrorBoundary, { fallback: _jsx(ErrorFallback, {}), children: _jsx(MainApp, {}) }));
export default MainApp;
