import { memo, useEffect, useRef } from 'react';
import { Location, Marker } from '@/types/artist';
import { cn } from '@/lib/utils';

/**
 * Props para el componente BaseMap
 * @interface BaseMapProps
 * @property {Location} center - Ubicación central del mapa
 * @property {Marker[]} markers - Marcadores a mostrar en el mapa
 * @property {string} [className] - Clases CSS adicionales
 * @property {(marker: Marker) => void} [onMarkerClick] - Callback para clics en marcadores
 * @property {number} [zoom] - Nivel de zoom del mapa
 */
interface BaseMapProps {
  center: Location;
  markers?: Marker[];
  zoom?: number;
  className?: string;
  onMarkerClick?: (marker: Marker) => void;
}

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
export const BaseMap = memo(function BaseMap({
  center,
  markers = [],
  className,
  onMarkerClick,
  zoom = 13
}: BaseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { 
        lat: center.coordinates?.lat || 0, 
        lng: center.coordinates?.lng || 0 
      },
      zoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    mapInstanceRef.current = map;

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    markers.forEach(marker => {
      const mapMarker = new google.maps.Marker({
        position: { 
          lat: marker.position.lat, 
          lng: marker.position.lng 
        },
        map: mapInstanceRef.current,
        title: marker.title
      });

      if (onMarkerClick) {
        mapMarker.addListener('click', () => onMarkerClick(marker));
      }

      markersRef.current.push(mapMarker);
    });
  }, [markers, onMarkerClick]);

  return (
    <div
      ref={mapRef}
      className={cn("w-full h-full min-h-[300px]", className)}
      data-testid="base-map"
    />
  );
}); 