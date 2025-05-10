import { api } from '@/lib/api';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  status: 'draft' | 'published' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  organizerId: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  location: string;
  image?: File;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  image?: File;
  status?: Event['status'];
}

export const createEvent = async (data: CreateEventData): Promise<Event> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  
  const response = await api.post<Event>('/events', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getEvents = async (page = 1, limit = 10): Promise<{ events: Event[]; total: number }> => {
  const response = await api.get<{ events: Event[]; total: number }>('/events', {
    params: { page, limit }
  });
  return response.data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const response = await api.get<Event>(`/events/${id}`);
  return response.data;
};

export const updateEvent = async (id: string, data: UpdateEventData): Promise<Event> => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  
  const response = await api.put<Event>(`/events/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};

export const getUserEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>('/events/user');
  return response.data;
}; 