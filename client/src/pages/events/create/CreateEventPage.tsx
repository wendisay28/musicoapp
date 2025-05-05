// client/src/pages/events/create/CreateEventPage.tsx

import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { EventForm } from '@/components/events/EventForm';
import { createEvent } from '@/services/events';
import type { EventFormData } from '@/types/artist';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  const onSubmit = async (data: EventFormData) => {
    try {
      await createEvent(data);
      navigate('/events');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Crear Nuevo Evento</CardTitle>
        </CardHeader>
        <CardContent>
          <EventForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
