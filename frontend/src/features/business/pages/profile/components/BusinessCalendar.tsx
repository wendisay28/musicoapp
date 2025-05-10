import { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';

interface BusinessCalendarProps {
  businessId: string;
}

const CardComponent = Card as any;
const CardHeaderComponent = CardHeader as any;
const CardTitleComponent = CardTitle as any;
const CardContentComponent = CardContent as any;

export function BusinessCalendar({ businessId }: BusinessCalendarProps): JSX.Element {
  return (
    <CardComponent>
      <CardHeaderComponent>
        <CardTitleComponent>Calendario</CardTitleComponent>
      </CardHeaderComponent>
      <CardContentComponent>
        <p className="text-muted-foreground">Calendario en desarrollo para negocio ID: {businessId}</p>
      </CardContentComponent>
    </CardComponent>
  );
} 