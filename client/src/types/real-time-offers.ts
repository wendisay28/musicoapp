export interface Artist {
  id: string;
  userName: string;
  userPhoto: string;
  rating: number;
  distance: number;
  price: number;
  description: string;
  specialties?: string[];
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

export interface Response {
  id: number;
  artistId: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  artistName: string;
  artistPhoto: string;
  artistRating: number;
  description: string;
  createdAt: string;
}

export interface RequestOffer {
  id: number;
  clientId: string;
  title: string;
  description: string;
  status: "active" | "completed" | "cancelled";
  location: string;
  date: string;
  time: string;
  budget: number;
  categoryId: string;
  subcategoryId: string;
  price: number;
  latitude: number;
  longitude: number;
  tags: string[];
  createdAt: string;
  responses: Response[];
} 