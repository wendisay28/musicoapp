# Arquitectura de la Aplicación

## Estructura de Carpetas

### ProfileArt/
Esta carpeta maneja todo lo relacionado con perfiles de usuarios y artistas.

#### profile/
- **profile.tsx**: Página principal de perfil de usuario
  - Maneja autenticación
  - Carga datos del usuario
  - Gestiona estados de edición
  - Navegación por pestañas

#### artist-profile/
- **index.ts**: Punto de entrada del feature
- **types/index.ts**: Tipos específicos del perfil de artista
- **components/**: Componentes específicos del perfil de artista
  - gallery/: Componentes de galería
  - services/: Componentes de servicios
  - reviews/: Componentes de reseñas
  - availability/: Componentes de disponibilidad

#### create-artist-profile/
- **create-artist-profile.tsx**: Formulario principal de creación
- **schema.ts**: Esquemas de validación
- **ArtistInfoSection.tsx**: Sección de información básica
- **PricingSection.tsx**: Sección de precios
- **MediaSection.tsx**: Sección de galería
- **ServiceListSection.tsx**: Sección de servicios
- **AvailabilitySection.tsx**: Sección de disponibilidad

#### common/
- **types/**: Tipos compartidos
- **components/**: Componentes reutilizables
- **hooks/**: Hooks personalizados

### artist/
Esta carpeta maneja la visualización pública de perfiles de artistas.

#### [id]/
- **index.tsx**: Página pública del perfil de artista
  - Vista optimizada para visitantes
  - Componentes de presentación
  - Sistema de reseñas
  - Calendario de disponibilidad

## Flujo de Datos

1. **Creación de Perfil**
   - Usuario inicia en `/ProfileArt/create-artist-profile`
   - Completa formularios paso a paso
   - Datos validados con Zod
   - Perfil creado en backend

2. **Gestión de Perfil**
   - Usuario accede a `/ProfileArt/profile`
   - Puede editar información personal
   - Puede gestionar perfil de artista
   - Puede ver historial y estadísticas

3. **Visualización Pública**
   - Visitantes acceden a `/artist/[id]`
   - Ven perfil optimizado
   - Pueden contactar al artista
   - Pueden ver trabajos y reseñas

## Recomendaciones de Uso

1. **Para Desarrolladores**
   - Usar tipos de `common/types` para consistencia
   - Reutilizar componentes de `common/components`
   - Seguir esquemas de validación definidos

2. **Para Mantenimiento**
   - Mantener separación clara entre vistas públicas y privadas
   - Usar hooks personalizados para lógica compartida
   - Seguir estructura de carpetas establecida

3. **Para Nuevas Características**
   - Agregar tipos en carpetas correspondientes
   - Crear componentes reutilizables en `common`
   - Documentar cambios en este archivo 