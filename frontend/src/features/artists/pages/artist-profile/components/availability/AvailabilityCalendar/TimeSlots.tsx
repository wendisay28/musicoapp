import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Componente que muestra los horarios disponibles para una fecha seleccionada
 * Permite elegir un horario específico o volver al calendario
 */
import { Button } from '@/features/ui/components/button';
import { ChevronLeft, Clock } from "lucide-react";
export const TimeSlots: React.FC = ({ slots, selectedDate, onSelect, onBack }) => {
    // Formatea la fecha en español (ej: "lunes, 20 de noviembre")
    const formattedDate = selectedDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, className: "px-0 text-primary hover:bg-transparent hover:text-primary/80", children: [_jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }), "Volver"] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: formattedDate })] }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: slots.map((hour) => (_jsx(Button, { variant: "outline", onClick: () => onSelect(hour), className: "flex items-center gap-2", children: hour }, hour))) })] }));
};
