/**
 * Componente base para mapas que permite seleccionar ubicaciones y mostrar marcadores
 * @component
 * @example
 * ```tsx
 * <BaseMap
 *   isOpen={true}
 *   onClose={() => {}}
 *   markers={[
 *     {
 *       id: "1",
 *       type: "place",
 *       position: { lat: 4.6097, lng: -74.0817 },
 *       title: "Lugar de interés"
 *     }
 *   ]}
 *   onMarkerClick={(marker) => console.log(marker)}
 *   onLocationSelect={(location) => console.log(location)}
 * />
 * ```
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/**
 * Props para el componente BaseMap
 * @interface BaseMapProps
 * @property {boolean} isOpen - Controla si el modal está abierto
 * @property {() => void} onClose - Callback para cerrar el modal
 * @property {string} [title] - Título del modal
 * @property {string} [description] - Descripción del modal
 * @property {Marker[]} [markers] - Marcadores a mostrar en el mapa
 * @property {(marker: Marker) => void} [onMarkerClick] - Callback para clics en marcadores
 * @property {(location: { lat: number; lng: number; address: string }) => void} [onLocationSelect] - Callback para selección de ubicación
 * @property {string} [searchPlaceholder] - Placeholder para el campo de búsqueda
 */
interface BaseMapProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  searchPlaceholder?: string;
}

export function BaseMap({
  isOpen,
  onClose,
  title = "Seleccionar Ubicación",
  description = "Busca y selecciona una ubicación en el mapa",
  onLocationSelect,
  searchPlaceholder = "Buscar ubicación..."
}: BaseMapProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  // Aquí iría la lógica del mapa (Google Maps, Mapbox, etc.)
  // Por ahora es un placeholder

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        
        <div className="space-y-4">
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="h-[400px] bg-muted rounded-lg">
            {/* Aquí iría el componente del mapa */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">Mapa aquí</p>
            </div>
          </div>

          {selectedLocation && (
            <Card className="p-4">
              <h4 className="font-medium">Ubicación seleccionada:</h4>
              <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
            </Card>
          )}

          <Separator />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={() => selectedLocation && onLocationSelect?.(selectedLocation)}
              disabled={!selectedLocation}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
