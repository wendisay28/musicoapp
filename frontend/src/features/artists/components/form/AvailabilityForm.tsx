import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/features/shared/components/ui/label';
import { Calendar } from '@/features/shared/components/ui/calendar';
import { Badge } from '@/features/shared/components/ui/badge';

type DateString = string; // formato YYYY-MM-DD

interface AvailabilityFormProps {
  defaultDates?: DateString[];
  onChange?: (dates: DateString[]) => void;
}

export function AvailabilityForm({ defaultDates = [], onChange }: AvailabilityFormProps): JSX.Element {
  const { setValue, watch } = useFormContext();
  const availability: DateString[] = watch('availability') || defaultDates;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toggleDate = (date: Date): void => {
    const dateStr = date.toISOString().split('T')[0];
    const updated = availability.includes(dateStr)
      ? availability.filter((d) => d !== dateStr)
      : [...availability, dateStr].sort();
    
    setValue('availability', updated);
    onChange?.(updated);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="availability">Disponibilidad</Label>
        <p className="text-sm text-muted-foreground">
          Selecciona las fechas en las que estás disponible. Puedes hacer clic nuevamente para desmarcarlas.
        </p>
      </div>
      
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date: Date | null) => {
          if (date) {
            setSelectedDate(date);
            toggleDate(date);
          }
        }}
      />
      
      <div className="flex flex-wrap gap-2">
        {availability.map((dateStr) => (
          <Badge key={dateStr} variant="outline">
            {dateStr}
          </Badge>
        ))}
      </div>
    </div>
  );
}
