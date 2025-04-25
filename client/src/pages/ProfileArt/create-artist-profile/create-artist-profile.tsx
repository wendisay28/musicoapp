// create-artist-profile.tsx
// Formulario principal para que un cliente pueda mejorar su perfil convirtiéndose en artista.
// Incluye secciones para información del artista, precios, galería multimedia, servicios y disponibilidad.

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ArtistInfoSection from './ArtistInfoSection';
import PricingSection from './PricingSection';
import MediaSection from './MediaSection';
import ServiceListSection from './ServiceListSection';
import AvailabilitySection from './AvailabilitySection';
import { apiRequest } from '@/lib/queryClient';

// Esquema de validación del formulario con Zod
const artistProfileSchema = z.object({
  category: z.string().min(1, 'La categoría es requerida'),
  subcategory: z.string().min(1, 'La subcategoría es requerida'),
  description: z.string().min(1, 'La descripción es requerida'),
  minPrice: z.string(),
  maxPrice: z.string(),
  priceUnit: z.string(),
  gallery: z.any().optional(),
  services: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      price: z.string(),
      video: z.any().optional()
    })
  ).optional(),
  availability: z.array(z.string()).optional(),
});

type ArtistProfileFormValues = z.infer<typeof artistProfileSchema>;

export default function CreateArtistProfile() {
  const methods = useForm<ArtistProfileFormValues>({
    resolver: zodResolver(artistProfileSchema),
    defaultValues: {
      category: '',
      subcategory: '',
      description: '',
      minPrice: '',
      maxPrice: '',
      priceUnit: 'hora',
      gallery: [],
      services: [],
      availability: []
    }
  });

  const [, setLocation] = useLocation();

  const onSubmit = async (data: ArtistProfileFormValues) => {
    try {
      const auth = await import('firebase/auth');
      const currentUser = auth.getAuth().currentUser;

      if (!currentUser) throw new Error('Debes iniciar sesión para crear tu perfil');

      await apiRequest('POST', '/api/artists', {
        ...data,
        userId: currentUser.uid,
        minPrice: parseInt(data.minPrice),
        maxPrice: parseInt(data.maxPrice),
      });

      setLocation('/profile');
    } catch (error) {
      console.error('Error al crear perfil de artista:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Mejorar Perfil a Artista</CardTitle>
          <CardDescription>
            Completa la información para activar tu perfil artístico y publicar tus servicios.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
              {/* Sección de información del artista */}
              <ArtistInfoSection />

              {/* Sección de precios */}
              <PricingSection />

              {/* Sección de galería multimedia */}
              <MediaSection />

              {/* Sección de servicios ofrecidos */}
              <ServiceListSection />

              {/* Sección de disponibilidad */}
              <AvailabilitySection />

              {/* Botón de envío */}
              <Button type="submit" className="w-full">
                Crear Perfil de Artista
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
