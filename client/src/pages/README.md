# Estructura de Páginas

## ProfileArt/
Esta carpeta contiene todo lo relacionado con la gestión de perfiles de usuarios y artistas.

### profile/
- **Propósito**: Gestión del perfil personal del usuario
- **Contenido**:
  - Vista y edición de información personal
  - Gestión de preferencias
  - Historial de pedidos
  - Configuración de cuenta

### artist-profile/
- **Propósito**: Vista pública del perfil de un artista
- **Contenido**:
  - Información del artista
  - Galería de trabajos
  - Servicios ofrecidos
  - Reseñas y calificaciones
  - Disponibilidad para citas

### create-artist-profile/
- **Propósito**: Formulario para crear/registrar un perfil de artista
- **Contenido**:
  - Formularios de registro
  - Validación de datos
  - Subida de imágenes
  - Configuración inicial

### common/
- **Propósito**: Componentes y utilidades compartidas entre las páginas de ProfileArt
- **Contenido**:
  - Componentes reutilizables
  - Hooks personalizados
  - Tipos y interfaces comunes

## artist/
Esta carpeta contiene las páginas relacionadas con la visualización y gestión de artistas.

### [id]/ o [artistId]/
- **Propósito**: Página pública de perfil de artista
- **Contenido**:
  - Información detallada del artista
  - Galería de trabajos
  - Servicios ofrecidos
  - Sistema de reseñas
  - Calendario de disponibilidad
  - Opciones de contacto

## Recomendaciones de Uso

1. Para ver el perfil de un artista como usuario:
   - Usar la ruta `/artist/[id]`
   - Esta es la versión pública y optimizada para visitantes

2. Para gestionar tu propio perfil de artista:
   - Usar la ruta `/ProfileArt/profile`
   - Aquí encontrarás todas las herramientas de gestión

3. Para crear un nuevo perfil de artista:
   - Usar la ruta `/ProfileArt/create-artist-profile`
   - Sigue el proceso guiado de registro

4. Para ver el perfil de otro artista:
   - Usar la ruta `/artist/[id]`
   - Esta es la versión pública y optimizada para visitantes 