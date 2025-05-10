import { useState, useCallback } from 'react';
import { SearchFilters } from '@/types/common';

const defaultFilters: SearchFilters = {
  query: '',
  category: undefined,
  location: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
  availability: [],
  skills: [],
  services: [],
};

export function useSearchFilters(initialFilters: Partial<SearchFilters> = {}) {
  const [filters, setFilters] = useState<SearchFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const hasActiveFilters = useCallback(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== defaultFilters[key as keyof SearchFilters];
    });
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
} 