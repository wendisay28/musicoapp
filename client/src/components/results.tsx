import { useState, useEffect } from "react";
import { useLocation } from "@/context/location-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Result {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
}

export function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { locationData } = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      if (!locationData) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/nearby?lat=${locationData.lat}&lng=${locationData.lng}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error al obtener resultados");
        }

        setResults(data.results);
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Error al obtener resultados",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [locationData, toast]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No se encontraron resultados</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <CardTitle>{result.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">{result.address}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {result.distance.toFixed(1)} km
              </span>
              <span className="text-sm font-medium">
                {result.rating.toFixed(1)} ★
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 