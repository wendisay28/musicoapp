import { useFormContext } from 'react-hook-form';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Image, Upload, Trash2 } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useState, useRef } from 'react';
import { Progress } from '@/components/ui/progress';

// Tipos para las props
interface AvatarSectionProps {
  control: any;
  maxFileSize?: number; // en MB
  allowedTypes?: string[];
}

/**
 * Sección mejorada para la imagen de perfil/avatar
 */
export function AvatarSection({ 
  control, 
  maxFileSize = 2, 
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
}: AvatarSectionProps) {
  const { watch, setValue } = useFormContext();
  const photoURL = watch('photoURL');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validaciones
    if (!allowedTypes.includes(file.type)) {
      setError(`Formatos permitidos: ${allowedTypes.join(', ').replace('image/', '')}`);
      return;
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`El tamaño máximo es ${maxFileSize}MB`);
      return;
    }

    setUploading(true);
    setProgress(0);
    
    try {
      // Simulación de progreso (reemplazar con tu API real)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const uploadedUrl = await uploadImage(file, (progress) => {
        setProgress(Math.round(progress * 100));
      });

      clearInterval(interval);
      setProgress(100);
      setValue('photoURL', uploadedUrl);
      
      // Resetear el input para permitir subir la misma imagen otra vez
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Error al subir la imagen. Intenta de nuevo.');
    } finally {
      setTimeout(() => setProgress(0), 1000);
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setValue('photoURL', '');
    setError(null);
  };

  // Función simulada de subida con progreso
  const uploadImage = (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.1;
        onProgress?.(progress);
        if (progress >= 1) {
          clearInterval(interval);
          resolve(URL.createObjectURL(file));
        }
      }, 100);
    });
  };

  return (
    <FormField
      control={control}
      name="photoURL"
      render={() => (
        <FormItem className="flex flex-col items-center space-y-4">
          <FormLabel className="text-lg">Foto de perfil</FormLabel>
          
          <div className="relative group">
            <Avatar className="h-32 w-32 border-2 border-primary/50">
              <AvatarImage 
                src={photoURL} 
                className="object-cover"
              />
              <AvatarFallback className="bg-muted text-2xl font-medium">
                {watch('displayName')?.slice(0, 2).toUpperCase() || 'US'}
              </AvatarFallback>
            </Avatar>
            
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white hover:bg-white/20"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Upload className="h-5 w-5 animate-pulse" />
                ) : (
                  <Image className="h-5 w-5" />
                )}
              </Button>
              
              {photoURL && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-destructive hover:bg-white/20"
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={uploading}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
          
          <FormControl>
            <input
              ref={fileInputRef}
              id="avatarUpload"
              type="file"
              accept={allowedTypes.join(',')}
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </FormControl>
          
          {uploading && (
            <div className="w-full max-w-xs space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                Subiendo... {progress}%
              </p>
            </div>
          )}
          
          {error && (
            <FormMessage className="text-destructive max-w-xs text-center">
              {error}
            </FormMessage>
          )}
          
          <p className="text-sm text-muted-foreground text-center">
            Formatos: {allowedTypes.join(', ').replace('image/', '')} • Máx. {maxFileSize}MB
          </p>
        </FormItem>
      )}
    />
  );
}