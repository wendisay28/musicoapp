import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Map } from './Map';
import { useGeolocation } from '../hooks/useGeolocation';
export function LocationPicker (props: any){ onLocationSelect }) {
    const { latitude, longitude, error, loading } = useGeolocation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const handleMarkerClick: React.FC = (marker) => {
        setSelectedLocation(marker.position);
        onLocationSelect?.(marker.position);
    };
    if (loading) {
        return _jsx("div", { children: "Loading location..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    const center = selectedLocation || (latitude && longitude ? { lat: latitude, lng: longitude } : undefined);
    const markers = selectedLocation ? [{ position: selectedLocation }] : [];
    return (_jsxs("div", { className: "w-full", children: [_jsx(Map, { center: center, markers: markers, onMarkerClick: handleMarkerClick }), selectedLocation && (_jsxs("div", { className: "mt-2 text-sm text-gray-600", children: ["Selected location: ", selectedLocation.lat.toFixed(6), ", ", selectedLocation.lng.toFixed(6)] }))] }));
}
