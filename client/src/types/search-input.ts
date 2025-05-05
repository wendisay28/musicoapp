export interface SearchInputProps {
  /** Placeholder del input */
  placeholder?: string;
  /** Valor del input */
  value: string;
  /** Callback cuando cambia el valor */
  onChange: (value: string) => void;
  /** Clases CSS personalizadas */
  className?: string;
  /** Callback cuando se hace clic en buscar */
  onSearch?: () => void;
  /** Estado de carga */
  isLoading?: boolean;
  /** Deshabilitar el input */
  disabled?: boolean;
  /** Tamaño del input */
  size?: 'sm' | 'md' | 'lg';
  /** Mostrar botón de limpiar */
  showClearButton?: boolean;
  /** Callback cuando se hace clic en limpiar */
  onClear?: () => void;
} 