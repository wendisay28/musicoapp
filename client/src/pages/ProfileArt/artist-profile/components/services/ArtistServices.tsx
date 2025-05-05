/**
 * Vista completa de todos los servicios del artista
 * Muestra la lista completa de servicios con opción de contacto
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Service } from "../common/types/artist";

interface ArtistServicesProps {
  services?: Service[];
  onContact: () => void;
}

export const ArtistServices = ({ services, onContact }: ArtistServicesProps) => {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-4">Todos los Servicios</h2>
      <div className="space-y-3">
        {services?.length ? (
          services.map(service => (
            <Card key={service.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{service.name}</h3>
                  <span className="text-primary font-medium">
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                    }).format(service.price)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">{service.description}</p>
                <div className="mt-4 flex justify-end">
                  <Button onClick={onContact}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contactar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Este artista aún no ha agregado servicios</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};