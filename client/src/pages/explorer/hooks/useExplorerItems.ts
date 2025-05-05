// 📄 useExplorerItems.ts
// Hook que obtiene los artistas o eventos a mostrar en el explorador

import { useState, useEffect } from "react";

type TabType = "artists" | "events" | "places" | "recommendations";

export function useExplorerItems(tab: TabType, locationData: any) {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        let endpoint = "";
        switch (tab) {
          case "artists":
            endpoint = "/api/artists";
            break;
          case "events":
            endpoint = "/api/events";
            break;
          case "places":
            endpoint = "/api/places";
            break;
          case "recommendations":
            endpoint = "/api/recommendations";
            break;
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lat: locationData?.lat,
            lng: locationData?.lng,
          }),
        });

        if (!response.ok) throw new Error("Error fetching items");

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (locationData) {
      fetchItems();
    }
  }, [tab, locationData]);

  return { items, isLoading, refetch: () => {} };
}
