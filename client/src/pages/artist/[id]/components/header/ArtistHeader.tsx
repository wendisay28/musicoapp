import React from 'react';
import { Button } from '../../../../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Artist {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  coverImage: string;
}

interface ArtistHeaderProps {
  artist: Artist;
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Imagen de portada */}
      <div className="h-64 w-full">
        <img
          src={artist.coverImage}
          alt={`Portada de ${artist.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Información del artista */}
      <div className="container mx-auto px-4 -mt-16 relative">
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg shadow-lg p-6">
          {/* Avatar */}
          <img
            src={artist.avatar}
            alt={artist.name}
            className="w-32 h-32 rounded-full border-4 border-white"
          />

          {/* Información */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
            <p className="text-gray-600 mb-4">{artist.bio}</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Button 
                onClick={() => navigate(`/artist/${artist.id}/contact`)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Contactar
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate(`/artist/${artist.id}/services`)}
              >
                Ver Servicios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 