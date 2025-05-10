import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Calendar } from '@/features/shared/components/ui/calendar';
export function AvailabilityCalendar (props: any){ availableDates }) {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Disponibilidad" }) }), _jsx(CardContent, { children: _jsx(Calendar, { mode: "multiple", selected: availableDates, className: "rounded-md border", disabled: (date) => !availableDates.some(d => d.getTime() === date.getTime()) }) })] }));
}
