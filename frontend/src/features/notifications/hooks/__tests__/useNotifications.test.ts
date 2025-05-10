import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNotifications } from '../useNotifications';
import {
  getNotifications,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '@/services/notificationService';

// Mock the services
jest.mock('@/services/notificationService');
const mockGetNotifications = getNotifications as jest.MockedFunction<typeof getNotifications>;
const mockGetUnreadCount = getUnreadNotificationsCount as jest.MockedFunction<typeof getUnreadNotificationsCount>;
const mockMarkAsRead = markNotificationAsRead as jest.MockedFunction<typeof markNotificationAsRead>;
const mockMarkAllAsRead = markAllNotificationsAsRead as jest.MockedFunction<typeof markAllNotificationsAsRead>;
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

describe('useNotifications', () => {
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
    mockGetUnreadCount.mockResolvedValue(1);
    mockMarkAsRead.mockResolvedValue();
    mockMarkAllAsRead.mockResolvedValue();
    mockDeleteNotification.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches notifications and unread count', async () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.notifications).toEqual(mockNotifications);
    expect(result.current.unreadCount).toBe(1);
    expect(result.current.isLoading).toBe(false);
  });

  it('marks notification as read', async () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      result.current.markAsRead('1');
    });

    expect(mockMarkAsRead).toHaveBeenCalledWith('1');
  });

  it('marks all notifications as read', async () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      result.current.markAllAsRead();
    });

    expect(mockMarkAllAsRead).toHaveBeenCalled();
  });

  it('deletes notification', async () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      result.current.deleteNotification('1');
    });

    expect(mockDeleteNotification).toHaveBeenCalledWith('1');
  });

  it('handles errors when fetching notifications', async () => {
    mockGetNotifications.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useNotifications(), { wrapper });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBeTruthy();
  });
}); 