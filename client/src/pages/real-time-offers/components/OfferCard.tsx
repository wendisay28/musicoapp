import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, CheckCircle, XCircle } from "lucide-react";
import { Artist } from "@/types/real-time-offers";
import { cn } from "@/lib/utils";

export function OfferCard({
  offer,
  compact = false,
  onAccept,
  onReject,
  isProcessing,
}: {
  offer: Artist;
  compact?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  isProcessing?: boolean;
}) {
  const statusVariant = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className={cn(
      "border rounded-lg p-4",
      compact ? "" : "hover:shadow-md transition-shadow"
    )}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={offer.userPhoto} />
            <AvatarFallback>{offer.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{offer.userName}</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex items-center mr-3">
                <Star className="h-3 w-3 mr-1 text-amber-500 fill-amber-500" />
                <span>{offer.rating}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{offer.distance} km</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-semibold text-primary">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            }).format(offer.price)}
          </div>
          {offer.status !== 'pending' && (
            <Badge className={cn("mt-1", statusVariant[offer.status])}>
              {offer.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
            </Badge>
          )}
        </div>
      </div>

      <p className={cn("text-muted-foreground mb-4", compact ? "text-sm" : "")}>
        {offer.description}
      </p>

      {!compact && offer.specialties && (
        <div className="flex flex-wrap gap-2 mb-4">
          {offer.specialties.map(specialty => (
            <Badge key={specialty} variant="secondary">{specialty}</Badge>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {new Date(offer.timestamp).toLocaleTimeString("es-ES", {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>

        {offer.status === 'pending' && onAccept && onReject && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-destructive border-destructive hover:bg-destructive/10"
              onClick={onReject}
              disabled={isProcessing}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Rechazar
            </Button>
            <Button
              size="sm"
              onClick={onAccept}
              disabled={isProcessing}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Aceptar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}