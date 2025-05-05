// 📄 ExplorerHeader.tsx
// Encabezado del explorador con título y botón de filtros

import { SlidersHorizontal } from "lucide-react";
import SearchFilters from "@/components/search-filters";
import { Button } from "@/components/ui/button";

interface Props {
  activeTab: "artists" | "events";
  onApplyFilters: () => void;
}

export default function ExplorerHeader({
  activeTab,
  onApplyFilters,
}: Props) {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="font-bold text-2xl">Explorar</h1>
      <SearchFilters
        onApplyFilters={onApplyFilters}
        filterType={activeTab}
        triggerButton={
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        }
      />
    </header>
  );
}
