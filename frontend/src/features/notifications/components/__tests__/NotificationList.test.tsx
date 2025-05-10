import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationList } from '../NotificationList';
import { getNotifications, markNotificationAsRead, deleteNotification } from '@/services/notificationService';

// Mock the services
jest.mock('@/services/notificationService');
const mockGetNotifications = getNotifications as jest.MockedFunction<typeof getNotifications>;
const mockMarkAsRead = markNotificationAsRead as jest.MockedFunction<typeof markNotificationAsRead>;
const mockDeleteNotification = deleteNotification as jest.MockedFunction<typeof deleteNotification>;

// Mock the toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

const mockNotifications = [
  {
    id: '1',
    title: 'Test Notification',
    message: 'This is a test notification',
    type: 'info' as const,
    createdAt: new Date().toISOString(),
    read: false,
  },
];

describe('NotificationList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    mockGetNotifications.mockResolvedValue(mockNotifications);
    mockMarkAsRead.mockResolvedValue();
    mockDeleteNotification.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationList />
      </QueryClientProvider>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders notifications when data is loaded', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
      expect(screen.getByText('This is a test notification')).toBeInTheDocument();
    });
  });

  it('renders empty state when no notifications', async () => {
    mockGetNotifications.mockResolvedValue([]);
    
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No hay notificaciones')).toBeInTheDocument();
    });
  });

  it('marks notification as read when clicking the check button', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });

    const checkButton = screen.getByTitle('Marcar como leída');
    fireEvent.click(checkButton);

    await waitFor(() => {
      expect(mockMarkAsRead).toHaveBeenCalledWith('1');
    });
  });

  it('deletes notification when clicking the delete button', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });

    const deleteButton = screen.getByTitle('Eliminar');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteNotification).toHaveBeenCalledWith('1');
    });
  });

  it('shows error toast when notifications fail to load', async () => {
    mockGetNotifications.mockRejectedValue(new Error('Failed to load'));
    
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('No hay notificaciones')).toBeInTheDocument();
    });
  });
});
