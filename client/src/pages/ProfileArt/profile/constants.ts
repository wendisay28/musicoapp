/**
 * Datos constantes para el perfil
 */

export const PROFILE_SKELETON_LENGTH = 6;

export const categorias = {
  'Artes Musicales': ['Músicos', 'Cantantes', 'Compositores', 'Directores'],
  'Artes Visuales': ['Pintores', 'Escultores', 'Fotógrafos', 'Ilustradores'],
  'Artes Escénicas': ['Actores', 'Bailarines', 'Comediantes', 'Malabaristas'],
  'Diseño y Creatividad': ['Diseñadores Gráficos', 'Diseñadores Web', 'Diseñadores de Moda'],
  'Producción Audiovisual': ['Productores', 'Directores', 'Videógrafos', 'Editores'],
  'Escritura y Literatura': ['Escritores', 'Poetas', 'Guionistas', 'Editores'],
  'Gastronomía': ['Chefs', 'Reposteros', 'Mixólogos', 'Cocineros'],
  'Artesanía': ['Ceramistas', 'Joyeros', 'Carpinteros', 'Tejedores'],
};

export const orderStatusColors = {
  pending: 'bg-amber-100 text-amber-800',
  accepted: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};