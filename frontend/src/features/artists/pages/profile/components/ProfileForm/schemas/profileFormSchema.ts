import { z } from 'zod';
export const profileFormSchema: any = z.object({
    displayName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    bio: z.string().optional(),
    role: z.string().optional(),
    location: z.string().optional(),
    skills: z.array(z.string()).default([]),
    photoURL: z.string().url('URL inválida').optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    tags: z.array(z.string()).default([]),
});
