import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateOffer } from '../CreateOffer';
import { useAuth } from '../../../hooks/useAuth';
import { createOffer } from '../../../services/offerService';
// Mock de los hooks y servicios
jest.mock('../../../hooks/useAuth');
jest.mock('../../../services/offerService');
const mockUser: any = {
    uid: '123',
    email: 'test@example.com',
};
describe('CreateOffer', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ user: mockUser });
        createOffer.mockResolvedValue({ id: '1' });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders form fields correctly', () => {
        render(_jsx(CreateOffer, {}));
        expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/tipo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/presupuesto/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/fecha límite/i)).toBeInTheDocument();
    });
    it('validates required fields', async () => {
        render(_jsx(CreateOffer, {}));
        fireEvent.click(screen.getByText('Crear Oferta'));
        await waitFor(() => {
            expect(screen.getByText('El título es requerido')).toBeInTheDocument();
            expect(screen.getByText('La descripción es requerida')).toBeInTheDocument();
            expect(screen.getByText('El tipo es requerido')).toBeInTheDocument();
            expect(screen.getByText('El presupuesto es requerido')).toBeInTheDocument();
            expect(screen.getByText('La fecha límite es requerida')).toBeInTheDocument();
        });
    });
    it('submits form with valid data', async () => {
        render(_jsx(CreateOffer, {}));
        fireEvent.change(screen.getByLabelText(/título/i), {
            target: { value: 'Oferta de prueba' },
        });
        fireEvent.change(screen.getByLabelText(/descripción/i), {
            target: { value: 'Descripción de prueba' },
        });
        fireEvent.change(screen.getByLabelText(/tipo/i), {
            target: { value: 'musica' },
        });
        fireEvent.change(screen.getByLabelText(/presupuesto/i), {
            target: { value: '100' },
        });
        fireEvent.change(screen.getByLabelText(/fecha límite/i), {
            target: { value: '2024-12-31T23:59' },
        });
        fireEvent.click(screen.getByText('Crear Oferta'));
        await waitFor(() => {
            expect(createOffer).toHaveBeenCalledWith({
                title: 'Oferta de prueba',
                description: 'Descripción de prueba',
                type: 'musica',
                budget: 100,
                deadline: '2024-12-31T23:59:00Z',
                createdById: '123',
            });
        });
    });
    it('shows success message after successful submission', async () => {
        render(_jsx(CreateOffer, {}));
        fireEvent.change(screen.getByLabelText(/título/i), {
            target: { value: 'Oferta de prueba' },
        });
        fireEvent.change(screen.getByLabelText(/descripción/i), {
            target: { value: 'Descripción de prueba' },
        });
        fireEvent.change(screen.getByLabelText(/tipo/i), {
            target: { value: 'musica' },
        });
        fireEvent.change(screen.getByLabelText(/presupuesto/i), {
            target: { value: '100' },
        });
        fireEvent.change(screen.getByLabelText(/fecha límite/i), {
            target: { value: '2024-12-31T23:59' },
        });
        fireEvent.click(screen.getByText('Crear Oferta'));
        await waitFor(() => {
            expect(screen.getByText('Oferta creada exitosamente')).toBeInTheDocument();
        });
    });
    it('handles submission error', async () => {
        createOffer.mockRejectedValue(new Error('API Error'));
        render(_jsx(CreateOffer, {}));
        fireEvent.change(screen.getByLabelText(/título/i), {
            target: { value: 'Oferta de prueba' },
        });
        fireEvent.change(screen.getByLabelText(/descripción/i), {
            target: { value: 'Descripción de prueba' },
        });
        fireEvent.change(screen.getByLabelText(/tipo/i), {
            target: { value: 'musica' },
        });
        fireEvent.change(screen.getByLabelText(/presupuesto/i), {
            target: { value: '100' },
        });
        fireEvent.change(screen.getByLabelText(/fecha límite/i), {
            target: { value: '2024-12-31T23:59' },
        });
        fireEvent.click(screen.getByText('Crear Oferta'));
        await waitFor(() => {
            expect(screen.getByText('Error al crear la oferta')).toBeInTheDocument();
        });
    });
    it('validates budget is a positive number', async () => {
        render(_jsx(CreateOffer, {}));
        fireEvent.change(screen.getByLabelText(/presupuesto/i), {
            target: { value: '-100' },
        });
        fireEvent.click(screen.getByText('Crear Oferta'));
        await waitFor(() => {
            expect(screen.getByText('El presupuesto debe ser un número positivo')).toBeInTheDocument();
        });
    });
    it('validates deadline is in the future', async () => {
        render(_jsx(CreateOffer, {}));
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const pastDateString = pastDate.toISOString().slice(0, 16);
        fireEvent.change(screen.getByLabelText(/fecha límite/i), {
            target: { value: pastDateString },
        });
        fireEvent.click(screen.getByText('Crear Oferta'));
        await waitFor(() => {
            expect(screen.getByText('La fecha límite debe ser en el futuro')).toBeInTheDocument();
        });
    });
});
