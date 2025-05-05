import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Calendar, Clock, MapPin, Star, Heart, Share2, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export default function EventDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [tickets, setTickets] = useState(1);

  // Datos de ejemplo
  const event = {
    id,  // Usa el id obtenido de useParams
    title: 'Taller de Pintura al Óleo',
    description: 'Aprende las técnicas básicas de la pintura al óleo en este taller práctico. Perfecto para principiantes y artistas intermedios que quieran mejorar sus habilidades.',
    date: new Date('2024-03-20'),
    time: '15:00',
    location: 'Galería de Arte Moderno',
    address: 'Calle 123 #45-67, Bogotá',
    capacity: 20,
    available: 15,
    price: 50,
    category: 'Taller',
    imageUrl: 'https://source.unsplash.com/random/800x600?workshop',
    artist: {
      id: '1',
      name: 'María González',
      imageUrl: 'https://source.unsplash.com/random/800x600?artist',
      rating: 4.8,
      reviewCount: 24
    },
    reviews: [
      {
        id: '1',
        user: 'Juan Pérez',
        rating: 5,
        comment: 'Excelente taller, aprendí mucho sobre las técnicas básicas.',
        date: new Date('2024-02-15')
      }
    ]
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <div className="flex items-center gap-4 text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {format(event.date, "EEEE d 'de' MMMM", { locale: es })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="artist">Artista</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <p className="text-gray-600">{event.description}</p>
                <div className="space-y-2">
                  <h3 className="font-semibold">Ubicación</h3>
                  <p className="text-gray-600">{event.address}</p>
                </div>
              </TabsContent>

              <TabsContent value="artist" className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={event.artist.imageUrl}
                    alt={event.artist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{event.artist.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{event.artist.rating.toFixed(1)}</span>
                      <span>
                        ({event.artist.reviewCount} {event.artist.reviewCount === 1 ? 'reseña' : 'reseñas'})
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {event.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{review.user}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span>{review.rating}</span>
                            <span>
                              {format(review.date, "d 'de' MMMM yyyy", { locale: es })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Panel de reserva */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reservar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Precio por persona</span>
                <span className="text-xl font-bold">${event.price}</span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cantidad de entradas</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max={event.available}
                    value={tickets}
                    onChange={(e) => setTickets(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-500">
                    {event.available} disponibles
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>${event.price * tickets}</span>
              </div>

              <Button className="w-full">Reservar ahora</Button>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 