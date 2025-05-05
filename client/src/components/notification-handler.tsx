import { useEffect, useState, useCallback, useRef } from 'react';
import { Bell, Check, Trash2,  Info, Calendar, MessageSquare, BookOpen, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos de notificaciones extendidos
export type NotificationType = 
  | 'message' 
  | 'event' 
  | 'blog' 
  | 'review' 
  | 'favorite' 
  | 'booking' 
  | 'system';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
  data?: Record<string, any>;
}

// Configuración de reconexión
const RECONNECT_DELAY = 1000;
const MAX_RECONNECT_ATTEMPTS = 5;

// Sonidos de notificación
const NOTIFICATION_SOUND = new Audio('/sounds/notification.mp3');
const ERROR_SOUND = new Audio('/sounds/error.mp3');

// Iconos por tipo de notificación
const NOTIFICATION_ICONS: Record<NotificationType, React.ReactNode> = {
  message: <MessageSquare className="h-5 w-5" />,
  event: <Calendar className="h-5 w-5" />,
  blog: <BookOpen className="h-5 w-5" />,
  review: <Star className="h-5 w-5" />,
  favorite: <Heart className="h-5 w-5" />,
  booking: <Calendar className="h-5 w-5" />,
  system: <Info className="h-5 w-5" />
};

export default function NotificationHandler() {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    // Cargar notificaciones del localStorage
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast();

  // Guardar notificaciones en localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Actualizar contador de no leídos
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Función de reconexión con backoff exponencial
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(`wss://${window.location.hostname}/ws`);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setReconnectAttempts(0);
      toast({
        title: "Conexión establecida",
        description: "Las notificaciones están activas"
      });
    };

    ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Reproducir sonido de notificación
        NOTIFICATION_SOUND.play().catch(() => {});
        
        // Mostrar toast
        toast({
          title: notification.title,
          description: notification.message
        });
      } catch (error) {
        console.error('Error al procesar notificación:', error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        const delay = RECONNECT_DELAY * Math.pow(2, reconnectAttempts);
        setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
          connectWebSocket();
        }, delay);
      } else {
        ERROR_SOUND.play().catch(() => {});
        toast({
          title: "Error de conexión",
          description: "No se pudo conectar al servidor de notificaciones",
          variant: "destructive"
        });
      }
    };

    ws.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      ERROR_SOUND.play().catch(() => {});
    };
  }, [reconnectAttempts, toast]);

  // Iniciar conexión
  useEffect(() => {
    connectWebSocket();
    return () => {
      wsRef.current?.close();
    };
  }, [connectWebSocket]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            </motion.div>
          )}
          {!isConnected && (
            <Badge 
              variant="outline" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              !
            </Badge>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="absolute right-0 mt-2 w-80 z-50">
              <div className="p-2 border-b flex justify-between items-center">
                <h3 className="font-semibold">Notificaciones</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={markAllAsRead}
                  >
                    Marcar todas como leídas
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearAllNotifications}
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
              <ScrollArea className="h-[400px]">
                {notifications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No hay notificaciones
                  </p>
                ) : (
                  <div className="space-y-4 p-4">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-3 rounded-lg border ${!notification.read ? 'bg-muted' : ''}`}
                      >
                        <div className="flex gap-2 items-start mb-2">
                          <div className="mt-1">
                            {NOTIFICATION_ICONS[notification.type]}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-6 w-6 text-destructive"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}