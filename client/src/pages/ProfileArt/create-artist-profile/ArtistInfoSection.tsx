// ArtistInfoSection.tsx
// Esta sección del formulario permite al artista seleccionar una categoría, subcategoría y escribir una descripción.

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const categories = {
  "Música": ["Cantante", "Banda", "DJ", "Músico"],
  "Arte Visual": ["Pintor", "Fotógrafo", "Ilustrador"],
  "Danza": ["Bailarín", "Coreógrafo"],
  "Teatro": ["Actor", "Director"],
  "Otros": ["Otro"]
};

export default function ArtistInfoSection() {
  // Obtenemos funciones del contexto del formulario
  const { watch, setValue, register } = useFormContext();
  const category = watch('category');

  return (
    <div className="space-y-6">
      {/* Selección de Categoría */}
      <div className="space-y-2">
        <Label htmlFor="category">Categoría</Label>
        <Select value={category} onValueChange={(value) => setValue('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(categories).map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selección de Subcategoría (dependiente de la categoría) */}
      {category && (
        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategoría</Label>
          <Select onValueChange={(value) => setValue('subcategory', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una subcategoría" />
            </SelectTrigger>
            <SelectContent>
              {categories[category as keyof typeof categories].map((sub) => (
                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Campo de descripción */}
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          placeholder="Cuéntanos sobre tu experiencia, estilo, trayectoria..."
          {...register('description')}
        />
      </div>
    </div>
  );
}
