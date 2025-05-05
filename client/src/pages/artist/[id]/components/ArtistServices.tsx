import { ArtistServicesProps } from "../../../../types/artist/index.ts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card.tsx";

export function ArtistServices({ services, onContact }: ArtistServicesProps) {
  return (
    <div className="grid gap-4">
      {services.map(service => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{service.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-medium">
                ${service.price} {service.duration ? `por ${service.duration}` : ''}
              </span>
              {onContact && (
                <button
                  onClick={onContact}
                  className="text-primary hover:underline"
                >
                  Contactar
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 