// 📄 useExplorerItems.ts
// Hook que obtiene los artistas o eventos a mostrar en el explorador

import { useQuery } from "@tanstack/react-query";

export const useExplorerItems = (
  activeTab: "artists" | "events",
  locationData: any
) => {
  const { data: items = [], isLoading, refetch } = useQuery({
    queryKey: [
      activeTab === "artists" ? "/api/artists/explore" : "/api/events/explore",
      locationData?.coordinates?.latitude,
      locationData?.coordinates?.longitude,
    ],
    enabled: !!locationData?.coordinates,
  });

  return { items, isLoading, refetch };
};
