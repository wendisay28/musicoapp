import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { UserCheck, Calendar } from "lucide-react";

import FavoriteArtistsTab from "@/components/favorites/FavoriteArtistsTab";
import FavoriteEventsTab from "@/components/favorites/FavoriteEventsTab";

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("artists");
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: favoriteArtists, isLoading: isLoadingArtists } = useQuery({
    queryKey: ['/api/favorites/artists'],
    enabled: !!user,
    throwOnError: false,
  });

  const { data: favoriteEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['/api/favorites/events'],
    enabled: !!user,
    throwOnError: false,
  });

  const handleRemoveFavorite = async (id: string, type: 'artist' | 'event') => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debes iniciar sesión para eliminar favoritos",
      });
      return;
    }

    try {
      await apiRequest("DELETE", `/api/favorites/${type}/${id}`, {
        userId: user.uid,
      });

      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${type}s`] });

      toast({
        title: "Favorito eliminado",
        description: `El ${type === 'artist' ? 'artista' : 'evento'} ha sido eliminado de tus favoritos`,
      });
    } catch (error) {
      console.error(`Error removing ${type}:`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Hubo un problema al eliminar el ${type === 'artist' ? 'artista' : 'evento'} de tus favoritos`,
      });
    }
  };

  const handleShareEvent = (id: string) => {
    toast({
      title: "Compartir evento",
      description: "La funcionalidad de compartir está en desarrollo"
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-2">Inicio de sesión requerido</h1>
        <p className="text-muted-foreground mb-6">Debes iniciar sesión para ver tus favoritos</p>
        <Link href="/">
          <Button>Ir al inicio</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="font-bold text-2xl">Mis Favoritos</h1>
        <p className="text-muted-foreground">Guarda artistas y eventos para acceder rápidamente</p>
      </header>

      <Tabs defaultValue="artists" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="artists" className="flex-1">
            <UserCheck className="h-4 w-4 mr-2" />
            Artistas
          </TabsTrigger>
          <TabsTrigger value="events" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Eventos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="artists">
          <FavoriteArtistsTab
            artists={favoriteArtists ?? []}
            isLoading={isLoadingArtists}
            onRemove={(id) => handleRemoveFavorite(id, 'artist')}
          />
        </TabsContent>

        <TabsContent value="events">
          <FavoriteEventsTab
            events={favoriteEvents ?? []}
            isLoading={isLoadingEvents}
            onRemove={(id) => handleRemoveFavorite(id, 'event')}
            onShare={handleShareEvent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
