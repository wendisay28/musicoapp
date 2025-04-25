// client/src/pages/events/create/CreateEventPage.tsx

import React from 'react';
import { EventForm } from './components/EventForm';

const CreateEventPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Crear nuevo evento</h1>
      <EventForm />
    </div>
  );
};

export default CreateEventPage;
