import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/features/ui/components/input';
import { Label } from '@/features/ui/components/label';
import { Textarea } from '@/features/ui/components/textarea';
import { cn } from '@/lib/utils';
export function BasicInfoSection (props: any){ title, description, onTitleChange, onDescriptionChange, className }) {
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "T\u00EDtulo del Evento" }), _jsx(Input, { id: "title", value: title, onChange: (e) => onTitleChange(e.target.value), placeholder: "Ingresa el t\u00EDtulo del evento" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", children: "Descripci\u00F3n" }), _jsx(Textarea, { id: "description", value: description, onChange: (e) => onDescriptionChange(e.target.value), placeholder: "Describe tu evento", rows: 4 })] })] }));
}
