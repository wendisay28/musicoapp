import { useState } from 'react';

export function useLoadingState(initialState = false) {
  const [state, setState] = useState({
    isLoading: initialState,
    error: null as Error | null,
  });

  const setLoading = (isLoading: boolean) => {
    setState((prev: { isLoading: boolean; error: Error | null }) => ({ ...prev, isLoading, error: null }));
  };

  const setError = (error: Error | null) => {
    setState((prev: { isLoading: boolean; error: Error | null }) => ({ ...prev, error, isLoading: false }));
  };

  const reset = () => {
    setState({ isLoading: false, error: null });
  };

  return {
    ...state,
    setLoading,
    setError,
    reset,
  };
}
