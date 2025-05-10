import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from '@/features/ui/components/button';
import { Input } from '@/features/ui/components/input';
import { Textarea } from '@/features/ui/components/textarea';
import { Label } from '@/features/ui/components/label';
import { Calendar } from '@/features/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/features/ui/components/popover';
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
export function RequestForm (props: any){ onSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState();
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const handleSubmit: React.FC = (e) => {
        e.preventDefault();
        if (!date)
            return;
        onSubmit({
            title,
            description,
            date,
            location,
            price: Number(price),
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "T\u00EDtulo" }), _jsx(Input, { id: "title", value: title, onChange: (e) => setTitle(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", children: "Descripci\u00F3n" }), _jsx(Textarea, { id: "description", value: description, onChange: (e) => setDescription(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Fecha" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "w-full justify-start text-left font-normal", children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"] }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, initialFocus: true }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "location", children: "Ubicaci\u00F3n" }), _jsx(Input, { id: "location", value: location, onChange: (e) => setLocation(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "price", children: "Presupuesto" }), _jsx(Input, { id: "price", type: "number", value: price, onChange: (e) => setPrice(e.target.value), required: true })] }), _jsx(Button, { type: "submit", className: "w-full", children: "Crear solicitud" })] }));
}
