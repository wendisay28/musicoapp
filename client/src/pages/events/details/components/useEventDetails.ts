// client/src/pages/events/details/hooks/useEventDetails.ts

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Event } from "@/types/models";

export const useEventDetails = (eventId: string) => {
  return useQuery<Event>({
    queryKey: ["eventDetails", eventId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/events/${eventId}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
