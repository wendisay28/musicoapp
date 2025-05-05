export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price: number;
  capacity: number;
  attendees: Attendee[];
  organizer: Organizer;
  status: 'draft' | 'published' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Organizer {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price: number;
  capacity: number;
} 