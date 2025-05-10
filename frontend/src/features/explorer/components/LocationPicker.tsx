import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
export const LocationPicker: React.FC = () => {
    const { location, loading, error, requestLocation } = useGeolocation();
    const [address, setAddress] = useState('');
    useEffect(() => {
        if (location) {
            // Aquí podríamos usar una API de geocodificación inversa para obtener la dirección
            // Por ahora solo mostramos las coordenadas
            setAddress(`${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`);
        }
    }, [location]);
    const handleRequestLocation: React.FC = () => {
        requestLocation();
    };
    if (loading) {
        return (_jsxs("div", { className: "flex items-center justify-center p-4", children: [_jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-primary" }), _jsx("span", { className: "ml-2", children: "Obteniendo ubicaci\u00F3n..." })] }));
    }
    if (error) {
        return (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsxs("div", { className: "text-red-500", children: [_jsxs("p", { children: ["Error al obtener la ubicaci\u00F3n: ", error] }), _jsx("button", { onClick: handleRequestLocation, className: "mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark", children: "Intentar de nuevo" })] }) }));
    }
    return (_jsxs("div", { className: "flex items-center justify-between p-4 bg-white rounded-lg shadow", children: [_jsxs("div", { className: "flex items-center", children: [_jsxs("svg", { className: "w-6 h-6 text-gray-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })] }), _jsx("span", { className: "ml-2 text-gray-700", children: address || 'Selecciona tu ubicación' })] }), _jsx("button", { onClick: handleRequestLocation, className: "px-4 py-2 text-sm text-primary hover:text-primary-dark", children: "Cambiar ubicaci\u00F3n" })] }));
};
