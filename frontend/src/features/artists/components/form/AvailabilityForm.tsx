import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/features/shared/components/ui/label';
import { Calendar } from '@/features/shared/components/ui/calendar';
import { Badge } from '@/features/shared/components/ui/badge';
export function AvailabilityForm (props: any)) {
    const { setValue, watch } = useFormContext();
    const availability = watch('availability') || [];
    const [selectedDate, setSelectedDate] = useState(null);
    const toggleDate: React.FC = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        const updated = availability.includes(dateStr)
            ? availability.filter((d) => d !== dateStr)
            : [...availability, dateStr];
        setValue('availability', updated);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "availability", children: "Disponibilidad" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Selecciona las fechas en las que est\u00E1s disponible. Puedes hacer clic nuevamente para desmarcarlas." })] }), _jsx(Calendar, { mode: "single", selected: selectedDate || undefined, onSelect: (date) => {
                    if (date) {
                        setSelectedDate(date);
                        toggleDate(date);
                    }
                } }), _jsx("div", { className: "flex flex-wrap gap-2", children: availability.map((dateStr) => (_jsx(Badge, { variant: "outline", children: dateStr }, dateStr))) })] }));
}
