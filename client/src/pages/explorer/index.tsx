import { useState, useEffect, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users, MessageSquare, Filter, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { apiRequest } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from "@/hooks/use-debounce";
import BaseCard from "@/components/artist-card";
import { useSearchFilters } from '@/hooks/useSearchFilters';
import { useMapMarkers } from '@/hooks/useMapMarkers';
import { useContentType } from '@/hooks/useContentType';

// Importar tipos de Google Maps
import type { GoogleMap as GoogleMapType, LoadScriptNext, Marker as MarkerType, InfoWindow as InfoWindowType } from '@react-google-maps/api';

interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

interface BaseItem {
  id: string;
  title: string;
  image: string;
  description?: string;
  location?: Location;
  rating?: number;
  reviews?: number;
}

interface Artist extends BaseItem {
  specialties: string[];
  distance: number;
}

interface Place extends BaseItem {
  isOpen: boolean;
  address: string;
  upcomingEvents: number;
}

interface Event extends BaseItem {
  date: string;
  time: string;
  capacity: number;
  remainingSpots: number;
}

interface Recommendation extends BaseItem {
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  isFollowing: boolean;
  recommendations: number;
  comments: number;
  type: 'artist' | 'place' | 'event';
}

interface MapMarker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  id: string;
}

type ContentType = "artists" | "places" | "events" | "recommendations";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 4.6097,
  lng: -74.0817
};

export default function ExplorerPage() {
  const { filters, handleFilterChange, clearFilters } = useSearchFilters({
    onFilterChange: (filters) => {
      // Lógica para actualizar resultados basados en filtros
    }
  });

  const { markers, selectedMarker, handleMarkerClick } = useMapMarkers({
    onMarkerClick: (marker) => {
      // Lógica para manejar clic en marcador
    }
  });

  const { contentType, handleTypeChange } = useContentType({
    onTypeChange: (type) => {
      // Lógica para cambiar tipo de contenido
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    artists: Artist[];
    places: Place[];
    events: Event[];
    recommendations: Recommendation[];
  }>({
    artists: [],
    places: [],
    events: [],
    recommendations: []
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { toast } = useToast();

  useEffect(() => {
    if (isDesktop) {
      setShowMap(true);
    }
  }, [isDesktop]);

  const fetchData = useCallback(async (type: ContentType) => {
    setIsLoading(true);
    try {
      const response = await apiRequest(`/api/${type}?search=${searchTerm}&category=${filters.category}`);
      const data = await response.json();
      setData(prev => ({ ...prev, [type]: data }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los datos. Por favor intenta de nuevo."
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filters.category, toast]);

  useEffect(() => {
    fetchData(contentType);
  }, [contentType, fetchData]);

  const handleSearch = useCallback(() => {
    fetchData(contentType);
  }, [contentType, fetchData]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      );
    }

    const filteredData = data[contentType];

    if (filteredData.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron resultados</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentType === "artists" && (filteredData as Artist[]).map((artist) => (
          <BaseCard
            key={artist.id}
            id={artist.id}
            type="artist"
            title={artist.title}
            image={artist.image}
            description={artist.description}
            location={artist.location?.city}
            rating={artist.rating}
            reviews={artist.reviews}
            additionalInfo={{
              specialties: artist.specialties,
              distance: artist.distance
            }}
          />
        ))}
        {contentType === "places" && (filteredData as Place[]).map((place) => (
          <BaseCard
            key={place.id}
            id={place.id}
            type="place"
            title={place.title}
            image={place.image}
            description={place.description}
            location={place.location?.city}
            rating={place.rating}
            reviews={place.reviews}
            additionalInfo={{
              isOpen: place.isOpen
            }}
          />
        ))}
        {contentType === "events" && (filteredData as Event[]).map((event) => (
          <BaseCard
            key={event.id}
            id={event.id}
            type="event"
            title={event.title}
            image={event.image}
            description={event.description}
            location={event.location?.city}
            rating={event.rating}
            reviews={event.reviews}
            additionalInfo={{
              date: event.date,
              capacity: event.capacity
            }}
          />
        ))}
        {contentType === "recommendations" && (filteredData as Recommendation[]).map((recommendation) => (
          <BaseCard
            key={recommendation.id}
            id={recommendation.id}
            type={recommendation.type}
            title={recommendation.title}
            image={recommendation.image}
            description={recommendation.description}
            location={recommendation.location?.city}
            rating={recommendation.rating}
            reviews={recommendation.reviews}
            additionalInfo={{
              user: recommendation.user,
              isFollowing: recommendation.isFollowing,
              recommendations: recommendation.recommendations,
              comments: recommendation.comments
            }}
          />
        ))}
      </div>
    );
  };

  const mapMarkers = useMemo(() => {
    const currentData = data[contentType];
    return currentData.map(item => {
      const location = 'location' in item ? item.location : null;
      if (!location) return null;
      
      return {
        position: {
          lat: location.latitude,
          lng: location.longitude
        },
        title: item.title,
        id: item.id
      } as MapMarker;
    }).filter((marker): marker is MapMarker => marker !== null);
  }, [data, contentType]);

  const handleMarkerClick = (marker: MapMarker) => {
    const item = data[contentType].find(item => item.id === marker.id);
    if (item?.location) {
      setSelectedLocation(item.location);
    }
  };

  const renderMap = () => (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      onLoad={() => setMapLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
        options={{
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        {mapMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            onClick={() => handleMarkerClick(marker)}
            animation={google.maps.Animation.DROP}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.latitude,
              lng: selectedLocation.longitude
            }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="p-2">
              <h3 className="font-semibold">{selectedLocation.city}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row gap-8"
      >
        {/* Contenido principal */}
        <motion.div 
          className={`${isDesktop ? "w-3/5" : "w-full"}`}
          layout
        >
          <Tabs defaultValue="artists" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="artists" onClick={() => setContentType("artists")}>
                <Users className="h-4 w-4 mr-2" />
                Artistas
              </TabsTrigger>
              <TabsTrigger value="places" onClick={() => setContentType("places")}>
                <MapPin className="h-4 w-4 mr-2" />
                Lugares
              </TabsTrigger>
              <TabsTrigger value="events" onClick={() => setContentType("events")}>
                <Calendar className="h-4 w-4 mr-2" />
                Eventos
              </TabsTrigger>
              <TabsTrigger value="recommendations" onClick={() => setContentType("recommendations")}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Solicitudes
              </TabsTrigger>
            </TabsList>

            <motion.div 
              className="mt-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Barra de búsqueda y filtros */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`Buscar ${contentType}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Select onValueChange={(value) => handleFilterChange("category", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pintura">Pintura</SelectItem>
                      <SelectItem value="escultura">Escultura</SelectItem>
                      <SelectItem value="fotografia">Fotografía</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Contenido */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={contentType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </Tabs>
        </motion.div>

        {/* Mapa */}
        {isDesktop ? (
          <motion.div 
            className="w-2/5 h-[calc(100vh-4rem)] sticky top-4 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {mapLoaded && renderMap()}
          </motion.div>
        ) : (
          showMap && (
            <motion.div 
              className="w-full h-64 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-center p-2 bg-white">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMap(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Ocultar mapa
                </Button>
              </div>
              {mapLoaded && renderMap()}
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
} 