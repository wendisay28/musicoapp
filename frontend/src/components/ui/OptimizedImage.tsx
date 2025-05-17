import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  placeholder?: string;
  sizes?: string;
  srcSet?: string;
  onImageError?: (error: string) => void;
}

const DEFAULT_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==';

export function OptimizedImage({
  src,
  alt,
  placeholder = DEFAULT_PLACEHOLDER,
  sizes,
  srcSet,
  onImageError,
  className,
  ...props
}: OptimizedImageProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = (): void => {
    setIsLoaded(true);
  };

  const handleError = (): void => {
    const errorMessage = 'Failed to load image';
    setError(errorMessage);
    setIsLoaded(false);
    onImageError?.(errorMessage);
  };

  if (error) {
    return (
      <div 
        role="alert" 
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        aria-live="polite"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <img
      src={isLoaded ? src : placeholder}
      alt={alt}
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
      sizes={sizes}
      srcSet={srcSet}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
      {...props}
    />
  );
}
