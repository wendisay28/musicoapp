import React from 'react';
import { useParams } from 'react-router-dom';
import { ArtistHeader } from './components/header/ArtistHeader';
import { ArtistGallery } from './components/gallery/ArtistGallery';
import { ArtistServices } from '@/components/artists/ArtistServices';
import { ArtistReviews } from './components/reviews/ArtistReviews';
import { ArtistAbout } from './components/about/ArtistAbout';
import { ArtistSkills } from '@/components/artists/ArtistSkills';
import { AvailabilityCalendar } from './components/availability/AvailabilityCalendar';
import { ArtistContact } from './components/contact/ArtistContact';
import { useArtistData } from './hooks/useArtistData';

// Componentes locales para estados de carga/error
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const ErrorMessage = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div className="text-center py-12">
    <p className="text-red-500 mb-4">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
      >
        Reintentar
      </button>
    )}
  </div>
);

// Componente para secciones del perfil
const ProfileSection = ({ 
  title, 
  children,
  className = ''
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`space-y-6 ${className}`}>
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    {children}
  </section>
);

export default function ArtistProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { artist, loading, error } = useArtistData(id || '');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ErrorMessage 
          message={error || 'Artista no encontrado'} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  // Asegurar que los datos cumplan con los tipos esperados
  const galleryImages = artist.gallery || [];
  const services = artist.services?.map(service => ({
    ...service,
    category: service.category || 'general' // Valor por defecto si falta
  })) || [];
  const reviews = artist.reviews?.map(review => ({
    ...review,
    userPhoto: review.userPhoto || review.userAvatar || '' // Valor por defecto si falta
  })) || [];
  const skills = artist.skills || [];
  const availability = artist.availability || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <ArtistHeader artist={artist} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-12">
            <ProfileSection title="Galería">
              <ArtistGallery images={galleryImages} />
            </ProfileSection>

            <ProfileSection title="Servicios">
              <ArtistServices services={services} />
            </ProfileSection>

            <ProfileSection title="Reseñas">
              <ArtistReviews reviews={reviews} />
            </ProfileSection>

            <ProfileSection title="Sobre el Artista">
              <ArtistAbout bio={artist.bio} />
            </ProfileSection>

            <ProfileSection title="Habilidades">
              <ArtistSkills skills={skills} />
            </ProfileSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <ProfileSection title="Disponibilidad">
              <AvailabilityCalendar availability={availability} />
            </ProfileSection>

            <ProfileSection title="Contacto">
              <ArtistContact 
                email={artist.email}
                phone={artist.phone}
                socialMedia={artist.socialMedia}
              />
            </ProfileSection>
          </div>
        </div>
      </main>
    </div>
  );
}