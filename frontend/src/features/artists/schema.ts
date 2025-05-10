import { z } from 'zod';
export const artistProfileSchema: any = z.object({
    name: z.string().min(2, 'El nombre es requerido'),
    bio: z.string().min(10, 'La biografía es requerida'),
    specialties: z.array(z.string()).min(1, 'Selecciona al menos una especialidad'),
    experience: z.number().min(0, 'La experiencia no puede ser negativa'),
    services: z.array(z.object({
        name: z.string().min(2, 'El nombre del servicio es requerido'),
        description: z.string().min(10, 'La descripción del servicio es requerida'),
        price: z.number().min(0, 'El precio no puede ser negativo'),
        duration: z.number().min(15, 'La duración mínima es de 15 minutos')
    })).min(1, 'Agrega al menos un servicio'),
    availability: z.array(z.object({
        day: z.string(),
        startTime: z.string(),
        endTime: z.string()
    })).min(1, 'Configura al menos un horario'),
    media: z.array(z.any()).optional(),
    pricing: z.object({
        baseRate: z.number().min(0, 'La tarifa base no puede ser negativa'),
        packages: z.array(z.object({
            name: z.string().min(2, 'El nombre del paquete es requerido'),
            description: z.string().min(10, 'La descripción del paquete es requerida'),
            price: z.number().min(0, 'El precio no puede ser negativo')
        })).optional()
    })
});
