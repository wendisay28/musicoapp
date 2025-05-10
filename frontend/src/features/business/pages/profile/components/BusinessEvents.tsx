import { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';

interface BusinessEventsProps {
  businessId: string;
}

const CardComponent = Card as any;
const CardHeaderComponent = CardHeader as any;
const CardTitleComponent = CardTitle as any;
const CardContentComponent = CardContent as any;
const ButtonComponent = Button as any;

export function BusinessEvents({ businessId }: BusinessEventsProps): JSX.Element {
  return (
    <CardComponent>
      <CardHeaderComponent>
        <CardTitleComponent>Eventos</CardTitleComponent>
      </CardHeaderComponent>
      <CardContentComponent>
        <ButtonComponent onClick={() => console.log('Crear evento para negocio:', businessId)}>
          Crear Nuevo Evento
        </ButtonComponent>
      </CardContentComponent>
    </CardComponent>
  );
} 