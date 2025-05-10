import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '@/lib/utils';
/**
 * Componente base para filtros
 * @component
 * @example
 * ```tsx
 * <BaseFilter
 *   options={[
 *     { value: '1', label: 'Opción 1' },
 *     { value: '2', label: 'Opción 2' }
 *   ]}
 *   selectedValues={['1']}
 *   onFilterChange={(values) => console.log(values)}
 * />
 * ```
 */
export const BaseFilter: React.FC = ({ label, options, selectedValues, onFilterChange, isMulti = true, className, isLoading, error }) => {
    const handleOptionClick: React.FC = (value) => {
        if (isLoading)
            return;
        if (isMulti) {
            const newValues = selectedValues.includes(value)
                ? selectedValues.filter(v => v !== value)
                : [...selectedValues, value];
            onFilterChange(newValues);
        }
        else {
            onFilterChange([value]);
        }
    };
    const handleKeyDown: React.FC = (e, value) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOptionClick(value);
        }
    };
    // Validación de valores seleccionados
    React.useEffect(() => {
        const invalidValues = selectedValues.filter(value => !options.some(option => option.value === value));
        if (invalidValues.length > 0) {
            console.error(`Valores seleccionados inválidos: ${invalidValues.join(', ')}`);
        }
    }, [selectedValues, options]);
    return (_jsxs("div", { className: cn('space-y-2', className), role: "group", "aria-labelledby": "filter-label", children: [_jsx("label", { id: "filter-label", className: "block text-sm font-medium", children: label }), isLoading ? (_jsx("div", { role: "status", children: _jsx("span", { children: "Cargando..." }) })) : error ? (_jsx("div", { role: "alert", className: "text-red-500", children: error })) : (_jsx("div", { className: "flex flex-wrap gap-2", children: options.map(option => (_jsx("button", { onClick: () => handleOptionClick(option.value), onKeyDown: (e) => handleKeyDown(e, option.value), className: cn('px-3 py-1 rounded-full text-sm', selectedValues.includes(option.value)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'), role: "checkbox", "aria-checked": selectedValues.includes(option.value), tabIndex: 0, children: option.label }, option.value))) }))] }));
};
