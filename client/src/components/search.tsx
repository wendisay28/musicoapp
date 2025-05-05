import { useState } from "react";
import { useLocation } from "@/context/location-context";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const { locationData } = useLocation();
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un término de búsqueda",
        variant: "destructive",
      });
      return;
    }

    if (!locationData) {
      toast({
        title: "Error",
        description: "No se pudo obtener tu ubicación",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(
        `/api/search?term=${encodeURIComponent(
          searchTerm
        )}&lat=${locationData.lat}&lng=${locationData.lng}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en la búsqueda");
      }

      toast({
        title: "Búsqueda exitosa",
        description: `Se encontraron ${data.results.length} resultados`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error en la búsqueda",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button onClick={handleSearch}>
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
} 