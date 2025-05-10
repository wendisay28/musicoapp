import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spinner } from '@/components/ui/Spinner';
export const PricingSection: React.FC = ({ prices, onSelect, isLoading = false, className = '', }) => {
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center p-4", "data-testid": "loading-indicator", children: _jsx(Spinner, {}) }));
    }
    if (prices.length === 0) {
        return (_jsx("div", { className: "text-center p-4 text-gray-500", children: "No hay precios disponibles" }));
    }
    return (_jsxs("div", { className: `space-y-4 ${className}`, "data-testid": "pricing-section", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Precios" }), _jsx("div", { className: "grid gap-4", children: prices.map(price => (_jsx("button", { onClick: () => onSelect?.(price), className: "p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: price.title }), _jsx("p", { className: "text-sm text-gray-600", children: price.description }), _jsx("ul", { className: "mt-2 text-sm text-gray-600", children: price.features.map((feature, index) => (_jsx("li", { children: feature }, index))) })] }), _jsxs("div", { className: "text-lg font-semibold", children: ["$", price.price] })] }) }, price.id))) })] }));
};
