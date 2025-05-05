import { Clock, MapPin, DollarSign, Calendar, MessageCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequestOffer } from "@/types/real-time-offers";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Response {
  id: number;
  artistId: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  artistName: string;
  artistPhoto: string;
  artistRating: number;
}

interface RequestOfferExtended extends RequestOffer {
  status: "active" | "completed" | "cancelled";
  location: string;
  date: string;
  time: string;
  price: number;
  tags?: string[];
  responses: Response[];
}

interface RequestCardProps {
  request: RequestOfferExtended;
  variant?: "default" | "compact";
  onViewDetails?: () => void;
  onContact?: () => void;
}

export function RequestCard({
  request,
  variant = "default",
  onViewDetails,
  onContact
}: RequestCardProps) {
  const statusVariant = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  } as const;

  const statusText = {
    active: "Activa",
    completed: "Completada",
    cancelled: "Cancelada"
  } as const;

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
          {statusText[request.status]}
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
          {request.tags && request.tags.length > 0 && (
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
              {onViewDetails && (
                <Button variant="link" onClick={onViewDetails}>
                  Ver todas
                </Button>
              )}
            </div>

            {request.responses.length > 0 ? (
              <div className="space-y-3">
                {request.responses.slice(0, 2).map((response) => (
                  <div key={response.id} className="border rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={response.artistPhoto} 
                          alt={response.artistName}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{response.artistName}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            <span className="text-sm text-muted-foreground">
                              {response.artistRating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                        }).format(response.price)}
                      </Badge>
                    </div>
                    {onContact && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={onContact}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contactar
                      </Button>
                    )}
                  </div>
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

      {variant === "compact" && (
        <div className="mt-3 text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(request.date), { 
            addSuffix: true,
            locale: es 
          })}
        </div>
      )}
    </div>
  );
}