import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { getNotifications, markNotificationAsRead, deleteNotification } from '@/services/notificationService';
import { Notification } from '@/types/notification';
import { Bell, Check, Trash2 } from 'lucide-react';

export function NotificationList() {
  const queryClient = useQueryClient();
  
  const { data: notifications, error, isLoading } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });

  React.useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las notificaciones",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!notifications?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay notificaciones
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`p-4 border rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="text-gray-600">{notification.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex space-x-2">
              {!notification.read && (
                <button
                  onClick={() => markAsReadMutation.mutate(notification.id)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  title="Marcar como leída"
                >
                  <Check className="w-4 h-4 text-gray-500" />
                </button>
              )}
              <button
                onClick={() => deleteMutation.mutate(notification.id)}
                className="p-1 hover:bg-gray-100 rounded-full"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
