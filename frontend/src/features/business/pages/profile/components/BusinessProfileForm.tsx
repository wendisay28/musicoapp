import { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { Textarea } from '@/features/shared/components/ui/textarea';
import { Button } from '@/features/shared/components/ui/button';

interface BusinessProfile {
  id: string;
  name: string;
  description: string;
}

interface BusinessProfileFormProps {
  profile: BusinessProfile;
}

const CardComponent = Card as any;
const CardHeaderComponent = CardHeader as any;
const CardTitleComponent = CardTitle as any;
const CardContentComponent = CardContent as any;
const LabelComponent = Label as any;
const InputComponent = Input as any;
const TextareaComponent = Textarea as any;
const ButtonComponent = Button as any;

export function BusinessProfileForm({ profile }: BusinessProfileFormProps): JSX.Element {
  return (
    <CardComponent>
      <CardHeaderComponent>
        <CardTitleComponent>Perfil del Negocio</CardTitleComponent>
      </CardHeaderComponent>
      <CardContentComponent className="space-y-4">
        <div className="space-y-2">
          <LabelComponent htmlFor="name">Nombre del Negocio</LabelComponent>
          <InputComponent id="name" defaultValue={profile.name} />
        </div>
        <div className="space-y-2">
          <LabelComponent htmlFor="description">Descripción</LabelComponent>
          <TextareaComponent id="description" defaultValue={profile.description} />
        </div>
        <ButtonComponent>Guardar Cambios</ButtonComponent>
      </CardContentComponent>
    </CardComponent>
  );
} 