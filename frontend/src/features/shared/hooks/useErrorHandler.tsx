import React from 'react';
import { useCallback } from 'react';
import { toast } from '@/features/ui/components/use-toast';
import { AppError } from '@/lib/error-handler';
export const useErrorHandler: React.FC = (options = {}) => {
    const { showToast = true, logToConsole = true, logToSentry = true } = options;
    const handleError = useCallback((error, context) => {
        const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error inesperado';
        const errorTitle = error instanceof AppError ? error.code : 'Error';
        if (showToast) {
            toast({
                variant: 'destructive',
                title: errorTitle,
                description: errorMessage,
            });
        }
        if (logToConsole) {
            console.error(context ? `[${context}] ${errorMessage}` : errorMessage, error);
        }
        if (logToSentry && error instanceof Error) {
            Sentry.captureException(error, {
                extra: { context }
            });
        }
        return error;
    }, [showToast, logToConsole, logToSentry]);
    return { handleError };
};
