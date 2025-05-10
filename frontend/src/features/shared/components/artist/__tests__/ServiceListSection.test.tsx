import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceListSection } from '../ServiceListSection';
const mockServices = [
    {
        id: '1',
        title: 'Fotografía de eventos',
        description: 'Servicio de fotografía para eventos especiales',
        price: 100,
        duration: 2,
        category: 'Fotografía',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        title: 'Sesión de retratos',
        description: 'Sesión de fotos de retrato profesional',
        price: 80,
        duration: 1,
        category: 'Fotografía',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        title: 'Fotografía de productos',
        description: 'Fotografía profesional de productos para e-commerce',
        price: 120,
        duration: 3,
        category: 'Fotografía',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
describe('ServiceListSection Component', () => {
    it('renders service list correctly', () => {
        render(_jsx(ServiceListSection, { services: mockServices }));
        expect(screen.getByText('Servicios')).toBeInTheDocument();
        mockServices.forEach(service => {
            expect(screen.getByText(service.title)).toBeInTheDocument();
            expect(screen.getByText(`$${service.price}`)).toBeInTheDocument();
        });
    });
    it('handles service selection', () => {
        const handleSelect = jest.fn();
        render(_jsx(ServiceListSection, { services: mockServices, onSelect: handleSelect }));
        fireEvent.click(screen.getByText('Fotografía de eventos'));
        expect(handleSelect).toHaveBeenCalledWith(mockServices[0]);
    });
    it('shows loading state', () => {
        render(_jsx(ServiceListSection, { services: mockServices, isLoading: true }));
        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    });
    it('shows empty state when no services', () => {
        render(_jsx(ServiceListSection, { services: [] }));
        expect(screen.getByText('No hay servicios disponibles')).toBeInTheDocument();
    });
    it('applies custom styles', () => {
        render(_jsx(ServiceListSection, { services: mockServices, className: "custom-class" }));
        expect(screen.getByTestId('service-list')).toHaveClass('custom-class');
    });
});
