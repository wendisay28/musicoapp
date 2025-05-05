import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArtistCard } from '@/components/cards/ArtistCard';

import { UserX } from "lucide-react";
import { Link } from "wouter";

interface Artist {
  id: string;
  displayName: string;
  role: string;
  minPrice: number;
  priceUnit?: string;
  photoURL: string;
}

interface FavoriteArtistsTabProps {
  artists: Artist[];
  isLoading: boolean;
  onRemove: (id: string) => void;
}

export default function FavoriteArtistsTab({
  artists,
  isLoading,
  onRemove,
}: FavoriteArtistsTabProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <UserX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-xl mb-2">No tienes artistas favoritos</h3>
          <p className="text-muted-foreground mb-6">
            Explora artistas y añádelos a tus favoritos para verlos aquí
          </p>
          <Link href="/explore">
            <Button>Explorar artistas</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {artists.map(artist => (
        <div key={artist.id} className="relative group">
          <ArtistCard
            id={artist.id}
            name={artist.displayName}
            role={artist.role}
            price={artist.minPrice}
            priceUnit={artist.priceUnit || "hora"}
            imageUrl={artist.photoURL}
            variant="horizontal"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemove(artist.id)}
          >
            ✕
          </Button>
        </div>
      ))}
    </div>
  );
}
