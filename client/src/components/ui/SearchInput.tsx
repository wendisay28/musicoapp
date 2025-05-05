import { Input } from "./input";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { SearchInputProps } from '@/types/search-input';

/**
 * Componente de input de búsqueda con icono y botones opcionales
 * @component
 * @example
 * ```tsx
 * <SearchInput
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   onSearch={handleSearch}
 *   showClearButton
 *   onClear={clearSearch}
 * />
 * ```
 */
export function SearchInput({
  placeholder = "Buscar...",
  value,
  onChange,
  className,
  onSearch,
  isLoading = false,
  disabled = false,
  size = 'md',
  showClearButton = false,
  onClear
}: SearchInputProps) {
  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "pl-10 pr-10",
          sizeClasses[size],
          disabled && "opacity-50 cursor-not-allowed"
        )}
        disabled={disabled || isLoading}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      
      {isLoading ? (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
      ) : (
        <>
          {showClearButton && value && (
            <button
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {onSearch && (
            <button
              onClick={onSearch}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:underline",
                showClearButton && value && "right-10"
              )}
              disabled={disabled || isLoading}
            >
              Buscar
            </button>
          )}
        </>
      )}
    </div>
  );
} 