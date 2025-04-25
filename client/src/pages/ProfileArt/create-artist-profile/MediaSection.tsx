// MediaSection.tsx
// Esta sección del formulario permite al artista subir imágenes y videos para mostrar su trabajo.

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function MediaSection() {
  // Obtenemos funciones del contexto del formulario
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Subida de imágenes */}
      <div className="space-y-2">
        <Label htmlFor="images">Imágenes de tu trabajo</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          {...register('images')}
        />
      </div>

      {/* Subida de videos */}
      <div className="space-y-2">
        <Label htmlFor="videos">Videos de tu trabajo</Label>
        <Input
          id="videos"
          type="file"
          multiple
          accept="video/*"
          {...register('videos')}
        />
      </div>
    </div>
  );
}
