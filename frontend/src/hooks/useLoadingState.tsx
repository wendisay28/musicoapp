import React from 'react';
import { useState } from 'react';
export function useLoadingState (props: any)initialState = false) {
    const [state, setState] = useState({
        isLoading: initialState,
        error: null,
    });
    const setLoading: React.FC = (isLoading) => {
        setState((prev) => ({ ...prev, isLoading, error: null }));
    };
    const setError: React.FC = (error) => {
        setState((prev) => ({ ...prev, error, isLoading: false }));
    };
    const reset: React.FC = () => {
        setState({ isLoading: false, error: null });
    };
    return {
        ...state,
        setLoading,
        setError,
        reset,
    };
}
