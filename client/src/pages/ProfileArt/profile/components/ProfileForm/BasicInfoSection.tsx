import { Controller } from 'react-hook-form';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * Sección de información básica del usuario
 */
export function BasicInfoSection({ control }: { control: any }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Información Básica</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="@usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Controller
        name="bio"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Biografía</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Cuéntanos sobre ti..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Máximo 500 caracteres
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol / Profesión</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Músico">Músico</SelectItem>
                  <SelectItem value="Artista visual">Artista visual</SelectItem>
                  <SelectItem value="Fotógrafo">Fotógrafo</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input placeholder="Ciudad, País" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}