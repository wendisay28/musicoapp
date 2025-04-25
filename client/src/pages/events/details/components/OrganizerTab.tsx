// client/src/pages/events/details/components/OrganizerTab.tsx

import { User } from "@/types/models";

interface OrganizerTabProps {
  organizer: User;
}

export function OrganizerTab({ organizer }: OrganizerTabProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Organizador</h2>
      <div className="border p-4 rounded-lg">
        <p className="font-medium text-lg">{organizer.name}</p>
        <p className="text-gray-600">{organizer.email}</p>
        {organizer.bio && <p className="mt-2 text-gray-700">{organizer.bio}</p>}
      </div>
    </div>
  );
}
