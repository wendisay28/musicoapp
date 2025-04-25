// client/src/pages/events/details/components/AttendeesTab.tsx

import { User } from "@/types/models";

interface AttendeesTabProps {
  attendees: User[];
}

export function AttendeesTab({ attendees }: AttendeesTabProps) {
  if (attendees.length === 0) {
    return <p className="text-gray-500">Aún no hay asistentes.</p>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Asistentes</h2>
      <ul className="space-y-1">
        {attendees.map((user) => (
          <li key={user.id} className="border p-3 rounded-lg">
            <span className="font-medium">{user.name}</span> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
