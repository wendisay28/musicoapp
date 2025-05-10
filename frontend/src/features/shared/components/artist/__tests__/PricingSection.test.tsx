import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { PricingSection } from '../PricingSection';
const mockPrices = [
    {
        id: '1',
        title: 'Básico',
        price: 50,
        description: 'Paquete básico de servicios',
        features: ['Característica 1', 'Característica 2', 'Característica 3'],
    },
    {
        id: '2',
        title: 'Profesional',
        price: 100,
        description: 'Paquete profesional de servicios',
        features: ['Característica 1', 'Característica 2', 'Característica 3', 'Característica 4'],
    },
    {
        id: '3',
        title: 'Premium',
        price: 150,
        description: 'Paquete premium de servicios',
        features: ['Característica 1', 'Característica 2', 'Característica 3', 'Característica 4', 'Característica 5'],
    },
];
describe('PricingSection Component', () => {
    it('renders pricing section correctly', () => {
        render(_jsx(PricingSection, { prices: mockPrices }));
        expect(screen.getByText('Precios')).toBeInTheDocument();
        mockPrices.forEach(price => {
            expect(screen.getByText(price.title)).toBeInTheDocument();
            expect(screen.getByText(`$${price.price}`)).toBeInTheDocument();
            expect(screen.getByText(price.description)).toBeInTheDocument();
        });
    });
    it('handles price selection', () => {
        const handleSelect = jest.fn();
        render(_jsx(PricingSection, { prices: mockPrices, onSelect: handleSelect }));
        fireEvent.click(screen.getByText('Básico'));
        expect(handleSelect).toHaveBeenCalledWith(mockPrices[0]);
    });
    it('shows loading state', () => {
        render(_jsx(PricingSection, { prices: mockPrices, isLoading: true }));
        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    });
    it('shows empty state when no prices', () => {
        render(_jsx(PricingSection, { prices: [] }));
        expect(screen.getByText('No hay precios disponibles')).toBeInTheDocument();
    });
    it('applies custom styles', () => {
        render(_jsx(PricingSection, { prices: mockPrices, className: "custom-class" }));
        expect(screen.getByTestId('pricing-section')).toHaveClass('custom-class');
    });
});
