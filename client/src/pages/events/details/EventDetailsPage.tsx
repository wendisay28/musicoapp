// client/src/pages/events/details/EventDetailsPage.tsx

import { useParams } from 'react-router-dom';
import { useEventDetails } from './hooks/useEventDetails';
import { EventHeader } from './components/EventHeader';
import { EventInfoCard } from './components/EventInfoCard';
import { AttendeesTab } from './components/AttendeesTab';
import { OrganizerTab } from './components/OrganizerTab';

export function EventDetailsPage() {
  const { id } = useParams();
  const { event, isLoading, isError } = useEventDetails(id);

  if (isLoading) return <p>Cargando evento...</p>;
  if (isError || !event) return <p>Error al cargar el evento.</p>;

  return (
    <div className="space-y-4">
      <EventHeader event={event} />
      <EventInfoCard event={event}>
        <div className="mt-4">
          <AttendeesTab attendees={event.attendees} />
          <OrganizerTab organizer={event.organizer} />
        </div>
      </EventInfoCard>
    </div>
  );
}
