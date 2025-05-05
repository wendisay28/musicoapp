# EventDetailsPage

## Descripción
El componente `EventDetailsPage` muestra los detalles completos de un evento específico, incluyendo información básica, lista de asistentes y detalles del organizador.

## Estructura
- **EventHeader**: Muestra el encabezado del evento
- **Card de Información**: Muestra detalles como fecha, hora, ubicación, precio y capacidad
- **Card de Asistentes**: Lista los asistentes al evento con sus avatares y datos básicos
- **Card del Organizador**: Muestra la información del organizador del evento

## Props
No recibe props directamente, utiliza el parámetro `id` de la URL para cargar los datos del evento.

## Hooks
- `useParams`: Obtiene el ID del evento de la URL
- `useEvent`: Hook personalizado para cargar los datos del evento

## Mejoras Sugeridas

1. **Manejo de Estados de Carga**
   - Implementar un componente de skeleton loading
   - Agregar animaciones de transición

2. **Optimización de Rendimiento**
   - Implementar lazy loading para imágenes
   - Agregar paginación para la lista de asistentes

3. **Mejoras de UX**
   - Agregar botones de acción (registrarse, compartir, etc.)
   - Implementar un mapa para la ubicación
   - Agregar funcionalidad de favoritos

4. **Accesibilidad**
   - Agregar atributos ARIA
   - Mejorar el contraste de colores
   - Implementar navegación por teclado

5. **Validación de Datos**
   - Agregar validación para URLs de imágenes
   - Manejar casos de datos faltantes

## Ejemplo de Uso
```tsx
// En el router
<Route path="/events/:id" element={<EventDetailsPage />} />
```

## Dependencias
- React Router DOM
- Componentes UI personalizados (Card, GridList)
- Funciones de formateo (formatDate, formatTime, formatPrice) 