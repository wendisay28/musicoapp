import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

// Estructura de directorios a crear
const directories = [
  'features/shared/components/base',
  'features/shared/components/feedback',
  'features/shared/components/layout',
  'features/shared/hooks/auth',
  'features/shared/hooks/data',
  'features/shared/hooks/ui',
  'features/shared/types/api',
  'features/shared/types/components',
  'features/shared/types/models'
];

// Crear directorios
directories.forEach(dir => {
  const dirPath = path.join(srcPath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directorio creado: ${dir}`);
  }
});

// Tipos a consolidar
const types = {
  'api/index.ts': `export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}`,

  'components/index.ts': `import { ReactNode } from 'react';

export interface BaseProps {
  /** Clases CSS personalizadas */
  className?: string;
  /** ID del elemento */
  id?: string;
  /** Estilos en línea */
  style?: React.CSSProperties;
}

export interface WithChildren {
  /** Contenido del componente */
  children?: ReactNode;
}

export interface WithRequiredChildren {
  /** Contenido requerido del componente */
  children: ReactNode;
}

export interface BaseCardProps extends BaseProps {
  /** Título de la tarjeta */
  title?: string;
  /** Descripción de la tarjeta */
  description?: string;
  /** URL de la imagen */
  imageUrl?: string;
  /** Contenido adicional */
  children?: ReactNode;
  /** Acciones de la tarjeta */
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }[];
}

export interface BaseFormProps<T> {
  /** Datos iniciales del formulario */
  initialData?: Partial<T>;
  /** Callback al enviar el formulario */
  onSubmit: (data: T) => Promise<void> | void;
  /** Estado de envío */
  isSubmitting?: boolean;
  /** Callback al cancelar */
  onCancel?: () => void;
  /** Contenido del formulario */
  children?: ReactNode;
}

export interface BaseListProps<T> {
  /** Lista de elementos */
  items: T[];
  /** Renderizador de elementos */
  renderItem: (item: T) => ReactNode;
  /** Estado de carga */
  isLoading?: boolean;
  /** Mensaje cuando no hay elementos */
  emptyMessage?: string;
  /** Clases CSS personalizadas */
  className?: string;
}

export interface BaseFilterProps<T> {
  /** Filtros actuales */
  filters: T;
  /** Callback al cambiar filtros */
  onFilterChange: (key: keyof T, value: any) => void;
  /** Callback al limpiar filtros */
  onClearFilters?: () => void;
  /** Estado de carga */
  isLoading?: boolean;
  /** Clases CSS personalizadas */
  className?: string;
}`,

  'models/index.ts': `export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'artist' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  userId: string;
  bio: string;
  services: Service[];
  reviews: Review[];
  rating: number;
  location: Location;
  availability: Availability[];
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  artistId: string;
  title: string;
  description: string;
  date: string;
  location: Location;
  price: number;
  capacity: number;
  attendees: string[];
  status: 'draft' | 'published' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  artistId: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  artistId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}`
};

// Hooks a consolidar
const hooks = {
  'data/useFilters.ts': `import { useState, useCallback } from 'react';
import { useDebounce } from '../ui/useDebounce';

export interface FilterState {
  [key: string]: any;
}

export interface UseFiltersProps {
  initialFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  debounceTime?: number;
}

export function useFilters({ 
  initialFilters = {}, 
  onFilterChange,
  debounceTime = 300 
}: UseFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const debouncedFilters = useDebounce(filters, debounceTime);

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);

  const clearFilters = useCallback(() => {
    setFilters({});
    onFilterChange?.({});
  }, [onFilterChange]);

  return {
    filters,
    debouncedFilters,
    handleFilterChange,
    clearFilters
  };
}`,

  'ui/useDebounce.ts': `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}`,

  'ui/useLoadingState.ts': `import { useState, useCallback } from 'react';

export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const withLoading = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      return await promise;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    withLoading
  };
}`
};

// Componentes base a consolidar
const components = {
  'base/BaseCard.tsx': `import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BaseCardProps } from '@/features/shared/types/components';

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

  'base/BaseForm.tsx': `import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { BaseFormProps } from '@/features/shared/types/components';

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

// READMEs a crear
const readmes = {
  'features/shared/README.md': `# Shared Features

Este directorio contiene componentes, hooks y tipos compartidos entre diferentes features de la aplicación.

## Estructura

\`\`\`
shared/
├── components/     # Componentes reutilizables
├── hooks/         # Hooks personalizados
└── types/         # Tipos y interfaces
\`\`\`

## Uso

### Componentes

Los componentes base (\`BaseCard\`, \`BaseForm\`, etc.) están diseñados para ser extendidos y personalizados según las necesidades específicas de cada feature.

### Hooks

Los hooks compartidos proporcionan funcionalidad común como:
- Manejo de estado de carga
- Manejo de errores
- Filtros y búsqueda
- Autenticación

### Tipos

Los tipos están organizados en tres categorías:
- \`api/\`: Tipos relacionados con la API
- \`components/\`: Props y tipos de componentes
- \`models/\`: Modelos de datos de la aplicación

## Mejores Prácticas

1. Siempre extender los componentes base en lugar de crear nuevos desde cero
2. Utilizar los hooks compartidos para funcionalidad común
3. Mantener los tipos actualizados y documentados
4. Seguir las convenciones de nombrado establecidas`,

  'features/shared/components/README.md': `# Componentes Compartidos

Este directorio contiene componentes base y reutilizables que pueden ser utilizados en toda la aplicación.

## Estructura

\`\`\`
components/
├── base/          # Componentes base (BaseCard, BaseForm)
├── feedback/      # Componentes de feedback (Toast, Alert)
└── layout/        # Componentes de layout (Container, Grid)
\`\`\`

## Uso

### BaseCard

\`\`\`tsx
import { BaseCard } from '@/features/shared/components/base/BaseCard';

function MyCard() {
  return (
    <BaseCard
      title="Mi Tarjeta"
      description="Descripción de la tarjeta"
      imageUrl="/path/to/image.jpg"
      actions={[
        {
          label: "Acción",
          onClick: () => console.log("clicked")
        }
      ]}
    >
      Contenido adicional
    </BaseCard>
  );
}
\`\`\`

### BaseForm

\`\`\`tsx
import { BaseForm } from '@/features/shared/components/base/BaseForm';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

function MyForm() {
  return (
    <BaseForm
      schema={schema}
      onSubmit={async (data) => {
        console.log(data);
      }}
    >
      {/* Campos del formulario */}
    </BaseForm>
  );
}
\`\`\``,

  'features/shared/hooks/README.md': `# Hooks Compartidos

Este directorio contiene hooks personalizados que pueden ser utilizados en toda la aplicación.

## Estructura

\`\`\`
hooks/
├── auth/          # Hooks de autenticación
├── data/          # Hooks de datos y estado
└── ui/            # Hooks de UI y efectos
\`\`\`

## Uso

### useFilters

\`\`\`tsx
import { useFilters } from '@/features/shared/hooks/data/useFilters';

function MyComponent() {
  const { filters, handleFilterChange } = useFilters({
    initialFilters: { search: '' },
    onFilterChange: (filters) => {
      console.log(filters);
    }
  });

  return (
    <input
      value={filters.search}
      onChange={(e) => handleFilterChange('search', e.target.value)}
    />
  );
}
\`\`\`

### useLoadingState

\`\`\`tsx
import { useLoadingState } from '@/features/shared/hooks/ui/useLoadingState';

function MyComponent() {
  const { isLoading, withLoading } = useLoadingState();

  const handleClick = async () => {
    await withLoading(
      fetch('/api/data').then(res => res.json())
    );
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Cargando...' : 'Cargar datos'}
    </button>
  );
}
\`\`\``,

  'features/shared/types/README.md': `# Tipos Compartidos

Este directorio contiene tipos e interfaces que pueden ser utilizados en toda la aplicación.

## Estructura

\`\`\`
types/
├── api/           # Tipos de API y respuestas
├── components/    # Props y tipos de componentes
└── models/        # Modelos de datos
\`\`\`

## Uso

### Tipos de API

\`\`\`tsx
import { ApiResponse, PaginatedResponse } from '@/features/shared/types/api';

// Respuesta simple
const response: ApiResponse<User> = {
  data: user,
  status: 200
};

// Respuesta paginada
const paginated: PaginatedResponse<User> = {
  items: users,
  total: 100,
  page: 1,
  pageSize: 10,
  totalPages: 10
};
\`\`\`

### Props de Componentes

\`\`\`tsx
import { BaseCardProps, BaseFormProps } from '@/features/shared/types/components';

// Props de tarjeta
const cardProps: BaseCardProps = {
  title: "Mi Tarjeta",
  description: "Descripción"
};

// Props de formulario
const formProps: BaseFormProps<User> = {
  onSubmit: async (data) => {
    console.log(data);
  }
};
\`\`\`

### Modelos de Datos

\`\`\`tsx
import { User, Artist, Event } from '@/features/shared/types/models';

// Usuario
const user: User = {
  id: "1",
  email: "user@example.com",
  displayName: "Usuario",
  role: "user"
};

// Artista
const artist: Artist = {
  id: "1",
  userId: "1",
  bio: "Biografía",
  services: [],
  reviews: [],
  rating: 5
};
\`\`\``
};

// Función para crear archivos
function createFiles(files, basePath) {
  Object.entries(files).forEach(([filename, content]) => {
    const filePath = path.join(srcPath, basePath, filename);
    const dirPath = path.dirname(filePath);
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Archivo creado: ${path.join(basePath, filename)}`);
  });
}

// Crear archivos
console.log('Iniciando consolidación final...');

// Crear tipos
createFiles(types, 'features/shared/types');

// Crear hooks
createFiles(hooks, 'features/shared/hooks');

// Crear componentes
createFiles(components, 'features/shared/components');

// Crear READMEs
createFiles(readmes, '');

console.log('Consolidación final completada!'); 