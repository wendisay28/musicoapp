import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";

interface Favorite {
  id: string;
  name: string;
  address: string;
  rating: number;
}

export function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const { toast } = useToast();

  const handleRemove = (id: string) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
    toast({
      title: "Eliminado",
      description: "El lugar ha sido eliminado de tus favoritos",
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tienes lugares favoritos</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((favorite) => (
        <Card key={favorite.id}>
          <CardHeader>
            <CardTitle>{favorite.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{favorite.address}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{favorite.rating}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(favorite.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 