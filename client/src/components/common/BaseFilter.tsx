import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Opción de filtro
 */
export interface FilterOption {
  value: string;
  label: string;
}

/**
 * Rango de precios
 */
export interface PriceRange {
  min: number;
  max: number;
}

/**
 * Props para el componente BaseFilter
 * @interface BaseFilterProps
 * @property {FilterOption[]} options - Opciones del filtro
 * @property {string[]} selectedValues - Valores seleccionados
 * @property {(values: string[]) => void} onFilterChange - Callback para cambios en el filtro
 * @property {string} [className] - Clases CSS adicionales
 * @property {string} [label] - Etiqueta del filtro
 * @property {boolean} [isMulti] - Si permite selección múltiple
 * @property {PriceRange} [priceRange] - Rango de precios para filtros de precio
 * @property {boolean} [isLoading] - Estado de carga
 * @property {string} [error] - Mensaje de error
 */
interface BaseFilterProps {
  /** Etiqueta del filtro */
  label: string;
  /** Opciones disponibles */
  options: Array<{ value: string; label: string }>;
  /** Valores seleccionados */
  selectedValues: string[];
  /** Callback cuando cambia la selección */
  onFilterChange: (values: string[]) => void;
  /** Permite selección múltiple */
  isMulti?: boolean;
  /** Clases CSS personalizadas */
  className?: string;
  /** Estado de carga */
  isLoading?: boolean;
  /** Mensaje de error */
  error?: string;
}

/**
 * Componente base para filtros
 * @component
 * @example
 * ```tsx
 * <BaseFilter
 *   options={[
 *     { value: '1', label: 'Opción 1' },
 *     { value: '2', label: 'Opción 2' }
 *   ]}
 *   selectedValues={['1']}
 *   onFilterChange={(values) => console.log(values)}
 * />
 * ```
 */
export const BaseFilter: React.FC<BaseFilterProps> = ({
  label,
  options,
  selectedValues,
  onFilterChange,
  isMulti = true,
  className,
  isLoading,
  error
}) => {
  const handleOptionClick = (value: string) => {
    if (isLoading) return;

    if (isMulti) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onFilterChange(newValues);
    } else {
      onFilterChange([value]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionClick(value);
    }
  };

  // Validación de valores seleccionados
  React.useEffect(() => {
    const invalidValues = selectedValues.filter(
      value => !options.some(option => option.value === value)
    );
    if (invalidValues.length > 0) {
      console.error(`Valores seleccionados inválidos: ${invalidValues.join(', ')}`);
    }
  }, [selectedValues, options]);

  return (
    <div 
      className={cn('space-y-2', className)}
      role="group"
      aria-labelledby="filter-label"
    >
      <label id="filter-label" className="block text-sm font-medium">
        {label}
      </label>
      
      {isLoading ? (
        <div role="status">
          <span>Cargando...</span>
        </div>
      ) : error ? (
        <div role="alert" className="text-red-500">
          {error}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              className={cn(
                'px-3 py-1 rounded-full text-sm',
                selectedValues.includes(option.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              )}
              role="checkbox"
              aria-checked={selectedValues.includes(option.value)}
              tabIndex={0}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 