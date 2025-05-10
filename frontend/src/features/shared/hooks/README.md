# Hooks Compartidos

Este directorio contiene hooks personalizados que pueden ser utilizados en toda la aplicación.

## Estructura

```
hooks/
├── auth/          # Hooks de autenticación
├── data/          # Hooks de datos y estado
└── ui/            # Hooks de UI y efectos
```

## Uso

### useFilters

```tsx
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
```

### useLoadingState

```tsx
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
```