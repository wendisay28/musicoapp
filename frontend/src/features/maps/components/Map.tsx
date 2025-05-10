import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const containerStyle: any = {
    width: '100%',
    height: '400px'
};
const defaultCenter: any = {
    lat: 19.4326,
    lng: -99.1332
};
export const Map: React.FC = ({ center = defaultCenter, markers = [], onMarkerClick }) => {
    const [map, setMap] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    });
    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);
    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);
    if (!isLoaded) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsx(GoogleMap, { mapContainerStyle: containerStyle, center: center, zoom: 10, onLoad: onLoad, onUnmount: onUnmount, children: markers.map((marker, index) => (_jsx(Marker, { position: marker, onClick: () => onMarkerClick?.(marker) }, index))) }));
};
