import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { Textarea } from '@/features/shared/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/features/shared/components/ui/select';
const SPECIALTIES = [
    'Pintura',
    'Escultura',
    'Fotografía',
    'Música',
    'Danza',
    'Teatro',
    'Literatura',
    'Artesanía'
];
export function ArtistInfoSection (props: any)) {
    const { register, setValue, watch } = useFormContext();
    const specialties = watch('specialties');
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Informaci\u00F3n del Artista" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Nombre Art\u00EDstico" }), _jsx(Input, { id: "name", ...register('name'), placeholder: "Tu nombre art\u00EDstico" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "bio", children: "Biograf\u00EDa" }), _jsx(Textarea, { id: "bio", ...register('bio'), placeholder: "Cu\u00E9ntanos sobre ti y tu arte", rows: 4 })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Especialidades" }), _jsxs(Select, { value: specialties.join(','), onValueChange: (value) => setValue('specialties', value.split(',')), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecciona tus especialidades" }) }), _jsx(SelectContent, { children: SPECIALTIES.map((specialty) => (_jsx(SelectItem, { value: specialty, children: specialty }, specialty))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "experience", children: "A\u00F1os de Experiencia" }), _jsx(Input, { id: "experience", type: "number", min: 0, ...register('experience', { valueAsNumber: true }) })] })] }) })] }));
}
