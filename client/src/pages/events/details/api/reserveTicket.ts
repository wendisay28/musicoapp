/**
 * API client para reservar una entrada a un evento.
 * Envía una solicitud al backend con el ID del evento y el ID del usuario (opcional).
 * El backend se encarga de registrar la reserva y enviar un correo al usuario.
 */

type ReserveTicketParams = {
    eventId: string;
  };
  
  export async function reserveTicket({ eventId }: ReserveTicketParams): Promise<void> {
    try {
      const response = await fetch(`/api/events/${eventId}/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo reservar la entrada');
      }
    } catch (error) {
      console.error('Error al reservar entrada:', error);
      throw error;
    }
  }
  