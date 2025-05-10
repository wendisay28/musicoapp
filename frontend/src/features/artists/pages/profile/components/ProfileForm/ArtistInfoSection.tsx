import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { categorias as CATEGORIES } from '../../constants';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/features/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/features/ui/components/select';
import { Input } from '@/features/ui/components/input';
import { Badge } from '@/features/ui/components/badge';
import { X } from 'lucide-react';
import { Button } from '@/features/ui/components/button';
export function ArtistInfoSection (props: any){ control, onCategoryChange }) {
    const { watch, setValue } = useFormContext();
    const [newTag, setNewTag] = useState('');
    const tags = watch('tags') || [];
    const category = watch('category');
    const handleAddTag: React.FC = () => {
        if (!newTag.trim() || tags.length >= 3)
            return;
        if (tags.includes(newTag.trim()))
            return;
        setValue('tags', [...tags, newTag.trim()]);
        setNewTag('');
    };
    const handleRemoveTag: React.FC = (tagToRemove) => {
        setValue('tags', tags.filter((tag) => tag !== tagToRemove));
    };
    const handleCategoryChange: React.FC = (value) => {
        setValue('category', value);
        setValue('subcategory', '');
        onCategoryChange?.(value);
    };
    return (_jsxs("div", { className: "space-y-6 border p-6 rounded-lg bg-muted/10", children: [_jsx("h3", { className: "text-lg font-medium", children: "Informaci\u00F3n de Artista" }), _jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Completa esta secci\u00F3n si ofreces servicios art\u00EDsticos" }), _jsxs("div", { className: "grid grid-cols-1 gap-6", children: [_jsx(FormField, { control: control, name: "category", render: (field) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Categor\u00EDa principal" }), _jsxs(Select, { value: field.value, onValueChange: (value) => {
                                        field.onChange(value);
                                        handleCategoryChange(value);
                                    }, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona una categor\u00EDa" }) }) }), _jsx(SelectContent, { children: Object.keys(CATEGORIES).map((cat) => (_jsx(SelectItem, { value: cat, children: cat }, cat))) })] }), _jsx(FormMessage, {})] })) }), category && CATEGORIES[category] && (_jsx(FormField, { control: control, name: "subcategory", render: (field) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Especialidad" }), _jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona una especialidad" }) }) }), _jsx(SelectContent, { children: CATEGORIES[category].map((subcat) => (_jsx(SelectItem, { value: subcat, children: subcat }, subcat))) })] }), _jsx(FormMessage, {})] })) })), _jsx(FormField, { control: control, name: "tags", render: () => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Etiquetas profesionales" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: tags.map((tag) => (_jsxs(Badge, { variant: "secondary", className: "flex items-center gap-1", children: [tag, _jsx("button", { type: "button", onClick: () => handleRemoveTag(tag), className: "hover:text-destructive", children: _jsx(X, { className: "h-3 w-3" }) })] }, tag))) }), _jsx(FormControl, { children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Ej: Fot\u00F3grafo de bodas", value: newTag, onChange: (e) => setNewTag(e.target.value), onKeyDown: (e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddTag();
                                                    }
                                                } }), _jsx(Button, { type: "button", variant: "outline", onClick: handleAddTag, disabled: !newTag.trim() || tags.length >= 3, children: "A\u00F1adir" })] }) }), _jsx(FormDescription, { children: "M\u00E1ximo 3 etiquetas que describan tu especialidad" }), _jsx(FormMessage, {})] })) })] })] }));
}
