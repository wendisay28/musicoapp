import React, { useState, useCallback, useEffect } from 'react';
import { useDebounce } from  '@/features/shared/hooks/ui/useDebounce';

type Props = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar artistas, eventos, lugares..."
        className="w-full px-4 py-2 pl-10 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-primary"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};
