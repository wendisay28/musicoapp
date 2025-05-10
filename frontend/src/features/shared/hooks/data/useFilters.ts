import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '../ui/useDebounce';

export interface Filters {
  search?: string;
  category?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export function useFilters(initialFilters: Filters = {}) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>(initialFilters);

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    setDebouncedFilters(prev => ({
      ...prev,
      search: debouncedSearch
    }));
  }, [debouncedSearch]);

  const updateFilter = useCallback((key: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setDebouncedFilters(initialFilters);
  }, [initialFilters]);

  return {
    filters,
    debouncedFilters,
    updateFilter,
    clearFilters
  };
}