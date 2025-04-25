// client/src/pages/events/create/components/BasicInfoSection.tsx

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from './schema';

interface Props {
  form: UseFormReturn<EventFormValues>;
}

const BasicInfoSection: React.FC<Props> = ({ form }) => {
  const { register } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Información básica</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Título</label>
        <input
          {...register('title')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          {...register('description')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tipo de evento</label>
        <select
          {...register('type')}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="presencial">Presencial</option>
          <option value="virtual">Virtual</option>
        </select>
      </div>
    </section>
  );
};

export default BasicInfoSection;
