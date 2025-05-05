// client/src/pages/events/create/components/EventForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema, EventFormValues } from './schema';
import { createEvent } from '../api/createEvent';
import BasicInfoSection from './BasicInfoSection';
import ScheduleSection from './ScheduleSection';
import LocationSection from './LocationSection';
import ImageUploadSection from './ImageUploadSection';

export const EventForm = () => {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'presencial',
      date: '',
      time: '',
      location: '',
      image: null,
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      await createEvent(data);
      alert('Evento creado con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al crear el evento');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <BasicInfoSection form={form} />
      <ScheduleSection form={form} />
      <LocationSection form={form} />
      <ImageUploadSection form={form} />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear evento
      </button>
    </form>
  );
};
