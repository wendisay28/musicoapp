import { useState, useEffect } from 'react';
import { getArtistById } from '../services/artistService';

interface Artist {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  coverImage: string;
  email: string;
  phone: string;
  gallery: string[];
  services: Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
  }>;
  reviews: Array<{
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>;
  availability: Array<{
    date: string;
    slots: string[];
  }>;
  socialMedia: Array<{
    platform: string;
    url: string;
  }>;
}

export function useArtistData(artistId: string) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const data = await getArtistById(artistId);
        setArtist(data);
      } catch (err) {
        setError('Error al cargar los datos del artista');
      } finally {
        setLoading(false);
      }
    };

    if (artistId) {
      fetchArtist();
    }
  }, [artistId]);

  return { artist, loading, error };
} 