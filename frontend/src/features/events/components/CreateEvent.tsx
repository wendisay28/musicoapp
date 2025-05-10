// src/features/events/components/CreateEvent.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/features/shared/components/ui/input';
import { Textarea } from '@/features/shared/components/ui/textarea';
import { Button } from '@/features/shared/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const eventFormSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  location: z.string().min(1, 'La ubicación es requerida'),
  eventType: z.enum(['Exposición', 'Taller', 'Feria', 'Otro']),
});

type EventFormData = z.infer<typeof eventFormSchema>;

export const CreateEvent: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: EventFormData) => {
    try {
      console.log('Enviando datos del evento:', data);
      toast({ title: 'Evento creado exitosamente', description: data.title });
      // Aquí puedes enviar los datos a Firebase o tu backend
    } catch (error) {
      console.error(error);
      toast({ title: 'Error al crear el evento', description: 'Intenta nuevamente.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">Crear Evento</h2>

      <div>
        <label className="block font-medium">Título</label>
        <Input {...register('title')} placeholder="Nombre del evento" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Descripción</label>
        <Textarea {...register('description')} placeholder="Detalles del evento" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Ubicación</label>
        <Input {...register('location')} placeholder="Ej. Ciudad de México" />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Tipo de Evento</label>
        <select {...register('eventType')} className="border rounded p-2 w-full">
          <option value="">Selecciona una opción</option>
          <option value="Exposición">Exposición</option>
          <option value="Taller">Taller</option>
          <option value="Feria">Feria</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creando...' : 'Crear Evento'}
      </Button>
    </form>
  );
};

export default CreateEvent;
