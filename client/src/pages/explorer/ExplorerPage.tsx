// 📄 ExplorerPage.tsx
// Página principal del explorador con swipe tipo Tinder para artistas y eventos

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/context/location-context";
import ExplorerHeader from "./components/ExplorerHeader";
import ExplorerCards from "./components/ExplorerCards";
import { useExplorerItems } from "./hooks/useExplorerItems";

interface ExplorerItem {
  id: string | number;
  photoURL?: string;
  image?: string;
  displayName?: string;
  name?: string;
  role?: string;
  category?: string;
  location: string;
  distance?: number;
  minPrice?: number;
  price?: number;
  priceUnit?: string;
}

export default function ExplorerPage() {
  const [activeTab] = useState<"artists" | "events">("artists");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { locationData } = useLocation();
  const { toast } = useToast();

  const { items = [], isLoading, refetch } = useExplorerItems(activeTab, locationData);

  const handleLike = async (id: string | number) => {
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab === "artists" ? "artist" : "event",
          itemId: id,
        }),
      });

      toast({
        title: "¡Guardado!",
        description: `${activeTab === "artists" ? "Artista" : "Evento"} añadido a favoritos`,
      });

      goToNextItem();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar en favoritos",
      });
    }
  };

  const handleDislike = () => {
    goToNextItem();
  };

  const goToNextItem = () => {
    if (items.length > 0 && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleApplyFilters = () => {
    refetch();
    toast({
      title: "Filtros aplicados",
      description: "Los resultados han sido actualizados",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ExplorerHeader
        activeTab={activeTab}
        onApplyFilters={handleApplyFilters}
      />
      <ExplorerCards
        items={items as ExplorerItem[]}
        currentIndex={currentIndex}
        isLoading={isLoading}
        onLike={handleLike}
        onDislike={handleDislike}
        onRefetch={refetch}
        activeTab={activeTab}
      />
    </div>
  );
}
