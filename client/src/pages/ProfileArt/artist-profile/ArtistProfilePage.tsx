/**
 * Componente principal del perfil de artista
 * Coordina todas las secciones y maneja la navegación por tabs
 * 
 * Cambios principales:
 * 1. Reemplazo de ArtistAvailability por el nuevo AvailabilityCalendar
 * 2. Mejor manejo de tipos
 * 3. Organización más clara del código
 */

import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useArtistData } from "./hooks/useArtistData";
import { ArtistHeader } from "./ArtistHeader";
import { ArtistAbout } from "./ArtistAbout";
import { ArtistSkills } from "./ArtistSkills";
import AvailabilityCalendar from "./AvailabilityCalendar"; // Nuevo componente
import { ArtistServicesPreview } from "./ArtistServicesPreview";
import { ArtistServices } from "./ArtistServices";
import { ArtistGallery } from "./ArtistGallery";
import { ArtistReviews } from "./ArtistReviews";

export default function ArtistProfilePage() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const { artist, services, reviews, isLoading, error } = useArtistData(id || "");

  const handleBookmark = () => {
    toast({ 
      title: "Artista guardado", 
      description: "El artista ha sido añadido a tus favoritos" 
    });
  };

  const handleShare = () => {
    toast({ 
      title: "Compartir perfil", 
      description: "Funcionalidad de compartir en desarrollo" 
    });
  };

  const handleContact = () => {
    navigate(`/chat/new?artistId=${id}`);
  };

  const handleSlotSelect = (date: Date, hour?: string) => {
    console.log('Cita seleccionada:', date, hour);
    // Aquí puedes abrir un modal de confirmación o redirigir
    toast({
      title: "Cita reservada",
      description: `Has seleccionado el ${date.toLocaleDateString()} a las ${hour}`
    });
  };

  if (isLoading) return <ArtistProfileSkeleton />;
  if (error || !artist) return <ArtistNotFound />;

  return (
    <div className="pb-6">
      <ArtistHeader 
        artist={artist} 
        onBookmark={handleBookmark}
        onShare={handleShare}
        onContact={handleContact}
      />
      
      <div className="container mx-auto px-4 pt-6 pb-6">
        <Tabs defaultValue="profile" className="mt-6" onValueChange={setActiveTab}>
          <TabsList className="w-full border-b rounded-none justify-start">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="py-4">
            <ArtistAbout bio={artist.bio} />
            <ArtistSkills skills={artist.skills} />
            
            {/* Nuevo componente de disponibilidad */}
            <div className="mt-6">
              <h2 className="font-semibold text-lg mb-2">Disponibilidad</h2>
              <AvailabilityCalendar 
                artistId={artist.id}
                onSelectSlot={handleSlotSelect}
              />
            </div>
            
            <ArtistServicesPreview 
              services={services} 
              onViewAll={() => setActiveTab("services")} 
            />
          </TabsContent>
          
          <TabsContent value="services" className="py-4">
            <ArtistServices services={services} onContact={handleContact} />
          </TabsContent>
          
          <TabsContent value="gallery" className="py-4">
            <ArtistGallery gallery={artist.gallery} artistName={artist.name} />
          </TabsContent>
          
          <TabsContent value="reviews" className="py-4">
            <ArtistReviews 
              reviews={reviews} 
              rating={artist.rating} 
              reviewCount={artist.reviewCount} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Componente de carga esquelética
const ArtistProfileSkeleton = () => (
  <div className="pb-6">
    <div className="relative">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="absolute -bottom-16 left-4 w-32 h-32 rounded-full" />
      <Skeleton className="absolute -bottom-8 right-4 h-10 w-32 rounded-full" />
    </div>
    <div className="container mx-auto px-4 pt-20 pb-6">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-64 mb-2" />
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton className="h-10 w-full mb-6" />
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-24 w-full mb-4" />
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-full mb-2" />
    </div>
  </div>
);

// Componente para artista no encontrado
const ArtistNotFound = () => (
  <div className="container mx-auto px-4 py-8 text-center">
    <div className="text-6xl mb-4">🔍</div>
    <h1 className="text-2xl font-bold mb-2">Artista no encontrado</h1>
    <p className="text-muted-foreground mb-6">No pudimos encontrar el artista que estás buscando</p>
    <Link href="/explore">
      <Button>Explorar artistas</Button>
    </Link>
  </div>
);