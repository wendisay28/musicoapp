// client/src/pages/events/details/components/EventInfoCard.tsx

import { ReactNode } from "react";
import { Event } from "@/types/models";
import { ReserveButton } from "./ReserveButton";

interface EventInfoCardProps {
  event: Event;
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
        <ReserveButton eventId={event.id} isCreator={event.isCreator} attendees={event.attendees} />
      </div>
      {children}
    </div>
  );
}
