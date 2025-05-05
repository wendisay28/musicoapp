import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { eventSchema, EventFormData, EventFormProps } from '@/types/event-form';

/**
 * Formulario para crear o editar eventos
 * @component
 * @example
 * ```tsx
 * <EventForm
 *   onSubmit={(data) => console.log(data)}
 *   initialData={{ title: 'Evento de prueba' }}
 *   isLoading={false}
 * />
 * ```
 */
export function EventForm({
  onSubmit,
  initialData,
  isLoading,
  error,
  className
}: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData
  });

  const date = watch('date');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Título del Evento
        </label>
        <Input
          id="title"
          {...register('title')}
          placeholder="Ej: Exposición de Arte Contemporáneo"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descripción
        </label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Describe el evento..."
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                disabled={isLoading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setValue('date', date)}
                initialFocus
                disabled={isLoading}
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium mb-1">
            Hora
          </label>
          <Input
            id="time"
            type="time"
            {...register('time')}
            disabled={isLoading}
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          Ubicación
        </label>
        <Input
          id="location"
          {...register('location')}
          placeholder="Ej: Museo de Arte Moderno"
          disabled={isLoading}
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium mb-1">
            Capacidad
          </label>
          <Input
            id="capacity"
            type="number"
            {...register('capacity', { valueAsNumber: true })}
            min={1}
            max={1000}
            disabled={isLoading}
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Precio
          </label>
          <Input
            id="price"
            type="number"
            {...register('price', { valueAsNumber: true })}
            min={0}
            max={10000}
            disabled={isLoading}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Categoría
        </label>
        <Select
          onValueChange={(value) => setValue('category', value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exposicion">Exposición</SelectItem>
            <SelectItem value="taller">Taller</SelectItem>
            <SelectItem value="conferencia">Conferencia</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Imagen
        </label>
        <Input
          id="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          disabled={isLoading}
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Procesando...
          </>
        ) : (
          initialData ? 'Actualizar Evento' : 'Crear Evento'
        )}
      </Button>
    </form>
  );
} 