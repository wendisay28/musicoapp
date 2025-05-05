export interface FilterValues {
  search: string;
  category: string;
  distance: number;
  rating: number;
  priceRange: [number, number];
  isAvailable: boolean;
}

export type FilterKey = keyof FilterValues;

export interface FilterProps {
  /** Callback cuando cambian los filtros */
  onFilterChange: (filters: FilterValues) => void;
  /** Valores iniciales de los filtros */
  initialFilters?: Partial<FilterValues>;
  /** Placeholder para el campo de búsqueda */
  searchPlaceholder?: string;
  /** Mostrar filtros avanzados */
  showAdvancedFilters?: boolean;
}

export const DEFAULT_FILTERS: FilterValues = {
  search: '',
  category: '',
  distance: 10,
  rating: 0,
  priceRange: [0, 1000],
  isAvailable: false
}; 