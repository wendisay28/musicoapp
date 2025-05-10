import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import {
  getNotifications,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from '@/services/notificationService';
import { Notification } from '@/types/notification';

export function useNotifications() {
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    error: notificationsError,
  } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  const {
    data: unreadCount,
    isLoading: isLoadingUnreadCount,
    error: unreadCountError,
  } = useQuery<number>({
    queryKey: ['notifications', 'unread-count'],
    queryFn: getUnreadNotificationsCount,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
      toast({
        title: 'Notificación marcada como leída',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo marcar la notificación como leída',
      });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
      toast({
        title: 'Todas las notificaciones marcadas como leídas',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudieron marcar todas las notificaciones como leídas',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
      toast({
        title: 'Notificación eliminada',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar la notificación',
      });
    },
  });

  return {
    notifications,
    unreadCount,
    isLoading: isLoadingNotifications || isLoadingUnreadCount,
    error: notificationsError || unreadCountError,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    deleteNotification: deleteMutation.mutate,
  };
} 