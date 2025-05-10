import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/features/shared/components/ui/input';
import { Button } from '@/features/shared/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCallback, useState, useEffect } from 'react';
import { useDebounce } from '@/features/shared/hooks/useDebounce';
/**
 * Componente de búsqueda con debounce y botón de limpiar
 *
 * @example
 * ```tsx
 * // Búsqueda simple
 * <SearchInput
 *   placeholder="Buscar artistas..."
 *   onChange={handleSearch}
 * />
 *
 * // Con valor inicial y debounce
 * <SearchInput
 *   initialValue="tatuaje"
 *   debounceTime={500}
 *   onChange={handleSearch}
 *   onClear={handleClear}
 * />
 * ```
 */
export function SearchInput (props: any){ initialValue = '', placeholder = 'Buscar...', onChange, onClear, debounceTime = 300, className }) {
    const [value, setValue] = useState(initialValue);
    const debouncedValue = useDebounce(value, debounceTime);
    const handleChange = useCallback((e) => {
        const newValue = e.target.value;
        setValue(newValue);
    }, []);
    useEffect(() => {
        onChange?.(debouncedValue);
    }, [debouncedValue, onChange]);
    const handleClear = useCallback(() => {
        setValue('');
        onClear?.();
    }, [onClear]);
    return (_jsxs("div", { className: cn('relative', className), children: [_jsx(Input, { type: "search", value: value, onChange: handleChange, placeholder: placeholder, className: "pr-10" }), _jsxs("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1", children: [value && (_jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", onClick: handleClear, children: _jsx(X, { className: "h-4 w-4" }) })), _jsx(Search, { className: "h-4 w-4 text-muted-foreground" })] })] }));
}
