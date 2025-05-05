import { useState, useCallback } from 'react';
import { useDebounce } from './use-debounce';

interface FilterState {
  [key: string]: string;
}

interface UseSearchFiltersProps {
  initialFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

export function useSearchFilters({ initialFilters = {}, onFilterChange }: UseSearchFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const debouncedFilters = useDebounce(filters, 500);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);

  const clearFilters = useCallback(() => {
    setFilters({});
    onFilterChange?.({});
  }, [onFilterChange]);

  return {
    filters,
    debouncedFilters,
    handleFilterChange,
    clearFilters
  };
} 