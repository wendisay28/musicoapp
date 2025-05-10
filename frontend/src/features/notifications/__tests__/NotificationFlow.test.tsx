import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, afterEach, beforeEach } from 'vitest';
import { NotificationList } from '../components/NotificationList';
import { NotificationBell } from '../components/NotificationBell';
import { getNotifications, markNotificationAsRead, deleteNotification } from '@/services/notificationService';

// Mock the services
vi.mock('@/services/notificationService', () => ({
  getNotifications: vi.fn(),
  markNotificationAsRead: vi.fn(),
  deleteNotification: vi.fn(),
}));

const mockNotifications = [
  {
    id: '1',
    title: 'Nueva oferta',
    message: 'Has recibido una nueva oferta',
    type: 'info' as const,
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: '2',
    title: 'Mensaje nuevo',
    message: 'Tienes un nuevo mensaje',
    type: 'info' as const,
    createdAt: new Date().toISOString(),
    read: true,
  },
];

describe('Notification Flow', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.mocked(getNotifications).mockResolvedValue(mockNotifications);
    vi.mocked(markNotificationAsRead).mockResolvedValue();
    vi.mocked(deleteNotification).mockResolvedValue();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    );
  };

  it('completes full notification flow', async () => {
    renderWithProviders(
      <>
        <NotificationBell />
        <NotificationList />
      </>
    );

    // Verificar que el contador muestra notificaciones no leídas
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    // Verificar que las notificaciones se muestran
    expect(screen.getByText('Nueva oferta')).toBeInTheDocument();
    expect(screen.getByText('Mensaje nuevo')).toBeInTheDocument();

    // Marcar como leída
    const markAsReadButton = screen.getByTitle('Marcar como leída');
    fireEvent.click(markAsReadButton);

    await waitFor(() => {
      expect(markNotificationAsRead).toHaveBeenCalledWith('1');
    });

    // Eliminar notificación
    const deleteButton = screen.getByTitle('Eliminar');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteNotification).toHaveBeenCalledWith('1');
    });
  });
}); 