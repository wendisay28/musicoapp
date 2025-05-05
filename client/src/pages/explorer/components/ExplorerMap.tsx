import { useEffect, useRef } from "react";
import { useLocation } from "@/context/location-context";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface ExplorerMapProps {
  items: any[];
}

export function ExplorerMap({ items }: ExplorerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { locationData } = useLocation();
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || !locationData) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: locationData.lat, lng: locationData.lng },
      zoom: 12,
    });

    mapInstance.current = map;

    return () => {
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
    };
  }, [locationData]);

  useEffect(() => {
    if (!mapInstance.current || !items.length) return;

    // Limpiar marcadores anteriores
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // Agregar nuevos marcadores
    items.forEach(item => {
      if (!item.lat || !item.lng) return;

      const marker = new google.maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map: mapInstance.current,
        title: item.name || item.title,
      });

      markers.current.push(marker);
    });
  }, [items]);

  return (
    <div 
      ref={mapRef} 
      className="hidden md:block w-full h-full rounded-lg overflow-hidden"
      style={{ height: "calc(100vh - 200px)" }}
    />
  );
} 