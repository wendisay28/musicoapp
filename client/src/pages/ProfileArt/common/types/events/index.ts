import { z } from 'zod';

/**
 * Tipo de evento
 */
export enum EventType {
  VIRTUAL = 'virtual',
  IN_PERSON = 'in-person'
}

/**
 * Estado del evento
 */
export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

/**
 * Esquema de validación para la ubicación del evento
 */
export const eventLocationSchema = z.object({
  address: z.string(),
  city: z.string(),
  country: z.string(),
  coordinates: z.tuple([z.number(), z.number()]).optional()
});

/**
 * Esquema de validación para el evento
 */
export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  date: z.string().datetime(),
  image: z.string().url(),
  type: z.nativeEnum(EventType),
  location: eventLocationSchema.optional(),
  virtualLink: z.string().url().optional(),
  category: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  artistId: z.string(),
  price: z.number().min(0).optional(),
  capacity: z.number().min(1).optional(),
  isFeatured: z.boolean().default(false),
  status: z.nativeEnum(EventStatus).default(EventStatus.UPCOMING)
}).refine(
  data => data.type !== EventType.IN_PERSON || data.location,
  {
    message: 'La ubicación es requerida para eventos presenciales',
    path: ['location']
  }
).refine(
  data => data.type !== EventType.VIRTUAL || data.virtualLink,
  {
    message: 'El enlace virtual es requerido para eventos en línea',
    path: ['virtualLink']
  }
);

/**
 * Tipo inferido del esquema de evento
 */
export type Event = z.infer<typeof eventSchema>;

/**
 * Propiedades para el componente de lista de eventos
 */
export interface EventListProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
  isLoading?: boolean;
}

/**
 * Propiedades para el componente de detalle de evento
 */
export interface EventDetailsProps {
  event: Event;
  onUpdate?: (updatedEvent: Partial<Event>) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading?: boolean;
}

/**
 * Propiedades para el formulario de evento
 */
export interface EventFormProps {
  initialData?: Partial<Event>;
  onSubmit: (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isLoading?: boolean;
} 