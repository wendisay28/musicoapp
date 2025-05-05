import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Search, X } from 'lucide-react';
import { FilterProps } from '@/types/filters';
import { useFilters } from '@/hooks/useFilters';

/**
 * Componente de filtros para búsqueda y filtrado avanzado
 * @component
 * @example
 * ```tsx
 * <Filters
 *   onFilterChange={(filters) => console.log(filters)}
 *   initialFilters={{ category: 'pintura' }}
 * />
 * ```
 */
export function Filters({
  onFilterChange,
  initialFilters = {},
  searchPlaceholder = "Buscar...",
  showAdvancedFilters = true
}: FilterProps) {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    handleSearch,
    clearFilters
  } = useFilters({ initialFilters, onFilterChange });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Categoría</label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pintura">Pintura</SelectItem>
                <SelectItem value="escultura">Escultura</SelectItem>
                <SelectItem value="fotografia">Fotografía</SelectItem>
                <SelectItem value="digital">Arte Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Distancia: {filters.distance} km
            </label>
            <Slider
              value={[filters.distance]}
              onValueChange={(value) => handleFilterChange('distance', value[0])}
              max={100}
              step={1}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Calificación mínima: {filters.rating}
            </label>
            <Slider
              value={[filters.rating]}
              onValueChange={(value) => handleFilterChange('rating', value[0])}
              max={5}
              step={0.5}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Rango de precios
            </label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value as [number, number])}
              max={1000}
              step={10}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={filters.isAvailable}
              onCheckedChange={(checked) => handleFilterChange('isAvailable', checked)}
            />
            <label className="text-sm font-medium">
              Disponible ahora
            </label>
          </div>
        </div>
      )}
    </div>
  );
} 