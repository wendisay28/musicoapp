import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  virtualLink?: string;
}

export function useGoogleCalendar() {
  const { toast } = useToast();

  const addToGoogleCalendar = useCallback(async (event: Event) => {
    try {
      // Formatear fechas para Google Calendar
      const start = new Date(event.startDate).toISOString();
      const end = new Date(event.endDate).toISOString();

      // Crear URL para Google Calendar
      const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
      googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
      googleCalendarUrl.searchParams.append('text', event.title);
      googleCalendarUrl.searchParams.append('details', event.description);
      googleCalendarUrl.searchParams.append('dates', `${start}/${end}`);
      
      if (event.location) {
        googleCalendarUrl.searchParams.append('location', event.location);
      }

      // Abrir Google Calendar en una nueva pestaña
      window.open(googleCalendarUrl.toString(), '_blank');

      toast({
        title: 'Recordatorio agregado',
        description: 'El evento ha sido agregado a tu calendario de Google'
      });
    } catch (error) {
      console.error('Error adding to Google Calendar:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo agregar el evento a Google Calendar'
      });
    }
  }, [toast]);

  const sendReminder = useCallback(async (event: Event, email: string) => {
    try {
      // Aquí se implementaría la lógica para enviar recordatorios por email
      // usando un servicio de email como SendGrid o similar
      
      toast({
        title: 'Recordatorio enviado',
        description: 'Se ha enviado un recordatorio por email'
      });
    } catch (error) {
      console.error('Error sending reminder:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo enviar el recordatorio'
      });
    }
  }, [toast]);

  return {
    addToGoogleCalendar,
    sendReminder
  };
} 