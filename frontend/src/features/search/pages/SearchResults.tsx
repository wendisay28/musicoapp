import React from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// client/src/pages/search/components/SearchResults.tsx
import { Skeleton } from '@/features/shared/components/ui/skeleton';
import { Card, CardContent } from '@/features/shared/components/ui/card';
const SearchResults: React.FC = ({ isLoading, data, debouncedSearchTerm, renderCard }) => {
    return (_jsx("div", { className: "mt-4", children: isLoading ? (_jsx("div", { className: "space-y-4", children: Array(3).fill(0).map((_, i) => (_jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, i))) })) : data && data.length > 0 ? (_jsx("div", { className: "space-y-4", children: data.map(renderCard) })) : (_jsx(Card, { children: _jsx(CardContent, { className: "py-8 text-center", children: debouncedSearchTerm ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDD0D" }), _jsx("h3", { className: "font-semibold text-xl mb-2", children: "No se encontraron resultados" }), _jsxs("p", { className: "text-muted-foreground", children: ["No hay resultados para \"", debouncedSearchTerm, "\""] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDFA4" }), _jsx("h3", { className: "font-semibold text-xl mb-2", children: "Busca algo" }), _jsx("p", { className: "text-muted-foreground", children: "Escribe en la barra de b\u00FAsqueda para encontrar lo que buscas" })] })) }) })) }));
};
export default SearchResults;
