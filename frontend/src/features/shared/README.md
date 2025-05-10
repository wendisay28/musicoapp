# Shared Features

Este directorio contiene componentes, hooks y tipos compartidos entre diferentes features de la aplicación.

## Estructura

```
shared/
├── components/     # Componentes reutilizables
├── hooks/         # Hooks personalizados
└── types/         # Tipos y interfaces
```

## Uso

### Componentes

Los componentes base (`BaseCard`, `BaseForm`, etc.) están diseñados para ser extendidos y personalizados según las necesidades específicas de cada feature.

### Hooks

Los hooks compartidos proporcionan funcionalidad común como:
- Manejo de estado de carga
- Manejo de errores
- Filtros y búsqueda
- Autenticación

### Tipos

Los tipos están organizados en tres categorías:
- `api/`: Tipos relacionados con la API
- `components/`: Props y tipos de componentes
- `models/`: Modelos de datos de la aplicación

## Mejores Prácticas

1. Siempre extender los componentes base en lugar de crear nuevos desde cero
2. Utilizar los hooks compartidos para funcionalidad común
3. Mantener los tipos actualizados y documentados
4. Seguir las convenciones de nombrado establecidas