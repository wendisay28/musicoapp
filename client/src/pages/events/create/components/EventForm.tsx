// client/src/pages/events/create/components/EventForm.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, EventFormValues } from './schema.ts';
import { createEvent } from '../api/createEvent.ts';
import BasicInfoSection from './components/BasicInfoSection.tsx/index.ts';
import ScheduleSection from './ScheduleSection.tsx/index.ts';
import LocationSection from './LocationSection.tsx/index.ts';
import ImageUploadSection from './ImageUploadSection.tsx';

export const EventForm = () => {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
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
