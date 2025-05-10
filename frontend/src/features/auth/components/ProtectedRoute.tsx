import React from 'react';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Navigate, useLocation } from 'wouter';
export function ProtectedRoute (props: any){ children }) {
    const { user, loading } = useAuth();
    const [location] = useLocation();
    if (loading) {
        return _jsx("div", { children: "Cargando..." });
    }
    if (!user) {
        return _jsx(Navigate, { to: `/login?redirect=${encodeURIComponent(location)}` });
    }
    return _jsx(_Fragment, { children: children });
}
