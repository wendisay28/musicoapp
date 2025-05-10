# Componentes Base

Este directorio contiene componentes base reutilizables que sirven como fundamento para otros componentes más específicos.

## BaseCard

El componente `BaseCard` es una tarjeta reutilizable que muestra información con una imagen opcional, título, rol y precio.

### Uso

```tsx
import { BaseCard } from '@/features/shared/components/base/BaseCard';

function MyComponent() {
  return (
    <BaseCard
      id="1"
      name="Artista Ejemplo"
      role="Músico"
      price={100}
      priceUnit="€"
      imageUrl="/images/artist.jpg"
      variant="artist"
      onClick={() => console.log('clicked')}
    />
  );
}
```

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| id | string | Sí | Identificador único de la tarjeta |
| name | string | Sí | Nombre o título de la tarjeta |
| role | string | No | Rol o categoría |
| price | number | No | Precio |
| priceUnit | string | No | Unidad de precio |
| imageUrl | string | No | URL de la imagen |
| variant | "default" \| "artist" \| "event" | No | Variante de la tarjeta |
| className | string | No | Clases CSS adicionales |
| onClick | () => void | No | Callback al hacer clic en la tarjeta |

## BaseForm

El componente `BaseForm` es un formulario base que maneja la validación y el estado del formulario.

### Uso

```tsx
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
```

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| schema | z.ZodType | Sí | Esquema de validación |
| onSubmit | (data: T) => Promise<void> \| void | Sí | Callback al enviar el formulario |
| initialData | Partial<T> | No | Datos iniciales del formulario |
| isSubmitting | boolean | No | Estado de envío |
| onCancel | () => void | No | Callback al cancelar |
| children | ReactNode | No | Contenido del formulario | 