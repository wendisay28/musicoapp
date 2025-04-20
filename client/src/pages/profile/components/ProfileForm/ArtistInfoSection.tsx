import { categorias as CATEGORIES } from '../../constants';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Control, ControllerRenderProps } from 'react-hook-form';

interface ArtistInfoSectionProps {
  control: Control<any>;
  onCategoryChange?: (category: string) => void;
}

export function ArtistInfoSection({ control, onCategoryChange }: ArtistInfoSectionProps) {
  const { watch, setValue } = useFormContext();
  const [newTag, setNewTag] = useState('');
  const tags = watch('tags') || [];
  const category = watch('category') as keyof typeof CATEGORIES;

  const handleAddTag = () => {
    if (!newTag.trim() || tags.length >= 3) return;
    if (tags.includes(newTag.trim())) return;
    
    setValue('tags', [...tags, newTag.trim()]);
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  const handleCategoryChange = (value: keyof typeof CATEGORIES) => {
    setValue('category', value);
    setValue('subcategory', '');
    onCategoryChange?.(value);
  };

  return (
    <div className="space-y-6 border p-6 rounded-lg bg-muted/10">
      <h3 className="text-lg font-medium">Información de Artista</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Completa esta sección si ofreces servicios artísticos
      </p>

      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={control}
          name="category"
          render={(field) => (
            <FormItem>
              <FormLabel>Categoría principal</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value: string) => {
                  field.onChange(value);
                  handleCategoryChange(value as keyof typeof CATEGORIES);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(CATEGORIES).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {category && CATEGORIES[category] && (
          <FormField
            control={control}
            name="subcategory"
            render={(field: ControllerRenderProps<any, any>) => (
              <FormItem>
                <FormLabel>Especialidad</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una especialidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES[category].map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>
                        {subcat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Etiquetas profesionales</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ej: Fotógrafo de bodas"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!newTag.trim() || tags.length >= 3}
                  >
                    Añadir
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Máximo 3 etiquetas que describan tu especialidad
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}