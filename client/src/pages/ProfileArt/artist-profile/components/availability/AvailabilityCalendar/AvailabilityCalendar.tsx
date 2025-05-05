/**
 * Componente principal del calendario de disponibilidad
 * Maneja la lógica de selección y muestra días/horarios disponibles
 */

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { TimeSlots } from "./TimeSlots";
import { AvailabilityStatus, AvailabilitySlot } from "@/pages/ProfileArt/common/types/artist";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  onSelectSlot?: (date: Date, hour?: string) => void;
  className?: string;
}

export default function AvailabilityCalendar({ onSelectSlot, className }: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const slots = generateAvailabilityForDate(date);
      setAvailability(slots);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate && onSelectSlot) {
      onSelectSlot(selectedDate, time);
    }
  };

  const handleBack = () => {
    setSelectedDate(undefined);
  };

  const generateAvailabilityForDate = (date: Date): AvailabilitySlot[] => {
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    
    return hours.map(hour => ({
      date: new Date(date.setHours(parseInt(hour.split(':')[0]))),
      status: AvailabilityStatus.AVAILABLE,
      hours: [hour]
    }));
  };

  const getAvailableHours = (): string[] => {
    return availability
      .flatMap(slot => slot.hours || [])
      .filter((hour): hour is string => hour !== undefined);
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border"
      />
      {selectedDate && (
        <TimeSlots
          slots={getAvailableHours()}
          selectedDate={selectedDate}
          onSelect={handleTimeSelect}
          onBack={handleBack}
        />
      )}
    </div>
  );
}