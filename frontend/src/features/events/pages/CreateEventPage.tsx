import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/features/ui/components/card';
import { EventForm } from '@/features/shared/components/EventForm';
import { createEvent } from '../api/createEvent';
import { useErrorHandler } from '@/features/shared/hooks/useErrorHandler';
export default function CreateEventPage (props: any)) {
    const navigate = useNavigate();
    const handleError = useErrorHandler();
    const onSubmit = async (data) => {
        try {
            await createEvent(data);
            navigate('/events');
        }
        catch (error) {
            handleError(error);
        }
    };
    return (_jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Crear Nuevo Evento" }) }), _jsx(CardContent, { children: _jsx(EventForm, { onSubmit: onSubmit }) })] }) }));
}
