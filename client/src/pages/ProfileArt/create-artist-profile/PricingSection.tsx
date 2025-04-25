// PricingSection.tsx
// Esta sección del formulario permite al artista definir su rango de precios y la unidad de cobro.

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PricingSection() {
  // Obtenemos funciones del contexto del formulario
  const { register, setValue, watch } = useFormContext();
  const priceUnit = watch('priceUnit');

  return (
    <div className="space-y-6">
      {/* Rango de precios: mínimo y máximo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minPrice">Precio Mínimo</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="Ej: 50000"
            {...register('minPrice')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Precio Máximo</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Ej: 200000"
            {...register('maxPrice')}
          />
        </div>
      </div>

      {/* Unidad de precio: hora, evento o día */}
      <div className="space-y-2">
        <Label htmlFor="priceUnit">Unidad de Precio</Label>
        <Select value={priceUnit} onValueChange={(value) => setValue('priceUnit', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona la unidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hora">Por Hora</SelectItem>
            <SelectItem value="evento">Por Evento</SelectItem>
            <SelectItem value="dia">Por Día</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
