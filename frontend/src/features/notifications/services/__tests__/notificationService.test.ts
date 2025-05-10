import { api } from '../api';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, } from '../notificationService';
jest.mock('../api');
const mockNotifications: any = [
    {
        id: '1',
        title: 'Nueva oferta',
        message: 'Has recibido una nueva oferta',
        read: false,
        createdAt: '2024-03-20T10:00:00Z',
    },
    {
        id: '2',
        title: 'Oferta aceptada',
        message: 'Tu oferta ha sido aceptada',
        read: true,
        createdAt: '2024-03-19T15:30:00Z',
    },
];
describe('notificationService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getNotifications', () => {
        it('should fetch notifications successfully', async () => {
            api.get.mockResolvedValueOnce({ data: mockNotifications });
            const result: any = await getNotifications();
            expect(api.get).toHaveBeenCalledWith('/notifications');
            expect(result).toEqual(mockNotifications);
        });
        it('should handle API error', async () => {
            const errorMessage: any = 'Error al obtener las notificaciones';
            api.get.mockRejectedValueOnce({
                response: { data: { message: errorMessage } },
            });
            await expect(getNotifications()).rejects.toThrow(errorMessage);
        });
        it('should handle network error', async () => {
            api.get.mockRejectedValueOnce(new Error('Network error'));
            await expect(getNotifications()).rejects.toThrow('Error al obtener las notificaciones');
        });
    });
    describe('markNotificationAsRead', () => {
        it('should mark notification as read successfully', async () => {
            api.patch.mockResolvedValueOnce({});
            await markNotificationAsRead('1');
            expect(api.patch).toHaveBeenCalledWith('/notifications/1/read');
        });
        it('should handle API error', async () => {
            const errorMessage: any = 'Error al marcar la notificación como leída';
            api.patch.mockRejectedValueOnce({
                response: { data: { message: errorMessage } },
            });
            await expect(markNotificationAsRead('1')).rejects.toThrow(errorMessage);
        });
        it('should handle network error', async () => {
            api.patch.mockRejectedValueOnce(new Error('Network error'));
            await expect(markNotificationAsRead('1')).rejects.toThrow('Error al marcar la notificación como leída');
        });
    });
    describe('markAllNotificationsAsRead', () => {
        it('should mark all notifications as read successfully', async () => {
            api.patch.mockResolvedValueOnce({});
            await markAllNotificationsAsRead();
            expect(api.patch).toHaveBeenCalledWith('/notifications/read-all');
        });
        it('should handle API error', async () => {
            const errorMessage: any = 'Error al marcar todas las notificaciones como leídas';
            api.patch.mockRejectedValueOnce({
                response: { data: { message: errorMessage } },
            });
            await expect(markAllNotificationsAsRead()).rejects.toThrow(errorMessage);
        });
        it('should handle network error', async () => {
            api.patch.mockRejectedValueOnce(new Error('Network error'));
            await expect(markAllNotificationsAsRead()).rejects.toThrow('Error al marcar todas las notificaciones como leídas');
        });
    });
});
