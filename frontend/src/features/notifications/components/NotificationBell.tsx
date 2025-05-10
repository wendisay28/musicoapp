import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { getUnreadNotificationsCount } from '@/services/notificationService';
import { Bell } from 'lucide-react';

export function NotificationBell() {
  const { data: unreadCount, error } = useQuery<number>({
    queryKey: ['notifications', 'unread-count'],
    queryFn: getUnreadNotificationsCount,
  });

  React.useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar el contador de notificaciones",
      });
    }
  }, [error]);

  return (
    <div className="relative">
      <Bell className="w-6 h-6" />
      {unreadCount && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
}
