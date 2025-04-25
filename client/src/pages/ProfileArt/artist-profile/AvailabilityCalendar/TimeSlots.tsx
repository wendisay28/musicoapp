/**
 * Componente que muestra los horarios disponibles para una fecha seleccionada
 * Permite elegir un horario específico o volver al calendario
 */

import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock } from "lucide-react";

interface TimeSlotsProps {
  slots: string[];              // Horarios disponibles (ej: ["10:00", "14:00"])
  selectedDate: Date;           // Fecha seleccionada
  onSelect: (hour: string) => void; // Al seleccionar horario
  onBack: () => void;           // Para volver al calendario
}

export const TimeSlots = ({
  slots,
  selectedDate,
  onSelect,
  onBack
}: TimeSlotsProps) => {
  // Formatea la fecha en español (ej: "lunes, 20 de noviembre")
  const formattedDate = selectedDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="space-y-4">
      {/* Botón para volver al calendario */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="px-0 text-primary hover:bg-transparent hover:text-primary/80"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Volver
      </Button>

      {/* Encabezado con fecha */}
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4" />
        <span>{formattedDate}</span>
      </div>

      {/* Lista de horarios disponibles */}
      <div className="grid grid-cols-2 gap-2">
        {slots.map((hour) => (
          <Button
            key={hour}
            variant="outline"
            onClick={() => onSelect(hour)}
            className="flex items-center gap-2"
          >
            {hour}
          </Button>
        ))}
      </div>
    </div>
  );
};