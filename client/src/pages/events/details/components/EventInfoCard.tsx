// client/src/pages/events/details/components/EventInfoCard.tsx

import { ReactNode } from "react";
import { Event } from '@/types/artist';
import { ReserveButton } from "./ReserveButton";

interface EventInfoCardProps {
  event: Event & { date: string | Date }; // Añadir date al tipo Event
  children?: ReactNode;
}

export function EventInfoCard({ event, children }: EventInfoCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-600 mt-2">{event.description}</p>
      <p className="text-sm text-gray-500 mt-1">
        Fecha: {new Date(event.date).toLocaleDateString()} -{" "}
        {new Date(event.date).toLocaleTimeString()}
      </p>
      <div className="mt-4">
        <ReserveButton 
          eventId={event.id} 
          isOrganizer={event.organizer.id === "current-user-id"}
          alreadyReserved={false}
          onSuccess={() => window.location.reload()}
        />
      </div>
      {children}
    </div>
  );
}