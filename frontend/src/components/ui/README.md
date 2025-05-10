# Componentes UI

Esta carpeta contiene los componentes de interfaz de usuario reutilizables de la aplicación.

## Estructura

```
ui/
  ├── __tests__/          # Tests de componentes
  ├── button.tsx          # Botón personalizado
  ├── OptimizedImage.tsx  # Componente de imagen optimizada
  ├── Spinner.tsx         # Indicador de carga
  ├── toast.tsx           # Sistema de notificaciones
  └── use-toast.ts        # Hook para notificaciones
```

## Componentes

### Button

Un botón personalizado que soporta diferentes variantes y estados.

```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="lg">
  Click me
</Button>
```

Props:
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean

### OptimizedImage

Componente de imagen con lazy loading y placeholder.

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  width={300}
  height={200}
/>
```

Props:
- `src`: string (URL de la imagen)
- `alt`: string (Texto alternativo)
- `width`: number (Ancho en píxeles)
- `height`: number (Alto en píxeles)
- `placeholder`: string (URL del placeholder)

### Toast

Sistema de notificaciones para mostrar mensajes al usuario.

```tsx
import { toast } from '@/components/ui/use-toast';

toast({
  title: "Success",
  description: "Operation completed successfully",
  variant: "default"
});
```

Variantes:
- `default`: Notificación estándar
- `destructive`: Para errores o advertencias
- `success`: Para operaciones exitosas

## Guía de Estilos

### Colores

- Primary: `#0070f3`
- Secondary: `#666666`
- Success: `#0070f3`
- Error: `#ff0000`
- Warning: `#f5a623`

### Tipografía

- Heading 1: 2.5rem (40px)
- Heading 2: 2rem (32px)
- Heading 3: 1.75rem (28px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

### Espaciado

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

## Accesibilidad

Todos los componentes siguen las mejores prácticas de accesibilidad:

- Roles ARIA apropiados
- Estados de foco visibles
- Textos alternativos para imágenes
- Soporte para navegación por teclado
- Contraste de colores adecuado

## Testing

Los componentes incluyen tests unitarios que cubren:

- Renderizado correcto
- Interacciones del usuario
- Estados y variantes
- Accesibilidad
- Manejo de errores 