import { z } from 'zod';
export const portfolioSchema: any = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    images: z.array(z.string()).default([])
});
