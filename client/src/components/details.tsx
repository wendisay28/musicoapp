import React, { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Star, MapPin, Clock, Phone, Globe } from "lucide-react";

interface DetailsProps {
  place: {
    id: string;
    name: string;
    address: string;
    rating: number;
    reviews: number;
    phone: string;
    website: string;
    hours: string[];
    photos: string[];
  };
}

export function Details({ place }: DetailsProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Guardado",
      description: "El lugar ha sido guardado en tus favoritos",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{place.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-64 rounded-lg overflow-hidden">
          <img
            src={place.photos[currentPhotoIndex]}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {place.photos.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentPhotoIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentPhotoIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{place.rating}</span>
          <span className="text-gray-500">({place.reviews} reseñas)</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{place.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{place.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {place.website}
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Horario</h3>
          <div className="space-y-1">
            {place.hours.map((hour, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{hour}</span>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Guardar en favoritos
        </Button>
      </CardContent>
    </Card>
  );
}