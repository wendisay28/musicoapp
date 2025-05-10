import { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';

const CardComponent = Card as any;
const CardHeaderComponent = CardHeader as any;
const CardTitleComponent = CardTitle as any;
const CardContentComponent = CardContent as any;

export function Reports(): JSX.Element {
  return (
    <CardComponent>
      <CardHeaderComponent>
        <CardTitleComponent>Reportes</CardTitleComponent>
      </CardHeaderComponent>
      <CardContentComponent>
        <p className="text-muted-foreground">Reportes en desarrollo...</p>
      </CardContentComponent>
    </CardComponent>
  );
} 