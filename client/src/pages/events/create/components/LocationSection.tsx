// client/src/pages/events/create/components/LocationSection.tsx

import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { EventFormValues } from './schema';

interface Props {
  form: UseFormReturn<EventFormValues>;
}

const LocationSection: React.FC<Props> = ({ form }) => {
  const type = useWatch({ control: form.control, name: 'type' });

  if (type !== 'presencial') return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Ubicación</h2>
      <div>
        <label className="block text-sm font-medium">Dirección</label>
        <input
          {...form.register('location')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </section>
  );
};

export default LocationSection;
