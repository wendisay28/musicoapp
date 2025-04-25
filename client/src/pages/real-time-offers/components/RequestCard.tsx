import { Clock, MapPin, DollarSign, Calendar, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequestOffer } from "@/types/real-time-offers";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function RequestCard({
  request,
  variant = "default",
}: {
  request: RequestOffer;
  variant?: "default" | "compact";
}) {
  const statusVariant = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden transition-all hover:shadow-md",
        variant === "compact" ? "p-3" : "p-5"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">{request.title}</h3>
        <Badge className={statusVariant[request.status]}>
          {request.status === "active"
            ? "Activa"
            : request.status === "completed"
            ? "Completada"
            : "Cancelada"}
        </Badge>
      </div>

      <p className={cn("text-muted-foreground", variant === "compact" ? "text-sm" : "mb-4")}>
        {request.description}
      </p>

      <div className={cn("grid gap-2", variant === "compact" ? "grid-cols-2 text-sm" : "grid-cols-2 md:grid-cols-4")}>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{request.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {new Date(request.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{request.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span>
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            }).format(request.price)}
          </span>
        </div>
      </div>

      {variant !== "compact" && (
        <>
          {request.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {request.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Propuestas ({request.responses.length})</h4>
              <Button variant="link" asChild>
                <Link href={`/real-time-offers/${request.id}`}>Ver todas</Link>
              </Button>
            </div>

            {request.responses.length > 0 ? (
              <div className="space-y-3">
                {request.responses.slice(0, 2).map((response) => (
                  <OfferCard key={response.id} offer={response} compact />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Aún no hay propuestas para esta solicitud
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}