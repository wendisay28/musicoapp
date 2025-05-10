import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/features/ui/components/input';
import { Label } from '@/features/ui/components/label';
import { cn } from '@/lib/utils';
export function ScheduleSection (props: any){ date, time, onDateChange, onTimeChange, className }) {
    return (_jsx("div", { className: cn('space-y-4', className), children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "date", children: "Fecha" }), _jsx(Input, { id: "date", type: "date", value: date, onChange: (e) => onDateChange(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "time", children: "Hora" }), _jsx(Input, { id: "time", type: "time", value: time, onChange: (e) => onTimeChange(e.target.value) })] })] }) }));
}
