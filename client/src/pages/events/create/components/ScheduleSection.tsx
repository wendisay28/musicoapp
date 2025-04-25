// client/src/pages/events/create/components/ScheduleSection.tsx

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from './schema';

interface Props {
  form: UseFormReturn<EventFormValues>;
}

const ScheduleSection: React.FC<Props> = ({ form }) => {
  const { register } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Horario</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Fecha</label>
        <input
          type="date"
          {...register('date')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Hora</label>
        <input
          type="time"
          {...register('time')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </section>
  );
};

export default ScheduleSection;
