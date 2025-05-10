# Componentes de Artistas

Este directorio contiene los componentes reutilizables relacionados con la funcionalidad de artistas en la aplicación ArtConect.

## Componentes Disponibles

### ServiceListSection
Muestra una lista de servicios ofrecidos por un artista.
- Props:
  - `services`: Array de servicios
  - `onEdit`: Función opcional para editar un servicio
  - `onDelete`: Función opcional para eliminar un servicio
  - `isEditable`: Booleano para mostrar/ocultar botones de edición

### MediaSection
Muestra una galería de imágenes del artista.
- Props:
  - `images`: Array de URLs de imágenes
  - `onImageClick`: Función opcional para manejar clics en imágenes

### PricingSection
Muestra los precios y cargos adicionales de los servicios.
- Props:
  - `basePrice`: Precio base del servicio
  - `currency`: Moneda (por defecto: 'USD')
  - `additionalFees`: Array opcional de cargos adicionales

### AvailabilitySection
Muestra los horarios disponibles del artista.
- Props:
  - `timeSlots`: Array de horarios disponibles
  - `onTimeSlotClick`: Función opcional para manejar la selección de horarios

## Uso

```tsx
import {
  ServiceListSection,
  MediaSection,
  PricingSection,
  AvailabilitySection,
} from '@/features/shared/components/artist';

function ArtistProfile() {
  return (
    <div>
      <ServiceListSection
        services={artistServices}
        isEditable={isArtist}
        onEdit={handleEditService}
        onDelete={handleDeleteService}
      />
      <MediaSection
        images={artistImages}
        onImageClick={handleImageClick}
      />
      <PricingSection
        basePrice={100}
        currency="EUR"
        additionalFees={[
          { name: 'Materiales', amount: 20 },
          { name: 'Envío', amount: 15 },
        ]}
      />
      <AvailabilitySection
        timeSlots={availableTimeSlots}
        onTimeSlotClick={handleTimeSlotSelect}
      />
    </div>
  );
}
```

## Pruebas

Los componentes incluyen pruebas unitarias completas que cubren:
- Renderizado correcto
- Manejo de eventos
- Estados condicionales
- Formateo de datos
- Validación de props

Para ejecutar las pruebas:
```bash
npm run test
```

Para ver la cobertura de pruebas:
```bash
npm run test:coverage
```

## Contribución

1. Asegúrate de que los cambios pasen todas las pruebas
2. Mantén la cobertura de pruebas por encima del 80%
3. Sigue las convenciones de código establecidas
4. Actualiza la documentación según sea necesario 