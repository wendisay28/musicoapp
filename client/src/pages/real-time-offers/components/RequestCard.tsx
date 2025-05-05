import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./badges/StatusBadge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RequestOffer } from "@/types/real-time-offers";

interface RequestCardProps {
  request: RequestOffer;
}

export function RequestCard({ request }: RequestCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{request.title}</CardTitle>
        <StatusBadge status={request.status} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{request.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Ubicación</p>
            <p className="text-sm">{request.location}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Presupuesto</p>
            <p className="text-sm">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(request.budget)}
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/real-time-offers/${request.id}`}>Ver detalles</Link>
        </Button>
      </CardContent>
    </Card>
  );
} 