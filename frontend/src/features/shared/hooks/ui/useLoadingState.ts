import { useState, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  error: Error | null;
}

export function useLoadingState(initialState = false) {
  const [state, setState] = useState<LoadingState>({
    isLoading: initialState,
    error: null,
  });

  const startLoading = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
  }, []);

  const stopLoading = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: false }));
  }, []);

  const setError = useCallback((error: Error) => {
    setState(prev => ({ ...prev, isLoading: false, error }));
  }, []);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null });
  }, []);

  const withLoading = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    try {
      startLoading();
      const result = await promise;
      return result;
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, setError]);

  return {
    ...state,
    startLoading,
    stopLoading,
    setError,
    reset,
    withLoading
  };
}