import * as z from 'zod';

export const eventSchema = z.object({
  title: z.string()
    .min(1, 'El título es requerido')
    .max(100, 'El título no puede tener más de 100 caracteres'),
  description: z.string()
    .min(1, 'La descripción es requerida')
    .max(1000, 'La descripción no puede tener más de 1000 caracteres'),
  date: z.date({
    required_error: 'La fecha es requerida',
    invalid_type_error: 'La fecha no es válida'
  }),
  time: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'La hora debe estar en formato HH:MM'),
  location: z.string()
    .min(1, 'La ubicación es requerida')
    .max(200, 'La ubicación no puede tener más de 200 caracteres'),
  capacity: z.number()
    .min(1, 'La capacidad debe ser mayor a 0')
    .max(1000, 'La capacidad no puede ser mayor a 1000'),
  price: z.number()
    .min(0, 'El precio no puede ser negativo')
    .max(10000, 'El precio no puede ser mayor a 10000'),
  category: z.string()
    .min(1, 'La categoría es requerida'),
  image: z.instanceof(File, { message: 'La imagen es requerida' })
    .refine(file => file.size <= 5 * 1024 * 1024, 'La imagen no puede ser mayor a 5MB')
    .refine(
      file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'La imagen debe ser JPEG, PNG o WebP'
    )
});

export type EventFormData = z.infer<typeof eventSchema>;

export interface EventFormProps {
  /** Callback cuando se envía el formulario */
  onSubmit: (data: EventFormData) => void;
  /** Datos iniciales del formulario */
  initialData?: Partial<EventFormData>;
  /** Estado de carga */
  isLoading?: boolean;
  /** Mensaje de error */
  error?: string;
  /** Clases CSS personalizadas */
  className?: string;
} 