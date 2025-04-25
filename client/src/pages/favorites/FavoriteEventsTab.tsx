import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { Calendar } from "lucide-react";
import { Link } from "wouter";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  price: number;
  image: string;
  isFree: boolean;
  eventType: "virtual" | "presencial";
}

interface FavoriteEventsTabProps {
  events: Event[];
  isLoading: boolean;
  onRemove: (id: string) => void;
  onShare: (id: string) => void;
}

export default function FavoriteEventsTab({
  events,
  isLoading,
  onRemove,
  onShare,
}: FavoriteEventsTabProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-xl mb-2">No tienes eventos favoritos</h3>
          <p className="text-muted-foreground mb-6">
            Explora eventos y añádelos a tus favoritos para verlos aquí
          </p>
          <Link href="/">
            <Button>Explorar eventos</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {events.map(event => (
        <div key={event.id} className="relative group">
          <EventCard
            id={event.id}
            name={event.name}
            date={new Date(event.date)}
            location={event.location}
            price={event.price}
            imageUrl={event.image}
            isFree={event.isFree}
            isVirtual={event.eventType === "virtual"}
            onSave={() => onRemove(event.id)}
            onShare={() => onShare(event.id)}
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemove(event.id)}
          >
            ✕
          </Button>
        </div>
      ))}
    </div>
  );
}
