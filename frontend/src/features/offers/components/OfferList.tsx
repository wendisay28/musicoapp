import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useOffers } from '../hooks/useOffers';
export const OfferList: React.FC = () => {
    const { user } = useAuth();
    const { offers, loading, error, fetchOffers } = useOffers();
    React.useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);
    if (loading) {
        return _jsx("div", { className: "flex justify-center items-center h-64", children: "Cargando..." });
    }
    if (error) {
        return _jsx("div", { className: "text-red-500", children: error });
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Ofertas" }), user && (_jsx(Link, { to: "/offers/new", className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600", children: "Nueva Oferta" }))] }), offers.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "No hay ofertas disponibles" })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: offers.map((offer) => (_jsxs(Link, { to: `/offers/${offer.id}`, className: "block p-4 border rounded-lg hover:shadow-lg transition-shadow", children: [_jsx("h3", { className: "text-lg font-semibold", children: offer.title }), _jsx("p", { className: "text-gray-600 mt-2", children: offer.description }), _jsxs("div", { className: "mt-4 flex justify-between items-center", children: [_jsxs("span", { className: "text-blue-500 font-medium", children: ["$", offer.price.toLocaleString()] }), _jsx("span", { className: "text-sm text-gray-500", children: new Date(offer.createdAt).toLocaleDateString() })] })] }, offer.id))) }))] }));
};
