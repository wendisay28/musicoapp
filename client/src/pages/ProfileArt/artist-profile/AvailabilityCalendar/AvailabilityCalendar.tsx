/**
 * Componente principal del calendario de disponibilidad
 * Maneja la lógica de selección y muestra días/horarios disponibles
 */

import { useState } from "react";
import { DayCell } from "./DayCell";
import { TimeSlots } from "./TimeSlots";
import { AvailabilityCalendarProps } from "./types";

export const AvailabilityCalendar = ({
  artistId,
  onSelectSlot,
  className
}: AvailabilityCalendarProps) => {
  // Estado para la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Obtener días disponibles (simulado - en producción sería una API call)
  const days = generateSampleAvailability(artistId);

  // Maneja la selección de una fecha
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelectSlot?.(date);
  };

  // Maneja la selección de un horario específico
  const handleSelectHour = (hour: string) => {
    if (!selectedDate) return;
    const [hours, minutes] = hour.split(':').map(Number);
    const slotDate = new Date(selectedDate);
    slotDate.setHours(hours, minutes);
    onSelectSlot?.(slotDate, hour);
  };

  // Vuelve a la vista del calendario
  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  return (
    <div className={className}>
      {selectedDate ? (
        // Vista de horarios si hay una fecha seleccionada
        <TimeSlots
          slots={getAvailableHours(selectedDate, days)}
          selectedDate={selectedDate}
          onSelect={handleSelectHour}
          onBack={handleBackToCalendar}
        />
      ) : (
        // Vista del calendario (días)
        <>
          {/* Encabezado con días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
              <div key={day} className="text-center text-xs text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          {/* Grid de días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isToday = new Date().toDateString() === day.date.toDateString();
              return (
                <DayCell
                  key={day.date.toString()}
                  date={day.date}
                  status={day.status}
                  isSelected={selectedDate?.toDateString() === day.date.toDateString()}
                  isToday={isToday}
                  onClick={() => handleSelectDate(day.date)}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// --------------------------
// Funciones de ayuda (simulación)
// En producción se reemplazarían por llamadas a la API
// --------------------------

/**
 * Genera datos de disponibilidad de ejemplo
 * @param artistId - ID del artista (no usado en la simulación)
 */
function generateSampleAvailability(artistId: string): AvailabilitySlot[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    return {
      date,
      status: i % 3 !== 0 ? 'available' : 'unavailable', // Simula disponibilidad
      hours: i % 3 !== 0 ? generateRandomHours() : undefined
    };
  });
}

/** 
 * Genera horarios aleatorios para simulación
 */
function generateRandomHours() {
  const hours = [];
  for (let i = 10; i <= 16; i += 2) {
    if (Math.random() > 0.3) { // 70% de probabilidad de horario disponible
      hours.push(`${i}:00`);
    }
  }
  return hours;
}

/**
 * Obtiene los horarios disponibles para una fecha específica
 */
function getAvailableHours(date: Date, days: AvailabilitySlot[]) {
  const day = days.find(d => d.date.toDateString() === date.toDateString());
  return day?.hours || [];
}