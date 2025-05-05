import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, DollarSign, Calendar, MessageCircle, Star } from "lucide-react";
import { Artist } from "@/types/real-time-offers";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Offer {
  id: number;
  artistId: string;
  artistName: string;
  artistPhoto: string;
  artistRating: number;
  price: number;
  description: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface OfferCardProps {
  offer: Offer;
  variant?: "default" | "compact";
  onContact?: () => void;
}

export function OfferCard({
  offer,
  variant = "default",
  onContact
}: OfferCardProps) {
  const statusVariant = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  } as const;

  const statusText = {
    pending: "Pendiente",
    accepted: "Aceptada",
    rejected: "Rechazada"
  } as const;

  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden transition-all hover:shadow-md",
        variant === "compact" ? "p-3" : "p-5"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <img 
            src={offer.artistPhoto} 
            alt={offer.artistName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{offer.artistName}</h3>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span className="text-sm text-muted-foreground">
                {offer.artistRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <Badge className={statusVariant[offer.status]}>
          {statusText[offer.status]}
        </Badge>
      </div>

      <p className={cn("text-muted-foreground", variant === "compact" ? "text-sm" : "mb-4")}>
        {offer.description}
      </p>

      <div className="flex items-center justify-between">
        <Badge variant="outline">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(offer.price)}
        </Badge>
        
        {onContact && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onContact}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Contactar
          </Button>
        )}
      </div>

      {variant === "compact" && (
        <div className="mt-3 text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(offer.createdAt), { 
            addSuffix: true,
            locale: es 
          })}
        </div>
      )}
    </div>
  );
}