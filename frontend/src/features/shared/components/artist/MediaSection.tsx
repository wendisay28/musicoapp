import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spinner } from '@/components/ui/Spinner';
export const MediaSection: React.FC = ({ images, onSelect, isLoading = false, className = '', }) => {
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center p-4", "data-testid": "loading-indicator", children: _jsx(Spinner, {}) }));
    }
    if (images.length === 0) {
        return (_jsx("div", { className: "text-center p-4 text-gray-500", children: "No hay im\u00E1genes disponibles" }));
    }
    return (_jsxs("div", { className: `space-y-4 ${className}`, "data-testid": "media-section", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Galer\u00EDa" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: images.map(image => (_jsxs("button", { onClick: () => onSelect?.(image), className: "relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity", children: [_jsx("img", { src: image.url, alt: image.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2", children: _jsx("p", { className: "text-sm font-medium truncate", children: image.title }) })] }, image.id))) })] }));
};
