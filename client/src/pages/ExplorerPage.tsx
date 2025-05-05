import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Filter, MapPin, Calendar, Users } from 'lucide-react';
import { ArtistCard } from '../components/explorer/ArtistCard';
import { EventCard } from '../components/explorer/EventCard';
import { PlaceCard } from '../components/explorer/PlaceCard';
import { RecommendationCard } from '../components/explorer/RecommendationCard';
import { cn } from '../lib/utils';

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('recommendations');

  // Datos de ejemplo
  const recommendations = [
    {
      id: '1',
      title: 'Exposición de Arte Contemporáneo',
      description: 'Una muestra imperdible de los artistas más destacados',
      type: 'event' as const,
      date: new Date('2024-03-20'),
      location: 'Galería de Arte Moderno',
      rating: 4.8,
      reviewCount: 24,
      likes: 156,
      imageUrl: 'https://source.unsplash.com/random/800x600?art'
    },
    {
      id: '2',
      title: 'Galería de Arte Moderno',
      description: 'Galería especializada en arte contemporáneo',
      type: 'place' as const,
      location: 'Calle 123 #45-67',
      rating: 4.9,
      reviewCount: 32,
      likes: 89,
      imageUrl: 'https://source.unsplash.com/random/800x600?gallery'
    }
  ];

  const artists = [
    {
      id: '1',
      name: 'María González',
      description: 'Artista especializada en pintura al óleo y acuarela',
      location: 'Bogotá, Colombia',
      rating: 4.8,
      reviewCount: 24,
      followers: 156,
      skills: ['Pintura', 'Dibujo', 'Acuarela'],
      imageUrl: 'https://source.unsplash.com/random/800x600?artist'
    }
  ];

  const events = [
    {
      id: '1',
      title: 'Taller de Pintura al Óleo',
      description: 'Aprende las técnicas básicas de la pintura al óleo',
      date: new Date('2024-03-20'),
      time: '15:00',
      location: 'Galería de Arte Moderno',
      capacity: 20,
      price: 50,
      category: 'Taller',
      imageUrl: 'https://source.unsplash.com/random/800x600?workshop'
    }
  ];

  const places = [
    {
      id: '1',
      name: 'Galería de Arte Moderno',
      description: 'Galería especializada en arte contemporáneo',
      address: 'Calle 123 #45-67',
      phone: '+57 123 456 7890',
      schedule: 'Lunes a Viernes: 9am - 6pm',
      rating: 4.9,
      reviewCount: 32,
      category: 'Galería',
      imageUrl: 'https://source.unsplash.com/random/800x600?gallery'
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Explorar</h1>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar artistas, eventos o lugares..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommendations">Recomendados</TabsTrigger>
            <TabsTrigger value="artists">Artistas</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="places">Lugares</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((item) => (
                <RecommendationCard
                  key={item.id}
                  {...item}
                  onClick={(id) => console.log('Ver recomendación:', id)}
                  onViewMore={(id) => console.log('Ver más:', id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artists" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  {...artist}
                  onClick={(id) => console.log('Ver artista:', id)}
                  onFollow={(id) => console.log('Seguir artista:', id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onClick={(id) => console.log('Ver evento:', id)}
                  onBook={(id) => console.log('Reservar evento:', id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="places" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <PlaceCard
                  key={place.id}
                  {...place}
                  onClick={(id) => console.log('Ver lugar:', id)}
                  onContact={(id) => console.log('Contactar lugar:', id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 