// 📄 ExplorerCards.tsx
// Sección que muestra las tarjetas swipeables de artistas o eventos

import SwipeableCard from "@/components/swipeable-card";
import { Card, CardContent } from "@/components/ui/card";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  items: any[];
  currentIndex: number;
  isLoading: boolean;
  onLike: (id: string | number) => void;
  onDislike: () => void;
  onRefetch: () => void;
  activeTab: "artists" | "events";
  setCurrentIndex: (i: number) => void;
}

export default function ExplorerCards({
  items,
  currentIndex,
  isLoading,
  onLike,
  onDislike,
  onRefetch,
  activeTab,
}: Props) {
  return (
    <div className="relative h-[calc(100vh-13rem)] max-h-[700px] mx-auto max-w-md mt-4">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4 mx-auto"></div>
            <p>Cargando {activeTab === "artists" ? "artistas" : "eventos"}...</p>
          </div>
        </div>
      ) : items.length > 0 ? (
        <div className="relative w-full h-full">
          {items.map((item, idx) => (
            idx >= currentIndex && (
              <SwipeableCard
                key={item.id}
                id={item.id}
                imageUrl={item.photoURL || item.image}
                name={item.displayName || item.name}
                role={item.role || item.category}
                location={item.location}
                distance={item.distance}
                priceRange={`${new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                }).format(item.minPrice || item.price)} / ${item.priceUnit || "hora"}`}
                onLike={onLike}
                onDislike={onDislike}
                isLast={idx === items.length - 1}
                onViewProfile={() => window.location.href = `/artists/${item.id}`}
              />
            )
          ))}
        </div>
      ) : (
        <Card className="absolute inset-0 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-6">
          <Smile className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-xl mb-2">
            No hay más perfiles por mostrar
          </h3>
          <p className="text-muted-foreground mb-6">
            Intenta ajustar los filtros o vuelve más tarde
          </p>
          <Button onClick={() => onRefetch()}>
            Actualizar resultados
          </Button>
        </Card>
      )}
    </div>
  );
}
