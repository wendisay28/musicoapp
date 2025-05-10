import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { cn } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';
/**
 * Componente de mapa basado en Leaflet
 * @component
 */
export function Map (props: any){ center, zoom = 13, markers = [], interactive = true, className }) {
    return (_jsxs(MapContainer, { center: center, zoom: zoom, scrollWheelZoom: interactive, dragging: interactive, className: cn('w-full h-64 rounded-md', className), children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), markers.map((marker, index) => (_jsx(Marker, { position: marker.position, children: (marker.title || marker.description) && (_jsxs(Popup, { children: [marker.title && (_jsx("h3", { className: "font-medium", children: marker.title })), marker.description && (_jsx("p", { className: "text-sm text-muted-foreground", children: marker.description }))] })) }, index)))] }));
}
