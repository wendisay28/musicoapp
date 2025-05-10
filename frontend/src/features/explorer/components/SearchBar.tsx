import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
export const SearchBar: React.FC = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const debouncedSearch = useDebounce((value) => {
        onSearch(value);
    }, 300);
    const handleChange = useCallback((event) => {
        const value = event.target.value;
        setQuery(value);
        debouncedSearch(value);
    }, [debouncedSearch]);
    return (_jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: query, onChange: handleChange, placeholder: "Buscar artistas, eventos, lugares...", className: "w-full px-4 py-2 pl-10 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-primary" }), _jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3", children: _jsx("svg", { className: "w-5 h-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })] }));
};
