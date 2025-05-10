import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '@/features/ui/components/button';
import { reserveTicket } from '../api/reserveTicket';
export function ReserveButton (props: any){ event, onReserve, className }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const handleReserve = async () => {
        try {
            setLoading(true);
            setError(null);
            await reserveTicket(event.id);
            onReserve();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al reservar el ticket');
        }
        finally {
            setLoading(false);
        }
    };
    const isFull = event.attendees.length >= event.capacity;
    const isAttending = event.attendees.some((attendee) => attendee.id === 'current-user-id' && attendee.status === 'confirmed');
    return (_jsxs("div", { className: className, children: [error && (_jsx("p", { className: "text-sm text-red-500 mb-2", children: error })), _jsx(Button, { onClick: handleReserve, disabled: loading || isFull || isAttending, className: "w-full", children: loading ? 'Reservando...' : isAttending ? 'Ya reservado' : 'Reservar Ticket' }), isFull && (_jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Lo sentimos, este evento est\u00E1 completo" }))] }));
}
