import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const AvailabilitySection: React.FC = ({ timeSlots, onSelect, unavailableSlots = [], isLoading = false, }) => {
    const formatTime: React.FC = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };
    const isSlotUnavailable: React.FC = (slot) => {
        return unavailableSlots.some(unavailable => unavailable.start.getTime() === slot.start.getTime() &&
            unavailable.end.getTime() === slot.end.getTime());
    };
    return (_jsxs("div", { className: "p-4 bg-white rounded-lg shadow", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Disponibilidad" }), _jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-gray-600", children: "Lunes - Viernes" }), _jsx("p", { className: "text-gray-600", children: "9:00 AM - 5:00 PM" })] }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: timeSlots.map((slot, index) => (_jsxs("button", { onClick: () => !isLoading && onSelect?.(slot), disabled: isLoading || isSlotUnavailable(slot) || !slot.isAvailable, className: `p-2 rounded ${isLoading || isSlotUnavailable(slot) || !slot.isAvailable
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary-dark'}`, children: [formatTime(slot.start), " - ", formatTime(slot.end)] }, index))) })] }));
};
