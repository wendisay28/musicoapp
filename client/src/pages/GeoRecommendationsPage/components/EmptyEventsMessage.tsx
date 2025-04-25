import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "wouter";

export default function EmptyEventsMessage() {
  return (
    <div className="py-12 text-center">
      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-medium mb-2">Próximamente: Eventos Geolocalizados</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Estamos trabajando para mostrarte eventos cercanos basados en tu ubicación actual.
      </p>
      <Button variant="outline" asChild>
        <Link href="/search?type=events">Ver todos los eventos</Link>
      </Button>
    </div>
  );
}
