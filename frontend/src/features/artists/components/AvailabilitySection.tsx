import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { AvailabilityForm } from './form/AvailabilityForm';
export function AvailabilitySection (props: any)) {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Disponibilidad" }) }), _jsx(CardContent, { children: _jsx(AvailabilityForm, {}) })] }));
}
