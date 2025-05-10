import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { Textarea } from '@/features/shared/components/ui/textarea';
import { Button } from '@/features/shared/components/ui/button';

interface BusinessSettingsProps {
  businessId: string;
}

interface BusinessSettings {
  name: string;
  description: string;
}

const CardComponent = Card as any;
const CardHeaderComponent = CardHeader as any;
const CardTitleComponent = CardTitle as any;
const CardContentComponent = CardContent as any;
const LabelComponent = Label as any;
const InputComponent = Input as any;
const TextareaComponent = Textarea as any;
const ButtonComponent = Button as any;

export function BusinessSettings({ businessId }: BusinessSettingsProps) {
  const [settings, setSettings] = useState<BusinessSettings>({
    name: '',
    description: ''
  });

  useEffect(() => {
    // Aquí se implementaría la llamada a la API para cargar la configuración
    console.log('Loading settings for business:', businessId);
  }, [businessId]);

  const handleSave = () => {
    // Aquí se implementaría la llamada a la API para guardar la configuración
    console.log('Saving settings for business:', businessId, settings);
  };

  return (
    <CardComponent>
      <CardHeaderComponent>
        <CardTitleComponent>Configuración</CardTitleComponent>
      </CardHeaderComponent>
      <CardContentComponent className="space-y-4">
        <div className="space-y-2">
          <LabelComponent htmlFor="name">Nombre del Negocio</LabelComponent>
          <InputComponent 
            id="name" 
            value={settings.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <LabelComponent htmlFor="description">Descripción</LabelComponent>
          <TextareaComponent 
            id="description"
            value={settings.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSettings(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <ButtonComponent onClick={handleSave}>Guardar Cambios</ButtonComponent>
      </CardContentComponent>
    </CardComponent>
  );
} 