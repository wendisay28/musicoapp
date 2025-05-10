import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';
// ==================== TIPOS COMPARTIDOS ====================
export const EventTypeSchema: any = z.enum(['virtual', 'in-person']);
export const UserRoleSchema: any = z.enum(['artist', 'client', 'admin']);
export const FavoriteTypeSchema: any = z.enum(['artist', 'event']);
// ==================== ESQUEMA DE EVENTO MEJORADO ====================
export const eventSchema: any = z.object({
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
// ==================== UTILIDADES PARA EVENTOS ====================
export const getDefaultEventFormValues: any = () => ({
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
export const prepareEventForSubmit: any = (formValues, creatorId) => {
    const baseData: any = {
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
