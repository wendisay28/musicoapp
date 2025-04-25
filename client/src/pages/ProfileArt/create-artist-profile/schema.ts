/**
 * Esquema de validación para el formulario de perfil artístico
 * 
 * Valida los campos enviados desde el formulario dividido por secciones:
 * - Información básica del artista
 * - Rango de precios y unidad
 * - Servicios ofrecidos
 * - Medios cargados (imágenes/videos)
 * - Disponibilidad por fechas
 */

import { z } from 'zod';

// Subesquema para servicios ofrecidos por el artista
export const artistServiceSchema = z.object({
  id: z.string().optional(), // puede ser generado en frontend
  title: z.string().min(3, 'El título es obligatorio'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  videoUrl: z.string().url('Debe ser una URL válida').optional(),
});

// Subesquema para archivos multimedia del artista
export const mediaItemSchema = z.object({
  id: z.string(),
  type: z.enum(['image', 'video']),
  url: z.string().url('Debe ser una URL válida'),
});

// Subesquema para la disponibilidad de fechas del artista
export const availabilityDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  available: z.boolean(),
});

// Esquema principal del formulario
export const artistProfileFormSchema = z.object({
  userId: z.string(), // vendrá desde la sesión
  category: z.string().min(1, 'Selecciona una categoría'),
  subcategory: z.string().min(1, 'Selecciona una subcategoría'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  minPrice: z.number().min(0, 'Debe ingresar un precio mínimo'),
  maxPrice: z.number().min(0, 'Debe ingresar un precio máximo'),
  priceUnit: z.enum(['hora', 'evento', 'día']),
  media: z.array(mediaItemSchema),
  services: z.array(artistServiceSchema),
  availability: z.array(availabilityDateSchema),
});

// Tipo inferido desde el esquema principal para usar con React Hook Form
export type ArtistProfileFormValues = z.infer<typeof artistProfileFormSchema>;
