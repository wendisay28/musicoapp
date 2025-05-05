import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { OffersList } from "./components/lists/OffersList";
import { StatusBadge } from "./components/badges/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { RequestOffer } from "@/types/real-time-offers";
import { useToast } from '@/hooks/use-toast';

export default function RequestPage() {
  const params = useParams();
  const requestId = params?.requestId;

  const { data: request, isLoading } = useQuery<RequestOffer>({
    queryKey: ['request', requestId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/requests/${requestId}`);
      return response.json();
    },
    enabled: !!requestId,
  });

  const { toast } = useToast();

  const handleContactOffer = async (offerId: string) => {
    try {
      // Lógica para contactar oferta
      toast({
        title: "Oferta contactada",
        description: "Se ha enviado la solicitud de contacto",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo contactar la oferta",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-3/4 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Solicitud no encontrada</h1>
        <p className="text-muted-foreground">
          No pudimos encontrar la solicitud que estás buscando
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{request.title}</h1>
          <StatusBadge status={request.status} />
        </div>
        <p className="text-muted-foreground mb-4">{request.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Ubicación</p>
            <p>{request.location}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fecha</p>
            <p>{new Date(request.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Hora</p>
            <p>{request.time}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Presupuesto</p>
            <p>
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(request.budget)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Propuestas</h2>
        <OffersList
          offers={request.responses}
          onContact={(offerId) => {
            handleContactOffer(offerId);
          }}
        />
      </div>
    </div>
  );
}