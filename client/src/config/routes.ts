export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  ARTIST: {
    BASE: '/artist',
    PROFILE: (id: string) => `/artist/${id}`,
    CREATE: '/artist/create',
    EDIT: (id: string) => `/artist/${id}/edit`,
  },
  PROFILE: {
    BASE: '/profile',
    ARTIST: '/profile/artist',
    EDIT: '/profile/edit',
  },
  EVENTS: {
    BASE: '/events',
    CREATE: '/events/create',
    DETAIL: (id: string) => `/events/${id}`,
  },
  CHAT: {
    BASE: '/chat',
    NEW: '/chat/new',
    THREAD: (id: string) => `/chat/${id}`,
  },
  FAVORITES: '/favorites',
  SEARCH: '/search',
  BLOG: '/blog',
  ECOMMERCE: '/ecommerce',
  NOT_FOUND: '/404',
} as const; 