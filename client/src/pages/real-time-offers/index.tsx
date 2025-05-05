import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RequestCard } from "./components/RequestCard";
import { useServiceRequests } from "@/hooks/useRealTimeOffers";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function RealTimeOffersPage() {
  const { user } = useAuth();
  const { data: requests = [], isLoading } = useServiceRequests(user?.uid);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Ofertas en Tiempo Real</h1>
          <p className="text-muted-foreground">
            Contrata artistas para tus eventos al mejor precio
          </p>
        </div>
        <Button asChild>
          <Link href="/real-time-offers/new">Nueva Solicitud</Link>
        </Button>
      </div>

      <Tabs defaultValue="my-requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-requests">Mis Solicitudes</TabsTrigger>
          <TabsTrigger value="available">Solicitudes Disponibles</TabsTrigger>
        </TabsList>

        <TabsContent value="my-requests">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <RequestCardSkeleton key={i} />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6">
              {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available">
          <AvailableRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 border rounded-lg">
      <h3 className="text-xl font-semibold mb-2">No tienes solicitudes</h3>
      <p className="text-muted-foreground mb-6">
        Crea tu primera solicitud para recibir ofertas de artistas
      </p>
      <Button asChild>
        <Link href="/real-time-offers/new">Crear Solicitud</Link>
      </Button>
    </div>
  );
}

function AvailableRequests() {
  return (
    <div className="text-center py-16">
      <h3 className="text-xl font-semibold mb-2">Explora Solicitudes</h3>
      <p className="text-muted-foreground">
        Próximamente podrás ver solicitudes de clientes cerca de ti
      </p>
    </div>
  );
}

function RequestCardSkeleton() {
  return (
    <div className="border rounded-lg p-5 space-y-4">
      <div className="flex justify-between">
        <div className="h-6 w-1/2 bg-muted rounded" />
        <div className="h-5 w-16 bg-muted rounded" />
      </div>
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-3/4 bg-muted rounded" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}