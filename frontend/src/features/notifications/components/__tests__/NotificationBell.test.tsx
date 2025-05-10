import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NotificationBell } from '../NotificationBell';
import { useNotifications } from '../../../hooks/useNotifications';
import { toast } from 'react-hot-toast';
// Mock the hooks and modules
jest.mock('../../../hooks/useNotifications');
jest.mock('react-hot-toast');
const mockNotifications = [
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
describe('NotificationBell', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('renders notification bell with unread count', () => {
        useNotifications.mockReturnValue({
            notifications: mockNotifications,
            markAsRead: jest.fn(),
            markAllAsRead: jest.fn(),
        });
        render(_jsx(NotificationBell, {}));
        expect(screen.getByText('1')).toBeInTheDocument();
    });
    it('shows notification dropdown when clicked', () => {
        useNotifications.mockReturnValue({
            notifications: mockNotifications,
            markAsRead: jest.fn(),
            markAllAsRead: jest.fn(),
        });
        render(_jsx(NotificationBell, {}));
        const bellButton = screen.getByRole('button');
        fireEvent.click(bellButton);
        expect(screen.getByText('Notificaciones')).toBeInTheDocument();
        expect(screen.getByText('Nueva oferta')).toBeInTheDocument();
        expect(screen.getByText('Oferta aceptada')).toBeInTheDocument();
    });
    it('hides notification dropdown when clicked again', () => {
        useNotifications.mockReturnValue({
            notifications: mockNotifications,
            markAsRead: jest.fn(),
            markAllAsRead: jest.fn(),
        });
        render(_jsx(NotificationBell, {}));
        const bellButton = screen.getByRole('button');
        fireEvent.click(bellButton);
        fireEvent.click(bellButton);
        expect(screen.queryByText('Notificaciones')).not.toBeInTheDocument();
    });
    it('shows empty state when there are no notifications', () => {
        useNotifications.mockReturnValue({
            notifications: [],
            markAsRead: jest.fn(),
            markAllAsRead: jest.fn(),
        });
        render(_jsx(NotificationBell, {}));
        const bellButton = screen.getByRole('button');
        fireEvent.click(bellButton);
        expect(screen.getByText('No hay notificaciones')).toBeInTheDocument();
    });
    it('handles mark as read for individual notification', async () => {
        const mockMarkAsRead = jest.fn();
        useNotifications.mockReturnValue({
            notifications: mockNotifications,
            markAsRead: mockMarkAsRead,
            markAllAsRead: jest.fn(),
        });
        render(_jsx(NotificationBell, {}));
        const bellButton = screen.getByRole('button');
        fireEvent.click(bellButton);
        const markAsReadButton = screen.getByText('Marcar como leída');
        fireEvent.click(markAsReadButton);
        await waitFor(() => {
            expect(mockMarkAsRead).toHaveBeenCalledWith('1');
            expect(toast.success).toHaveBeenCalledWith('Notificación marcada como leída');
        });
    });
    it('handles mark all as read', async () => {
        const mockMarkAllAsRead = jest.fn();
        useNotifications.mockReturnValue({
            notifications: mockNotifications,
            markAsRead: jest.fn(),
            markAllAsRead: mockMarkAllAsRead,
        });
        render(_jsx(NotificationBell, {}));
        const bellButton = screen.getByRole('button');
        fireEvent.click(bellButton);
        const markAllAsReadButton = screen.getByText('Marcar todas como leídas');
        fireEvent.click(markAllAsReadButton);
        await waitFor(() => {
            expect(mockMarkAllAsRead).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith('Todas las notificaciones marcadas como leídas');
        });
    });
    it('handles error when marking as read', async () => {
        const mockMarkAsRead = jest.fn().mockRejectedValue(new Error('Error'));
        useNotifications.mockReturnValue({
            notifications: mockNotifications,
            markAsRead: mockMarkAsRead,
            markAllAsRead: jest.fn(),
        });
        render(_jsx(NotificationBell, {}));
        const bellButton = screen.getByRole('button');
        fireEvent.click(bellButton);
        const markAsReadButton = screen.getByText('Marcar como leída');
        fireEvent.click(markAsReadButton);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error al marcar la notificación como leída');
        });
    });
    it('handles error when marking all as read', async () => {
        const mockMarkAllAsRead = jest.fn().mockRejectedValue(new Error('Error'));
        useNotifications.mockReturnValue({
            notifications: mockNotifications,
            markAsRead: jest.fn(),
            markAllAsRead: mockMarkAllAsRead,
        });
        render(_jsx(NotificationBell, {}));
        const bellButton = screen.getByRole('button');
        fireEvent.click(bellButton);
        const markAllAsReadButton = screen.getByText('Marcar todas como leídas');
        fireEvent.click(markAllAsReadButton);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error al marcar todas las notificaciones como leídas');
        });
    });
});
