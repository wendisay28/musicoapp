import React from 'react';
import { Card, CardContent } from "../../../../../components/ui/card";

interface ArtistAboutProps {
  bio: string;
}

export function ArtistAbout({ bio }: ArtistAboutProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground leading-relaxed">{bio}</p>
      </CardContent>
    </Card>
  );
} 