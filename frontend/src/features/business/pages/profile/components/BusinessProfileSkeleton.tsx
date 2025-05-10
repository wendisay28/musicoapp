import { JSX } from 'react';
import { Card, CardContent, CardHeader } from '@/features/shared/components/ui/card';

const CardComponent = Card as any;
const CardHeaderComponent = CardHeader as any;
const CardContentComponent = CardContent as any;

export function BusinessProfileSkeleton(): JSX.Element {
  return (
    <CardComponent>
      <CardHeaderComponent>
        <div className="h-6 w-48 bg-muted animate-pulse rounded" />
      </CardHeaderComponent>
      <CardContentComponent className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-10 w-full bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-32 w-full bg-muted animate-pulse rounded" />
        </div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </CardContentComponent>
    </CardComponent>
  );
} 