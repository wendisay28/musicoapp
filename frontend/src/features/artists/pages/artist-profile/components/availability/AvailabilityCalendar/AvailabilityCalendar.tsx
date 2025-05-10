import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Componente principal del calendario de disponibilidad
 * Maneja la lógica de selección y muestra días/horarios disponibles
 */
import { useState } from "react";
import { Calendar } from '@/features/ui/components/calendar';
import { TimeSlots } from "./TimeSlots";
import { AvailabilityStatus } from "@/pages/ProfileArt/common/types/artist";
import { cn } from "@/lib/utils";
export default function AvailabilityCalendar (props: any){ onSelectSlot, className }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availability, setAvailability] = useState([]);
    const handleDateSelect: React.FC = (date) => {
        setSelectedDate(date);
        if (date) {
            const slots = generateAvailabilityForDate(date);
            setAvailability(slots);
        }
    };
    const handleTimeSelect: React.FC = (time) => {
        if (selectedDate && onSelectSlot) {
            onSelectSlot(selectedDate, time);
        }
    };
    const handleBack: React.FC = () => {
        setSelectedDate(undefined);
    };
    const generateAvailabilityForDate: React.FC = (date) => {
        const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
        return hours.map(hour => ({
            date: new Date(date.setHours(parseInt(hour.split(':')[0]))),
            status: AvailabilityStatus.AVAILABLE,
            hours: [hour]
        }));
    };
    const getAvailableHours: React.FC = () => {
        return availability
            .flatMap(slot => slot.hours || [])
            .filter((hour) => hour !== undefined);
    };
    return (_jsxs("div", { className: cn('flex flex-col gap-4', className), children: [_jsx(Calendar, { mode: "single", selected: selectedDate, onSelect: handleDateSelect, className: "rounded-md border" }), selectedDate && (_jsx(TimeSlots, { slots: getAvailableHours(), selectedDate: selectedDate, onSelect: handleTimeSelect, onBack: handleBack }))] }));
}
