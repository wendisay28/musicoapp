/**
 * Tipos para el componente de disponibilidad del artista
 * Define las estructuras de datos y props del componente
 */

// Representa un slot de disponibilidad (fecha + horarios)
export interface AvailabilitySlot {
  date: Date;                   // Fecha del slot
  status: 'available' | 'unavailable'; // Estado de disponibilidad
  hours?: string[];             // Horarios disponibles (ej: ["10:00", "14:00"])
}

// Props del componente principal
export interface AvailabilityCalendarProps {
  artistId: string;             // ID del artista
  onSelectSlot?: (date: Date, hour?: string) => void; // Callback al seleccionar
  className?: string;           // Clases CSS adicionales
}