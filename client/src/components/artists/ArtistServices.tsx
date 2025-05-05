import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ArtistService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

interface ArtistServicesProps {
  services: ArtistService[];
  isEditable?: boolean;
  onEdit?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
}

export const ArtistServices: React.FC<ArtistServicesProps> = ({
  services,
  isEditable = false,
  onEdit,
  onDelete
}) => {
  const { toast } = useToast();

  const handleEdit = (serviceId: string) => {
    if (onEdit) {
      onEdit(serviceId);
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (onDelete) {
      try {
        await onDelete(serviceId);
        toast({
          title: "Servicio eliminado",
          description: "El servicio ha sido eliminado correctamente",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el servicio",
          variant: "destructive",
        });
      }
    }
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay servicios disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id} role="listitem">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{service.title}</CardTitle>
              {isEditable && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(service.id)}
                    aria-label="Editar servicio"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                    aria-label="Eliminar servicio"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {service.price.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </span>
                <span className="text-sm text-gray-500">{service.duration}</span>
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                  {service.category}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}; 