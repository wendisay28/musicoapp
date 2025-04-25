// ServiceListSection.tsx
// Esta sección permite al artista agregar una lista de servicios, cada uno con nombre, descripción, precio y video opcional.

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function ServiceListSection() {
  const { control, register } = useFormContext();

  // Utilizamos useFieldArray para manejar un array dinámico de servicios
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services'
  });

  return (
    <div className="space-y-6">
      {/* Título de la sección */}
      <div>
        <h3 className="text-lg font-semibold">Servicios</h3>
        <p className="text-sm text-muted-foreground">
          Agrega uno o más servicios que ofreces como artista.
        </p>
      </div>

      {/* Lista de servicios */}
      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-xl p-4 space-y-4">
          {/* Nombre del servicio */}
          <div className="space-y-2">
            <Label htmlFor={`services.${index}.title`}>Título del Servicio</Label>
            <Input
              id={`services.${index}.title`}
              placeholder="Ej: Sesión musical en vivo"
              {...register(`services.${index}.title`)}
            />
          </div>

          {/* Descripción del servicio */}
          <div className="space-y-2">
            <Label htmlFor={`services.${index}.description`}>Descripción</Label>
            <Textarea
              id={`services.${index}.description`}
              placeholder="Describe lo que incluye el servicio..."
              {...register(`services.${index}.description`)}
            />
          </div>

          {/* Precio del servicio */}
          <div className="space-y-2">
            <Label htmlFor={`services.${index}.price`}>Precio</Label>
            <Input
              id={`services.${index}.price`}
              type="number"
              placeholder="Ej: 150000"
              {...register(`services.${index}.price`)}
            />
          </div>

          {/* Video del servicio (opcional) */}
          <div className="space-y-2">
            <Label htmlFor={`services.${index}.video`}>Video Promocional (opcional)</Label>
            <Input
              id={`services.${index}.video`}
              type="file"
              accept="video/*"
              {...register(`services.${index}.video`)}
            />
          </div>

          {/* Botón para eliminar el servicio */}
          <Button variant="outline" type="button" onClick={() => remove(index)}>
            Eliminar servicio
          </Button>
        </div>
      ))}

      {/* Botón para agregar un nuevo servicio */}
      <Button type="button" onClick={() => append({ title: '', description: '', price: '', video: null })}>
        Agregar Servicio
      </Button>
    </div>
  );
}
