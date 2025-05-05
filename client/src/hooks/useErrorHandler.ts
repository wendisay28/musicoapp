import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { isApiError, isValidationError } from '@/types/errors';

/**
 * Hook para manejar errores de forma consistente
 * @returns Objeto con la función para manejar errores
 * @example
 * ```tsx
 * const { handleError } = useErrorHandler();
 * 
 * try {
 *   await someAsyncOperation();
 * } catch (error) {
 *   handleError(error);
 * }
 * ```
 */
export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    if (isApiError(error)) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } else if (isValidationError(error)) {
      toast({
        variant: 'destructive',
        title: 'Error de validación',
        description: `${error.field}: ${error.message}`,
      });
    } else if (error instanceof Error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ha ocurrido un error inesperado',
      });
    }
  }, []);

  return { handleError };
}; 