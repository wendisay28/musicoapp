import { z } from 'zod';

export const profileFormSchema = z.object({
  displayName: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(50, 'Nombre no puede exceder 50 caracteres'),
  
  username: z.string()
    .min(3, 'Usuario requiere mínimo 3 caracteres')
    .max(30, 'Usuario no puede exceder 30 caracteres')
    .regex(/^[a-z0-9_]+$/, 'Solo minúsculas, números y _'),

  bio: z.string()
    .max(500, 'Biografía no puede exceder 500 caracteres')
    .optional(),

  role: z.string().optional(),
  location: z.string().optional(),

  skills: z.array(z.string())
    .max(10, 'Máximo 10 habilidades')
    .default([]),

  photoURL: z.string()
    .url('URL de foto inválida')
    .optional(),

  category: z.string().optional(),
  subcategory: z.string().optional(),

  tags: z.array(z.string())
    .max(15, 'Máximo 15 etiquetas')
    .default([]),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;