
import { Calendar } from './ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '../lib/utils';

export interface AvailabilityCalendarProps {
  /** Fechas disponibles */
  availableDates: Date[];
  /** Fechas no disponibles */
  unavailableDates: Date[];
  /** Fecha seleccionada */
  selectedDate?: Date;
  /** Callback cuando se selecciona una fecha */
  onDateSelect?: (date: Date | undefined) => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar el calendario de disponibilidad de un artista
 * @component
 * @example
 * ```tsx
 * <AvailabilityCalendar
 *   availableDates={[new Date('2024-03-20'), new Date('2024-03-21')]}
 *   unavailableDates={[new Date('2024-03-22')]}
 *   selectedDate={new Date('2024-03-20')}
 *   onDateSelect={(date) => console.log(date)}
 * />
 * ```
 */
export function AvailabilityCalendar({
  availableDates,
  unavailableDates,
  selectedDate,
  onDateSelect,
  className
}: AvailabilityCalendarProps) {
  const modifiers = {
    available: (date: Date) => 
      availableDates.some(d => d.toDateString() === date.toDateString()),
    unavailable: (date: Date) => 
      unavailableDates.some(d => d.toDateString() === date.toDateString())
  };

  const modifiersStyles = {
    available: {
      backgroundColor: 'rgb(34 197 94)',
      color: 'white',
      borderRadius: '50%'
    },
    unavailable: {
      backgroundColor: 'rgb(239 68 68)',
      color: 'white',
      borderRadius: '50%'
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Disponibilidad</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border"
          />
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span>No disponible</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 