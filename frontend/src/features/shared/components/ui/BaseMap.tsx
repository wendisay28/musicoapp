import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { GoogleMap, useLoadScript, Marker as GoogleMarker } from '@react-google-maps/api';
/**
 * Componente base para mapas
 * @component
 * @example
 * ```tsx
 * <BaseMap
 *   center={{
 *     address: 'Dirección',
 *     city: 'Ciudad',
 *     state: 'Estado',
 *     country: 'País',
 *     coordinates: { lat: 0, lng: 0 }
 *   }}
 *   markers={[
 *     {
 *       id: '1',
 *       type: 'artist',
 *       position: { lat: 0, lng: 0 },
 *       title: 'Título',
 *       data: {} as Artist
 *     }
 *   ]}
 * />
 * ```
 */
export const BaseMap = memo(function BaseMap (props: any){ center, markers = [], className, onMarkerClick, zoom = 13 }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    });
    if (!isLoaded)
        return _jsx("div", { children: "Loading..." });
    return (_jsx(GoogleMap, { mapContainerClassName: cn("w-full h-full min-h-[300px]", className), center: {
            lat: center.coordinates?.lat || 0,
            lng: center.coordinates?.lng || 0
        }, zoom: zoom, options: {
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        }, children: markers.map((marker) => (_jsx(GoogleMarker, { position: {
                lat: marker.position.lat,
                lng: marker.position.lng
            }, title: marker.title, onClick: () => onMarkerClick?.(marker) }, marker.id))) }));
});
