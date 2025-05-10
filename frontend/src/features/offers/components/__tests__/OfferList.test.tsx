import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, waitFor } from '@testing-library/react';
import { OfferList } from '../OfferList';
import { useAuth } from '../../../hooks/useAuth';
import { getActiveOffers, getUserOffers } from '../../../services/offerService';
// Mock de los hooks y servicios
jest.mock('../../../hooks/useAuth');
jest.mock('../../../services/offerService');
const mockUser: any = {
    uid: '123',
    email: 'test@example.com',
};
const mockOffers = [
    {
        id: '1',
        title: 'Oferta 1',
        description: 'Descripción 1',
        type: 'musica',
        location: {
            lat: 0,
            lng: 0,
            address: 'Dirección 1',
        },
        budget: 100,
        deadline: '2024-12-31T23:59:59Z',
        status: 'PENDING',
        createdById: '123',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '2',
        title: 'Oferta 2',
        description: 'Descripción 2',
        type: 'arte',
        location: {
            lat: 0,
            lng: 0,
            address: 'Dirección 2',
        },
        budget: 200,
        deadline: '2024-12-31T23:59:59Z',
        status: 'ACCEPTED',
        createdById: '456',
        artistId: '123',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];
describe('OfferList', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({ user: mockUser });
        getActiveOffers.mockResolvedValue(mockOffers);
        getUserOffers.mockResolvedValue({
            created: [mockOffers[0]],
            received: [mockOffers[1]],
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders loading state initially', () => {
        render(_jsx(OfferList, {}));
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
    it('renders offers after loading', async () => {
        render(_jsx(OfferList, {}));
        await waitFor(() => {
            expect(screen.getByText('Oferta 1')).toBeInTheDocument();
            expect(screen.getByText('Oferta 2')).toBeInTheDocument();
        });
    });
    it('shows create offer button for authenticated users', async () => {
        render(_jsx(OfferList, {}));
        await waitFor(() => {
            expect(screen.getByText('Crear Oferta')).toBeInTheDocument();
        });
    });
    it('does not show create offer button for unauthenticated users', async () => {
        useAuth.mockReturnValue({ user: null });
        render(_jsx(OfferList, {}));
        await waitFor(() => {
            expect(screen.queryByText('Crear Oferta')).not.toBeInTheDocument();
        });
    });
    it('shows tabs for authenticated users', async () => {
        render(_jsx(OfferList, {}));
        await waitFor(() => {
            expect(screen.getByText('Todas')).toBeInTheDocument();
            expect(screen.getByText('Creadas')).toBeInTheDocument();
            expect(screen.getByText('Recibidas')).toBeInTheDocument();
        });
    });
    it('shows offer details correctly', async () => {
        render(_jsx(OfferList, {}));
        await waitFor(() => {
            expect(screen.getByText('Descripción 1')).toBeInTheDocument();
            expect(screen.getByText('$100')).toBeInTheDocument();
            expect(screen.getByText('musica')).toBeInTheDocument();
        });
    });
    it('shows correct status badges', async () => {
        render(_jsx(OfferList, {}));
        await waitFor(() => {
            expect(screen.getByText('Pendiente')).toBeInTheDocument();
            expect(screen.getByText('Aceptada')).toBeInTheDocument();
        });
    });
    it('handles error state', async () => {
        getActiveOffers.mockRejectedValue(new Error('API Error'));
        render(_jsx(OfferList, {}));
        await waitFor(() => {
            expect(screen.getByText('No hay ofertas disponibles')).toBeInTheDocument();
        });
    });
});
