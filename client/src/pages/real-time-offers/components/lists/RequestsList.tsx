import { RequestCard } from "../cards/RequestCard";

interface Request {
  id: number;
  title: string;
  description: string;
  status: "active" | "completed" | "cancelled";
  location: string;
  date: string;
  time: string;
  price: number;
  tags?: string[];
  responses: Array<{
    id: number;
    artistId: string;
    price: number;
    status: 'pending' | 'accepted' | 'rejected';
    artistName: string;
    artistPhoto: string;
    artistRating: number;
  }>;
}

interface RequestsListProps {
  requests: Request[];
  onViewDetails?: (requestId: number) => void;
  onContact?: (requestId: number) => void;
}

export function RequestsList({ requests, onViewDetails, onContact }: RequestsListProps) {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onViewDetails={() => onViewDetails?.(request.id)}
          onContact={() => onContact?.(request.id)}
        />
      ))}
    </div>
  );
} 