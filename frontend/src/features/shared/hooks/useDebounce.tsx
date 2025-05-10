import React from 'react';
import { useEffect, useState } from 'react';
/**
 * Hook para debounce de valores
 *
 * @param value Valor a debouncear
 * @param delay Tiempo de espera en ms
 * @returns Valor debounceado
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('');
 * const debouncedValue = useDebounce(value, 300);
 *
 * useEffect(() => {
 *   // Este efecto se ejecutará 300ms después del último cambio
 *   console.log('Valor debounceado:', debouncedValue);
 * }, [debouncedValue]);
 * ```
 */
export function useDebounce (props: any)value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debouncedValue;
}
