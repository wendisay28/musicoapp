/**
 * Vista previa de servicios del artista
 * Muestra los primeros 2 servicios con opción a ver todos
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "../common/types/artist";

interface ArtistServicesPreviewProps {
  services?: Service[];
  onViewAll: () => void;
}

export const ArtistServicesPreview = ({ services, onViewAll }: ArtistServicesPreviewProps) => {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-2">Servicios y Tarifas</h2>
      <div className="space-y-3">
        {services?.slice(0, 2).map(service => (
          <Card key={service.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
              <span className="text-primary font-medium">
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(service.price)}
              </span>
            </CardContent>
          </Card>
        ))}
        
        {services && services.length > 2 ? (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onViewAll}
          >
            Ver todos los servicios ({services.length})
          </Button>
        ) : !services?.length && (
          <p className="text-muted-foreground text-sm">No se han encontrado servicios.</p>
        )}
      </div>
    </div>
  );
};