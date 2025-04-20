import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

// ==================== TIPOS COMPARTIDOS ====================
export const EventTypeSchema = z.enum(['virtual', 'in-person']);
export type EventType = z.infer<typeof EventTypeSchema>;

export const UserRoleSchema = z.enum(['artist', 'client', 'admin']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const FavoriteTypeSchema = z.enum(['artist', 'event']);
export type FavoriteType = z.infer<typeof FavoriteTypeSchema>;

// ==================== ESQUEMA DE EVENTO MEJORADO ====================
export const eventSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(100),
  description: z.string().min(1, 'Descripción requerida').max(1000),
  eventType: EventTypeSchema,
  date: z.instanceof(Timestamp),
  location: z.string().max(200).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  virtualLink: z.string()
    .url('URL inválida')
    .refine(val => val?.startsWith('http'), {
      message: 'Debe comenzar con http/https'
    })
    .optional(),
  price: z.number().min(0),
  isFree: z.boolean(),
  image: z.string().url().optional(),
  creatorId: z.string(),
  attendees: z.array(z.string()).default([]),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp).optional()
})
.refine(data => data.eventType !== 'in-person' || data.location, {
  message: 'Ubicación requerida para eventos presenciales',
  path: ['location']
})
.refine(data => data.eventType !== 'virtual' || data.virtualLink, {
  message: 'Enlace virtual requerido para eventos online',
  path: ['virtualLink']
});

// ==================== TIPOS PARA EL FORMULARIO ====================
export type EventFormValues = Omit<
  z.infer<typeof eventSchema>, 
  'creatorId' | 'attendees' | 'createdAt' | 'updatedAt' | 'date'
> & {
  date: string;
  name: string;
  description: string;
  eventType: EventType;
  price: number;
  isFree: boolean;
  image?: string;
};

// Tipo completo para la base de datos
export interface Event extends z.infer<typeof eventSchema> {
  id: string;
}

// ==================== UTILIDADES PARA EVENTOS ====================
export const getDefaultEventFormValues = (): EventFormValues => ({
  name: '',
  description: '',
  eventType: 'in-person',
  date: new Date().toISOString().slice(0, 16),
  location: '',
  virtualLink: '',
  price: 0,
  isFree: false,
  image: ''
});

export const prepareEventForSubmit = (formValues: EventFormValues, creatorId: string): Omit<Event, 'id'> => {
  const baseData = {
    ...formValues,
    creatorId,
    date: Timestamp.fromDate(new Date(formValues.date)),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    attendees: []
  };

  return formValues.eventType === 'virtual' 
    ? { ...baseData, location: undefined, latitude: undefined, longitude: undefined }
    : { ...baseData, virtualLink: undefined };
};