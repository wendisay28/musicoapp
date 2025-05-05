import { useState, useCallback } from 'react';
import { Marker } from '@/types/artist';

interface UseMapMarkersProps {
  initialMarkers?: Marker[];
  onMarkerClick?: (marker: Marker) => void;
}

export function useMapMarkers({ initialMarkers = [], onMarkerClick }: UseMapMarkersProps) {
  const [markers, setMarkers] = useState<Marker[]>(initialMarkers);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  const handleMarkerClick = useCallback((marker: Marker) => {
    setSelectedMarker(marker);
    onMarkerClick?.(marker);
  }, [onMarkerClick]);

  const updateMarkers = useCallback((newMarkers: Marker[]) => {
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