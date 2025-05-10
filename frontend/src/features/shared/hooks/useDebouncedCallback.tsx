import React from 'react';
import { useCallback, useRef } from 'react';
export const useDebouncedCallback: React.FC = (callback, delay) => {
    const timeoutRef = useRef();
    return useCallback((...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
};
