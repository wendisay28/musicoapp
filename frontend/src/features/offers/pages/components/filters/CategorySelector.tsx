import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from '@/features/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/features/ui/components/select';
const categories: any = {
    "Artes Musicales": ["Músicos", "Cantantes", "Compositores", "Directores"],
    "Artes Visuales": ["Pintores", "Escultores", "Fotógrafos", "Ilustradores"],
    // ... otras categorías
};
export function CategorySelector (props: any){ value, onChange }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Categor\u00EDa" }), _jsxs(Select, { value: value.category, onValueChange: (category) => onChange({ category, subcategory: "" }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona una categor\u00EDa" }) }), _jsx(SelectContent, { children: Object.keys(categories).map((category) => (_jsx(SelectItem, { value: category, children: category }, category))) })] })] }), value.category && (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Subcategor\u00EDa" }), _jsxs(Select, { value: value.subcategory, onValueChange: (subcategory) => onChange({ ...value, subcategory }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona una subcategor\u00EDa" }) }), _jsx(SelectContent, { children: categories[value.category]?.map((subcategory) => (_jsx(SelectItem, { value: subcategory, children: subcategory }, subcategory))) })] })] }))] }));
}
