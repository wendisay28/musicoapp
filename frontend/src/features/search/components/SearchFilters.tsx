import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from '@/features/shared/components/button';
import { Card } from '@/features/shared/components/card';
import { Input } from '@/features/shared/components/input';
import { Slider } from '@/features/shared/components/slider';
import { Label } from '@/features/shared/components/label';
import { Filter } from "lucide-react";
export default function SearchFilters (props: any){ onApplyFilters }) {
    const [distance, setDistance] = useState([50]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [category, setCategory] = useState("");
    const handleApplyFilters: React.FC = () => {
        const filters: any = {
            distance: distance[0],
            priceRange: [priceRange[0], priceRange[1]],
            category: category || undefined,
        };
        onApplyFilters(filters);
    };
    return (_jsx(Card, { className: "p-4", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Distancia (km)" }), _jsx(Slider, { defaultValue: [50], max: 100, step: 1, value: distance, onValueChange: setDistance })] }), _jsxs("div", { children: [_jsx(Label, { children: "Rango de precio" }), _jsx(Slider, { defaultValue: [0, 1000], max: 1000, step: 10, value: priceRange, onValueChange: setPriceRange })] }), _jsxs("div", { children: [_jsx(Label, { children: "Categor\u00EDa" }), _jsx(Input, { placeholder: "Buscar por categor\u00EDa", value: category, onChange: (e) => setCategory(e.target.value) })] }), _jsxs(Button, { onClick: handleApplyFilters, className: "w-full", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), "Aplicar filtros"] })] }) }));
}
