import React from 'react';
import { useState, useCallback } from 'react';
export function useMapMarkers (props: any){ initialMarkers = [], onMarkerClick }) {
    const [markers, setMarkers] = useState(initialMarkers);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const handleMarkerClick = useCallback((marker) => {
        setSelectedMarker(marker);
        onMarkerClick?.(marker);
    }, [onMarkerClick]);
    const updateMarkers = useCallback((newMarkers) => {
        setMarkers(newMarkers);
    }, []);
    const clearMarkers = useCallback(() => {
        setMarkers([]);
        setSelectedMarker(null);
    }, []);
    return {
        markers,
        selectedMarker,
        handleMarkerClick,
        updateMarkers,
        clearMarkers
    };
}
