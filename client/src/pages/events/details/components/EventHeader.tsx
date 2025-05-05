// client/src/pages/events/details/components/EventHeader.tsx

import { Event } from '@/types/artist';
import { Button } from "@/components/ui/button";

interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  const isOnline = event.location?.coordinates === undefined;

  return (
    <div className="relative w-full">
      <img
        src={event.imageURL || '/placeholder-event.jpg'}
        alt={event.title}
        className="w-full h-64 object-cover rounded-xl"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="outline">Compartir</Button>
        {/* Puedes condicionar si es el organizador para mostrar botón editar */}
        {/* <Button variant="default">Editar</Button> */}
      </div>
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-xl shadow">
        <span className="text-sm font-semibold text-gray-700">
          {isOnline ? "Evento Virtual" : "Evento Presencial"}
        </span>
      </div>
    </div>
  );
}
