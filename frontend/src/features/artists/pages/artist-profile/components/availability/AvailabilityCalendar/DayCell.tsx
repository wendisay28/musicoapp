import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Componente que representa un día en el calendario
 * Muestra visualmente si está disponible, seleccionado o es el día actual
 */
import { cn } from "@/lib/utils"; // Utilidad para combinar clases
export const DayCell: React.FC = ({ date, status, isSelected, isToday, onClick }) => {
    const dayNumber = date.getDate(); // Extrae el número del día
    return (_jsxs("button", { onClick: onClick, disabled: status === 'unavailable', className: cn(
        // Clases base
        "relative p-2 rounded-full transition-all text-sm", 
        // Estado seleccionado
        isSelected && "bg-primary text-white ring-2 ring-primary ring-offset-2", 
        // Estado disponible (no seleccionado)
        status === 'available' && !isSelected && "bg-primary/10 hover:bg-primary/20", 
        // Estado no disponible
        status === 'unavailable' && "bg-muted text-muted-foreground cursor-not-allowed", 
        // Destacar día actual
        isToday && "font-bold"), children: [dayNumber, status === 'available' && (_jsx("span", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" }))] }));
};
