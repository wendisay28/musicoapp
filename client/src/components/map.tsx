import { useEffect, useRef } from "react";
import { useLocation } from "@/context/location-context";
import { useToast } from "@/hooks/use-toast";

export function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { locationData } = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!mapRef.current || !locationData) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: locationData.lat, lng: locationData.lng },
      zoom: 15,
    });

    new google.maps.Marker({
      position: { lat: locationData.lat, lng: locationData.lng },
      map,
      title: "Tu ubicación",
    });

    toast({
      title: "Mapa cargado",
      description: "Se ha cargado el mapa con tu ubicación actual",
    });
  }, [locationData, toast]);

  if (!locationData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[400px] rounded-lg overflow-hidden"
    />
  );
} 