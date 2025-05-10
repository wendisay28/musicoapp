import { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';

interface BusinessSpacesProps {
  businessId: string;
}

const CardComponent = Card as any;
const CardHeaderComponent = CardHeader as any;
const CardTitleComponent = CardTitle as any;
const CardContentComponent = CardContent as any;
const ButtonComponent = Button as any;

export function BusinessSpaces({ businessId }: BusinessSpacesProps): JSX.Element {
  return (
    <CardComponent>
      <CardHeaderComponent>
        <CardTitleComponent>Espacios</CardTitleComponent>
      </CardHeaderComponent>
      <CardContentComponent>
        <ButtonComponent onClick={() => console.log('Agregar espacio para negocio:', businessId)}>
          Agregar Nuevo Espacio
        </ButtonComponent>
      </CardContentComponent>
    </CardComponent>
  );
} 