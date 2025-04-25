// client/src/pages/search/components/SearchResults.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface SearchResultsProps {
  isLoading: boolean;
  data: any[];
  debouncedSearchTerm: string;
  renderCard: (item: any) => JSX.Element;
}

const SearchResults = ({ isLoading, data, debouncedSearchTerm, renderCard }: SearchResultsProps) => {
  return (
    <div className="mt-4">
      {isLoading ? (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map(renderCard)}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            {debouncedSearchTerm ? (
              <>
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-semibold text-xl mb-2">No se encontraron resultados</h3>
                <p className="text-muted-foreground">
                  No hay resultados para "{debouncedSearchTerm}"
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">🎤</div>
                <h3 className="font-semibold text-xl mb-2">Busca algo</h3>
                <p className="text-muted-foreground">
                  Escribe en la barra de búsqueda para encontrar lo que buscas
                </p>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchResults;
