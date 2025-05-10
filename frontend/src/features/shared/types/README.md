# Tipos Compartidos

Este directorio contiene tipos e interfaces que pueden ser utilizados en toda la aplicación.

## Estructura

```
types/
├── api/           # Tipos de API y respuestas
├── components/    # Props y tipos de componentes
└── models/        # Modelos de datos
```

## Uso

### Tipos de API

```tsx
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
```

### Props de Componentes

```tsx
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
```

### Modelos de Datos

```tsx
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
```