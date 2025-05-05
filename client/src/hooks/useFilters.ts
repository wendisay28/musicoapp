import { useState, useCallback } from 'react';
import { FilterValues, FilterKey, DEFAULT_FILTERS } from '@/types/filters';
import { useDebounce } from './use-debounce';

interface UseFiltersProps {
  initialFilters?: Partial<FilterValues>;
  onFilterChange: (filters: FilterValues) => void;
}

export const useFilters = ({ initialFilters = {}, onFilterChange }: UseFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');
  const [filters, setFilters] = useState<FilterValues>({
    ...DEFAULT_FILTERS,
    ...initialFilters
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleFilterChange = useCallback((key: FilterKey, value: FilterValues[FilterKey]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  }, [filters, onFilterChange]);

  const handleSearch = useCallback(() => {
    handleFilterChange('search', debouncedSearchTerm);
  }, [debouncedSearchTerm, handleFilterChange]);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSearchTerm('');
    onFilterChange(DEFAULT_FILTERS);
  }, [onFilterChange]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    handleSearch,
    clearFilters
  };
}; 