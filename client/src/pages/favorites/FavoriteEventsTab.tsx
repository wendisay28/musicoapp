import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BaseCard from "@/components/artist-card";
import { Calendar } from "lucide-react";
import { Link } from "wouter";
import { Event } from "@/types/models";

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
          <Link href="/explore">
            <Button>Explorar eventos</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <BaseCard
          key={event.id}
          id={event.id}
          title={event.name}
          image={event.image}
          description={event.description}
          location={event.location}
          type="event"
          onFavorite={() => onRemove(event.id)}
          isFavorite={true}
          additionalInfo={{
            date: event.date,
            capacity: event.capacity,
            isOpen: !new Date(event.date) < new Date()
          }}
        />
      ))}
    </div>
  );
}
