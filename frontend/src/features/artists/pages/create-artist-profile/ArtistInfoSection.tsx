import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFormContext } from 'react-hook-form';
import { Label } from '@/features/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/features/ui/components/select';
import { Textarea } from '@/features/ui/components/textarea';
const categories: any = {
    "Música": ["Cantante", "Banda", "DJ", "Músico"],
    "Arte Visual": ["Pintor", "Fotógrafo", "Ilustrador"],
    "Danza": ["Bailarín", "Coreógrafo"],
    "Teatro": ["Actor", "Director"],
    "Otros": ["Otro"]
};
export default function ArtistInfoSection (props: any)) {
    // Obtenemos funciones del contexto del formulario
    const { watch, setValue, register } = useFormContext();
    const category = watch('category');
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "category", children: "Categor\u00EDa" }), _jsxs(Select, { value: category, onValueChange: (value) => setValue('category', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona una categor\u00EDa" }) }), _jsx(SelectContent, { children: Object.keys(categories).map((cat) => (_jsx(SelectItem, { value: cat, children: cat }, cat))) })] })] }), category && (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "subcategory", children: "Subcategor\u00EDa" }), _jsxs(Select, { onValueChange: (value) => setValue('subcategory', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona una subcategor\u00EDa" }) }), _jsx(SelectContent, { children: categories[category].map((sub) => (_jsx(SelectItem, { value: sub, children: sub }, sub))) })] })] })), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", children: "Descripci\u00F3n" }), _jsx(Textarea, { id: "description", placeholder: "Cu\u00E9ntanos sobre tu experiencia, estilo, trayectoria...", ...register('description') })] })] }));
}
