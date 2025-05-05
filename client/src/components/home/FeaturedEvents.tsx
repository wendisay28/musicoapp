import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Exposición de Arte Contemporáneo',
    description: 'Una muestra de los artistas más destacados de la ciudad',
    date: '15 de Marzo, 2024',
    image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3'
  },
  {
    id: '2',
    title: 'Concierto de Jazz al Aire Libre',
    description: 'Disfruta de una noche de jazz en el parque central',
    date: '20 de Marzo, 2024',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3'
  }
];

export function FeaturedEvents() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Eventos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <p className="text-sm text-gray-500 mb-4">{event.date}</p>
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="w-full"
                >
                  Ver Detalles
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate('/explorer')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Ver Todos los Eventos
          </Button>
        </div>
      </div>
    </section>
  );
} 