import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface ErrorHandlerOptions {
  showToast?: boolean;
  toastTitle?: string;
  toastDescription?: string;
  onError?: (error: Error) => void;
}

export interface ErrorHandlerResult {
  handleError: (error: unknown) => void;
  isError: boolean;
  error: Error | null;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}): ErrorHandlerResult {
  const {
    showToast = true,
    toastTitle = 'Error',
    toastDescription = 'Ha ocurrido un error inesperado',
    onError,
  } = options;

  const handleError = useCallback((error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    if (showToast) {
      toast({
        title: toastTitle,
        description: errorMessage || toastDescription,
        variant: 'destructive',
      });
    }

    if (onError && error instanceof Error) {
      onError(error);
    }

    console.error('Error:', error);
  }, [showToast, toastTitle, toastDescription, onError]);

  return {
    handleError,
    isError: false,
    error: null,
  };
}