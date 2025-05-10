import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { AvailabilitySection } from '../AvailabilitySection';
const mockTimeSlots = [
    { start: new Date('2024-01-01T09:00:00'), end: new Date('2024-01-01T10:00:00'), isAvailable: true },
    { start: new Date('2024-01-01T10:00:00'), end: new Date('2024-01-01T11:00:00'), isAvailable: true },
    { start: new Date('2024-01-01T14:00:00'), end: new Date('2024-01-01T15:00:00'), isAvailable: false },
];
describe('AvailabilitySection Component', () => {
    it('renders availability section correctly', () => {
        render(_jsx(AvailabilitySection, { timeSlots: mockTimeSlots }));
        expect(screen.getByText('Disponibilidad')).toBeInTheDocument();
        expect(screen.getByText('Lunes - Viernes')).toBeInTheDocument();
        expect(screen.getByText('9:00 AM - 5:00 PM')).toBeInTheDocument();
    });
    it('handles time slot selection', () => {
        const handleSelect = jest.fn();
        render(_jsx(AvailabilitySection, { timeSlots: mockTimeSlots, onSelect: handleSelect }));
        fireEvent.click(screen.getByText('9:00 AM - 10:00 AM'));
        expect(handleSelect).toHaveBeenCalledWith(mockTimeSlots[0]);
    });
    it('disables unavailable time slots', () => {
        render(_jsx(AvailabilitySection, { timeSlots: mockTimeSlots, unavailableSlots: [mockTimeSlots[0]] }));
        expect(screen.getByText('9:00 AM - 10:00 AM').closest('button')).toBeDisabled();
    });
    it('shows loading state', () => {
        const handleSelect = jest.fn();
        render(_jsx(AvailabilitySection, { timeSlots: mockTimeSlots, onSelect: handleSelect, isLoading: true }));
        fireEvent.click(screen.getByText('9:00 AM - 10:00 AM'));
        expect(handleSelect).not.toHaveBeenCalled();
        expect(screen.getByText('9:00 AM - 10:00 AM').closest('button')).toBeDisabled();
    });
    it('displays custom time slots', () => {
        const customTimeSlots = [
            { start: new Date('2024-01-01T10:00:00'), end: new Date('2024-01-01T11:00:00'), isAvailable: true },
            { start: new Date('2024-01-01T14:00:00'), end: new Date('2024-01-01T15:00:00'), isAvailable: true },
        ];
        render(_jsx(AvailabilitySection, { timeSlots: customTimeSlots }));
        expect(screen.getByText('10:00 AM - 11:00 AM')).toBeInTheDocument();
        expect(screen.getByText('2:00 PM - 3:00 PM')).toBeInTheDocument();
    });
    it('renderiza los horarios correctamente', () => {
        render(_jsx(AvailabilitySection, { timeSlots: mockTimeSlots }));
        expect(screen.getByText('Disponibilidad')).toBeInTheDocument();
        expect(screen.getByText('Disponible')).toBeInTheDocument();
        expect(screen.getByText('No disponible')).toBeInTheDocument();
    });
    it('llama a onTimeSlotClick cuando se hace clic en un horario disponible', () => {
        const onTimeSlotClick = vi.fn();
        render(_jsx(AvailabilitySection, { timeSlots: mockTimeSlots, onTimeSlotClick: onTimeSlotClick }));
        const availableSlot = screen.getByText('Disponible').closest('button');
        expect(availableSlot).not.toBeDisabled();
        fireEvent.click(availableSlot);
        expect(onTimeSlotClick).toHaveBeenCalledWith(mockTimeSlots[0]);
    });
    it('no permite hacer clic en horarios no disponibles', () => {
        const onTimeSlotClick = vi.fn();
        render(_jsx(AvailabilitySection, { timeSlots: mockTimeSlots, onTimeSlotClick: onTimeSlotClick }));
        const unavailableSlot = screen.getByText('No disponible').closest('button');
        expect(unavailableSlot).toBeDisabled();
        fireEvent.click(unavailableSlot);
        expect(onTimeSlotClick).not.toHaveBeenCalled();
    });
    it('formatea las fechas correctamente', () => {
        render(_jsx(AvailabilitySection, { timeSlots: mockTimeSlots }));
        expect(screen.getByText('miércoles 20 marzo')).toBeInTheDocument();
        expect(screen.getByText('10:00 - 12:00')).toBeInTheDocument();
    });
});
