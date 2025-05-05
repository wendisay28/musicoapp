// client/src/pages/events/details/components/AttendeesTab.tsx

interface AttendeesTabProps {
  attendees: number;
}

export function AttendeesTab({ attendees }: AttendeesTabProps) {
  if (attendees === 0) {
    return <p className="text-gray-500">Aún no hay asistentes.</p>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Asistentes</h2>
      <p className="text-gray-600">{attendees} personas asistirán</p>
    </div>
  );
}
