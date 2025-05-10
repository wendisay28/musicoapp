import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.join(__dirname, '../src');

// Mapeo de archivos a mover/consolidar
const filesToMove = [
  // Consolidar componentes de eventos
  {
    from: path.join(srcPath, 'features/artist/pages/profile/components/Events/EventForm.tsx'),
    to: path.join(srcPath, 'features/events/components/shared/EventForm.tsx')
  },
  {
    from: path.join(srcPath, 'features/artist/pages/profile/components/Events/EventsList.tsx'),
    to: path.join(srcPath, 'features/events/components/shared/EventList.tsx')
  },
  // Consolidar componentes de artista
  {
    from: path.join(srcPath, 'features/artist/pages/[artistId]/components/ArtistReviews.tsx'),
    to: path.join(srcPath, 'features/artist/components/ArtistReviews.tsx')
  },
  // Mover páginas a features
  {
    from: path.join(srcPath, 'pages/favorites'),
    to: path.join(srcPath, 'features/favorites')
  },
  {
    from: path.join(srcPath, 'pages/GeoRecommendationsPage'),
    to: path.join(srcPath, 'features/geo/pages')
  }
];

// Función para asegurar que el directorio existe
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Función para copiar un directorio recursivamente
function copyDir(src, dest) {
  ensureDirectoryExists(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Mover/consolidar archivos
filesToMove.forEach(({ from, to }) => {
  try {
    if (!fs.existsSync(from)) {
      console.log(`Origen no encontrado: ${from}`);
      return;
    }

    ensureDirectoryExists(path.dirname(to));

    const stats = fs.statSync(from);
    if (stats.isDirectory()) {
      copyDir(from, to);
      console.log(`Directorio copiado: ${from} -> ${to}`);
    } else {
      fs.copyFileSync(from, to);
      console.log(`Archivo copiado: ${from} -> ${to}`);
    }
  } catch (error) {
    console.error(`Error moviendo ${from} a ${to}:`, error);
  }
});

// Actualizar las importaciones en App.tsx
const appTsxPath = path.join(srcPath, 'App.tsx');
let appTsxContent = fs.readFileSync(appTsxPath, 'utf8');

const importUpdates = {
  './pages/home/HomePage': './features/home/pages/HomePage',
  './pages/explorer/ExplorerPage': './features/explorer/pages/ExplorerPage',
  './pages/artist/ArtistProfilePage': './features/artist/pages/ArtistProfilePage',
  './pages/events/EventDetailsPage': './features/events/pages/EventDetailsPage',
  './pages/events/CreateEventPage': './features/events/pages/CreateEventPage',
  './pages/favorites/FavoritesPage': './features/favorites/pages/FavoritesPage',
  './pages/chat/ChatPage': './features/chat/pages/ChatPage',
  './pages/ProfileArt/create-artist-profile/CreateArtistProfilePage': './features/artist/pages/CreateArtistProfilePage'
};

Object.entries(importUpdates).forEach(([oldPath, newPath]) => {
  appTsxContent = appTsxContent.replace(
    new RegExp(`import\\(['"]${oldPath}['"]\\)`, 'g'),
    `import('${newPath}')`
  );
});

fs.writeFileSync(appTsxPath, appTsxContent);
console.log('Importaciones actualizadas en App.tsx');

// Crear directorio shared/components si no existe
const sharedComponentsPath = path.join(srcPath, 'features/shared/components');
if (!fs.existsSync(sharedComponentsPath)) {
  fs.mkdirSync(sharedComponentsPath, { recursive: true });
}

// Componentes a consolidar
const components = {
  'BaseCard.tsx': `import React from 'react';
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

export const BaseCard: React.FC<BaseCardProps> = ({
  title,
  description,
  imageUrl,
  footer,
  className,
  children,
  actions
}) => {
  return (
    <Card className={cn('w-full', className)}>
      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      {title && (
        <CardHeader>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      )}

      {children && <CardContent>{children}</CardContent>}

      {(actions || footer) && (
        <CardFooter className="flex justify-between items-center gap-4">
          {footer}
          {actions && actions.length > 0 && (
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
};`,

  'BaseForm.tsx': `import React from 'react';
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
};

// Crear los componentes
Object.entries(components).forEach(([filename, content]) => {
  const filePath = path.join(sharedComponentsPath, filename);
  fs.writeFileSync(filePath, content);
  console.log(`Componente creado: ${filename}`);
});

// Archivos a actualizar
const filesToUpdate = [
  'features/artist/components/ArtistCard.tsx',
  'features/events/components/EventCard.tsx',
  'features/offers/components/OfferCard.tsx',
  'features/auth/components/LoginForm.tsx',
  'features/auth/components/RegisterForm.tsx',
  'features/artist/pages/profile/components/ProfileForm/ProfileForm.tsx',
  'features/events/components/EventForm.tsx'
];

// Actualizar importaciones
filesToUpdate.forEach(file => {
  const filePath = path.join(srcPath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Archivo no encontrado: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Actualizar importaciones
  content = content.replace(
    /from ['"]@\/components\/(BaseCard|BaseForm)['"]/g,
    'from \'@/features/shared/components/$1\''
  );

  fs.writeFileSync(filePath, content);
  console.log(`Importaciones actualizadas en: ${file}`);
});

console.log('Consolidación de componentes completada!'); 