// client/src/pages/events/details/components/ReserveButton.tsx

import { useState } from "react";
import { reserveTicket } from "../api/reserveTicket";
import { Button } from "@/components/ui/button";

interface ReserveButtonProps {
  eventId: string;
  userId: string;
  isOrganizer: boolean;
  alreadyReserved: boolean;
  onSuccess: () => void;
}

export function ReserveButton({
  eventId,
  userId,
  isOrganizer,
  alreadyReserved,
  onSuccess,
}: ReserveButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isOrganizer) return null;

  const handleReserve = async () => {
    setLoading(true);
    setError("");
    try {
      await reserveTicket({ eventId, userId });
      onSuccess();
    } catch (err) {
      setError("Hubo un error al reservar tu entrada.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {alreadyReserved ? (
        <p className="text-green-600 font-semibold">Ya reservaste una entrada</p>
      ) : (
        <Button onClick={handleReserve} disabled={loading}>
          {loading ? "Reservando..." : "Reservar entrada"}
        </Button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
