// AvailabilitySection.tsx
// Esta sección permite al artista indicar su disponibilidad a través de un selector de fechas tipo calendario.

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar'; // Debes tener un componente <Calendar /> ya implementado o usar uno como react-day-picker
import { Badge } from '@/components/ui/badge';

export default function AvailabilitySection() {
  // Obtenemos funciones del contexto del formulario
  const { setValue, watch } = useFormContext();
  const availability = watch('availability') || [];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toggleDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]; // Convertir fecha a YYYY-MM-DD
    const updated = availability.includes(dateStr)
      ? availability.filter((d: string) => d !== dateStr)
      : [...availability, dateStr];

    setValue('availability', updated);
  };

  return (
    <div className="space-y-4">
      {/* Título y descripción */}
      <div>
        <Label htmlFor="availability">Disponibilidad</Label>
        <p className="text-sm text-muted-foreground">
          Selecciona las fechas en las que estás disponible. Puedes hacer clic nuevamente para desmarcarlas.
        </p>
      </div>

      {/* Componente de calendario */}
      <Calendar
        mode="single"
        selected={selectedDate || undefined}
        onSelect={(date) => {
          if (date) {
            setSelectedDate(date);
            toggleDate(date);
          }
        }}
      />

      {/* Fechas seleccionadas (visualmente con badges) */}
      <div className="flex flex-wrap gap-2">
        {availability.map((dateStr: string) => (
          <Badge key={dateStr} variant="outline">
            {dateStr}
          </Badge>
        ))}
      </div>
    </div>
  );
}
