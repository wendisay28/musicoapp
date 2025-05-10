import { getActiveOffers, getUserOffers, getOfferById, createOffer, acceptOffer, rejectOffer, } from '../offerService';
import { api } from '../api';
// Mock del cliente API
jest.mock('../api');
describe('offerService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getActiveOffers', () => {
        it('fetches active offers successfully', async () => {
            const mockOffers: any = [
                {
                    id: '1',
                    title: 'Oferta 1',
                    status: 'PENDING',
                },
                {
                    id: '2',
                    title: 'Oferta 2',
                    status: 'PENDING',
                },
            ];
            api.get.mockResolvedValue({ data: mockOffers });
            const result: any = await getActiveOffers();
            expect(api.get).toHaveBeenCalledWith('/offers/active');
            expect(result).toEqual(mockOffers);
        });
        it('handles error when fetching active offers', async () => {
            const error: any = new Error('API Error');
            api.get.mockRejectedValue(error);
            await expect(getActiveOffers()).rejects.toThrow('API Error');
        });
    });
    describe('getUserOffers', () => {
        it('fetches user offers successfully', async () => {
            const mockOffers: any = {
                created: [
                    {
                        id: '1',
                        title: 'Oferta creada',
                        createdById: '123',
                    },
                ],
                received: [
                    {
                        id: '2',
                        title: 'Oferta recibida',
                        artistId: '123',
                    },
                ],
            };
            api.get.mockResolvedValue({ data: mockOffers });
            const result: any = await getUserOffers('123');
            expect(api.get).toHaveBeenCalledWith('/offers/user/123');
            expect(result).toEqual(mockOffers);
        });
        it('handles error when fetching user offers', async () => {
            const error: any = new Error('API Error');
            api.get.mockRejectedValue(error);
            await expect(getUserOffers('123')).rejects.toThrow('API Error');
        });
    });
    describe('getOfferById', () => {
        it('fetches offer by id successfully', async () => {
            const mockOffer: any = {
                id: '1',
                title: 'Oferta de prueba',
            };
            api.get.mockResolvedValue({ data: mockOffer });
            const result: any = await getOfferById('1');
            expect(api.get).toHaveBeenCalledWith('/offers/1');
            expect(result).toEqual(mockOffer);
        });
        it('handles error when fetching offer by id', async () => {
            const error: any = new Error('API Error');
            api.get.mockRejectedValue(error);
            await expect(getOfferById('1')).rejects.toThrow('API Error');
        });
    });
    describe('createOffer', () => {
        it('creates offer successfully', async () => {
            const mockOffer: any = {
                title: 'Nueva oferta',
                description: 'Descripción',
                type: 'musica',
                budget: 100,
                deadline: '2024-12-31T23:59:59Z',
                createdById: '123',
            };
            const mockResponse: any = {
                id: '1',
                ...mockOffer,
            };
            api.post.mockResolvedValue({ data: mockResponse });
            const result: any = await createOffer(mockOffer);
            expect(api.post).toHaveBeenCalledWith('/offers', mockOffer);
            expect(result).toEqual(mockResponse);
        });
        it('handles error when creating offer', async () => {
            const error: any = new Error('API Error');
            api.post.mockRejectedValue(error);
            const mockOffer: any = {
                title: 'Nueva oferta',
                description: 'Descripción',
                type: 'musica',
                budget: 100,
                deadline: '2024-12-31T23:59:59Z',
                createdById: '123',
            };
            await expect(createOffer(mockOffer)).rejects.toThrow('API Error');
        });
    });
    describe('acceptOffer', () => {
        it('accepts offer successfully', async () => {
            const mockResponse: any = {
                id: '1',
                status: 'ACCEPTED',
            };
            api.post.mockResolvedValue({ data: mockResponse });
            const result: any = await acceptOffer('1', '123');
            expect(api.post).toHaveBeenCalledWith('/offers/1/accept', { artistId: '123' });
            expect(result).toEqual(mockResponse);
        });
        it('handles error when accepting offer', async () => {
            const error: any = new Error('API Error');
            api.post.mockRejectedValue(error);
            await expect(acceptOffer('1', '123')).rejects.toThrow('API Error');
        });
    });
    describe('rejectOffer', () => {
        it('rejects offer successfully', async () => {
            const mockResponse: any = {
                id: '1',
                status: 'REJECTED',
            };
            api.post.mockResolvedValue({ data: mockResponse });
            const result: any = await rejectOffer('1', '123');
            expect(api.post).toHaveBeenCalledWith('/offers/1/reject', { artistId: '123' });
            expect(result).toEqual(mockResponse);
        });
        it('handles error when rejecting offer', async () => {
            const error: any = new Error('API Error');
            api.post.mockRejectedValue(error);
            await expect(rejectOffer('1', '123')).rejects.toThrow('API Error');
        });
    });
});
