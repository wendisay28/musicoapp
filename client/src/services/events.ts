import { EventFormData } from '@/types/artist';
import { ApiError } from '@/types/errors';

export const createEvent = async (data: EventFormData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await fetch('/api/events', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(
      errorData.code || 'UNKNOWN_ERROR',
      errorData.message || 'Error al crear el evento',
      response.status,
      errorData.details
    );
  }

  return response.json();
}; 