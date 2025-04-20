import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, EventFormValues } from '@/shared/schemas';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface EventFormProps {
  initialData?: Partial<EventFormValues>;
  onSubmit: (data: EventFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  onCancel?: () => void;
}

export function EventForm({
  initialData,
  onSubmit,
  isSubmitting,
  onCancel
}: EventFormProps) {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      date: '',
      description: '',
      eventType: 'virtual',
      virtualLink: '',
      image: '',
      ...initialData
    },
    mode: 'onBlur'
  });

  const handleSubmit = async (data: EventFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'Ocurrió un error al guardar el evento'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormItem>
          <FormLabel>Nombre del Evento*</FormLabel>
          <FormControl>
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input placeholder="Ej: Concierto de Jazz" {...field} disabled={isSubmitting} />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Tipo de Evento*</FormLabel>
          <FormControl>
            <Controller
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="in-person">Presencial</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Fecha y Hora*</FormLabel>
          <FormControl>
            <Controller
              control={form.control}
              name="date"
              render={({ field }) => (
                <Input type="datetime-local" {...field} disabled={isSubmitting} />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Descripción</FormLabel>
          <FormControl>
            <Controller
              control={form.control}
              name="description"
              render={({ field }) => (
                <Textarea
                  placeholder="Descripción detallada del evento..."
                  {...field}
                  rows={4}
                  disabled={isSubmitting}
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {form.watch('eventType') === 'virtual' && (
          <FormItem>
            <FormLabel>Enlace Virtual*</FormLabel>
            <FormControl>
              <Controller
                control={form.control}
                name="virtualLink"
                render={({ field }) => (
                  <Input
                    placeholder="https://meet.google.com/xxx-yyyy-zzz"
                    {...field}
                    disabled={isSubmitting}
                  />
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}

        <FormItem>
          <FormLabel>URL de la Imagen</FormLabel>
          <FormControl>
            <Controller
              control={form.control}
              name="image"
              render={({ field }) => (
                <Input
                  placeholder="https://ejemplo.com/imagen.jpg"
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        {form.formState.errors.root && (
          <div className="text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting} className="min-w-32">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar Evento'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
