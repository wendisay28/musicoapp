// client/src/pages/events/create/components/schema.ts

import { z } from 'zod';

export const eventFormSchema = z.object({
  title: z.string().min(3, 'El título es obligatorio'),
  description: z.string().min(10, 'La descripción es obligatoria'),
  type: z.enum(['presencial', 'virtual']),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Fecha inválida',
  }),
  time: z.string().min(1, 'Hora obligatoria'),
  location: z.string().optional(),
  image: z.any().optional(), // Puede ser File o null
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
