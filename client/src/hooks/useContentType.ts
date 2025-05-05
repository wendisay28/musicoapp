import { useState, useCallback } from 'react';

type ContentType = 'artists' | 'events' | 'places';

interface UseContentTypeProps {
  initialType?: ContentType;
  onTypeChange?: (type: ContentType) => void;
}

export function useContentType({ initialType = 'artists', onTypeChange }: UseContentTypeProps) {
  const [contentType, setContentType] = useState<ContentType>(initialType);

  const handleTypeChange = useCallback((type: ContentType) => {
    setContentType(type);
    onTypeChange?.(type);
  }, [onTypeChange]);

  return {
    contentType,
    handleTypeChange
  };
} 