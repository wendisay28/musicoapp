import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Event } from '@/types/artist';
import { useAuth } from '@/context/auth-context';
import { useCallback, useMemo } from 'react';

// Removed unused ApiResponse interface

interface UseEventsReturn {
  events: Event[];
  isLoading: boolean;
  error: unknown;
  isEmpty: boolean;
  refetch: () => Promise<void>;
  upcomingEvents: Event[];
  pastEvents: Event[];
}

/**
 * Hook personalizado para manejar la lógica de eventos
 */
export function useEvents(): UseEventsReturn {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { 
    data, 
    isLoading, 
    error
  } = useQuery<Event[]>({
    queryKey: ['user-events', user?.uid],
    queryFn: async () => {
      if (!user?.uid) return [];
      
      try {
        const response = await apiRequest({
          method: 'GET',
          url: `/api/users/${user.uid}/events`
        });
        const json = await response.json();
        return json.data || [];
      } catch (err) {
        console.error('Error fetching events:', err);
        return [];
      }
    },
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  });

  const refetch = useCallback(async () => {
    await queryClient.invalidateQueries({ 
      queryKey: ['user-events', user?.uid]
    });
  }, [queryClient, user?.uid]);

  const { sortedEvents, upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    const events = data || [];

    const sorted = [...events].sort((a, b) => 
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    const upcoming = sorted.filter(event => 
      new Date(event.startDate) >= now
    );

    const past = sorted.filter(event => 
      new Date(event.startDate) < now
    );

    return { 
      sortedEvents: sorted, 
      upcomingEvents: upcoming, 
      pastEvents: past 
    };
  }, [data]);

  return {
    events: sortedEvents,
    isLoading,
    error,
    isEmpty: !isLoading && sortedEvents.length === 0,
    refetch,
    upcomingEvents,
    pastEvents
  };
}