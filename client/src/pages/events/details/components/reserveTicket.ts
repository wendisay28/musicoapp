// client/src/pages/events/details/api/reserveTicket.ts

import axios from "axios";

interface ReserveTicketParams {
  eventId: string;
  userId: string;
}

export async function reserveTicket({ eventId, userId }: ReserveTicketParams) {
  await axios.post(`/api/events/${eventId}/reserve`, { userId });
}
