import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

interface LocationContextType {
  locationData: LocationData | null;
  loading: boolean;
  error: string | null;
  updateLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        throw new Error("Geolocalización no soportada");
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      setLocationData({
        lat: latitude,
        lng: longitude,
        address: data.display_name,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al obtener la ubicación");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        locationData,
        loading,
        error,
        updateLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation debe ser usado dentro de un LocationProvider");
  }
  return context;
}
