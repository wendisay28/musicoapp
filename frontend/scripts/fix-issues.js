import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

// Directorios a eliminar
const dirsToRemove = [
  'features/profile',
  'features/home/pages/components',
  'features/layout/components'
];

// Archivos a actualizar
const filesToUpdate = [
  {
    path: 'features/ui/components/forms/BaseForm.tsx',
    content: `import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export interface BaseFormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  initialData?: Partial<z.infer<T>>;
  isSubmitting?: boolean;
  onCancel?: () => void;
  children?: React.ReactNode;
}

export function BaseForm<T extends z.ZodType>({
  schema,
  onSubmit,
  initialData = {},
  isSubmitting = false,
  onCancel,
  children
}: BaseFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialData as z.infer<T>,
    mode: 'onBlur'
  });

  const handleSubmit = async (data: z.infer<T>) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'Ocurrió un error al guardar los datos'
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6">
          {children}
        </div>

        {form.formState.errors.root && (
          <div className="text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting} className="min-w-32">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}`
  },
  {
    path: 'features/ui/components/cards/BaseCard.tsx',
    content: `import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface BaseCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }[];
}

export function BaseCard({
  title,
  description,
  imageUrl,
  footer,
  className,
  children,
  actions
}: BaseCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      {imageUrl && (
        <div className="aspect-video relative">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      {(title || description) && (
        <CardHeader>
          {title && <h3 className="font-semibold">{title}</h3>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </CardHeader>
      )}

      {children && <CardContent>{children}</CardContent>}

      {(actions || footer) && (
        <CardFooter className="flex justify-between items-center">
          {footer}
          {actions && (
            <div className="flex gap-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'default'}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}`
  }
];

// Función para eliminar directorios
function removeDirectories() {
  dirsToRemove.forEach(dir => {
    const dirPath = path.join(srcPath, dir);
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Directorio eliminado: ${dir}`);
    }
  });
}

// Función para actualizar archivos
function updateFiles() {
  filesToUpdate.forEach(({ path: filePath, content }) => {
    const fullPath = path.join(srcPath, filePath);
    const dirPath = path.dirname(fullPath);
    
    // Asegurar que el directorio existe
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`Archivo actualizado: ${filePath}`);
  });
}

// Función para actualizar importaciones
function updateImports() {
  const filesToCheck = [
    'features/artist/components/ArtistCard.tsx',
    'features/events/components/EventCard.tsx',
    'features/offers/components/OfferCard.tsx',
    'features/artist/pages/profile/components/ProfileForm/ProfileForm.tsx',
    'features/events/components/EventForm.tsx'
  ];

  filesToCheck.forEach(file => {
    const filePath = path.join(srcPath, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Actualizar importaciones de componentes base
    content = content.replace(
      /from ['"]@\/components\/(.*?)['"]/g,
      'from \'@/features/ui/components/$1\''
    );

    // Actualizar importaciones de tipos
    content = content.replace(
      /from ['"]@\/types\/(.*?)['"]/g,
      'from \'@/features/shared/types/$1\''
    );

    fs.writeFileSync(filePath, content);
    console.log(`Importaciones actualizadas en: ${file}`);
  });
}

// Ejecutar correcciones
console.log('Iniciando correcciones...');
removeDirectories();
updateFiles();
updateImports();
console.log('Correcciones completadas!'); 