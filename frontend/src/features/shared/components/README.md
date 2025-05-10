# Componentes Compartidos

Este directorio contiene componentes base y reutilizables que pueden ser utilizados en toda la aplicación.

## Estructura

```
components/
├── base/          # Componentes base (BaseCard, BaseForm, BaseFilter)
├── feedback/      # Componentes de feedback (Toast, Alert)
├── layout/        # Componentes de layout (Container, Grid)
└── ui/           # Componentes de UI (Button, Input, SearchInput)
```

## Uso

### BaseCard

```tsx
import { BaseCard } from '@/features/shared/components/base/BaseCard';

function MyCard() {
  return (
    <BaseCard
      id="1"
      name="Mi Tarjeta"
      role="Artista"
      price={100}
      priceUnit="€"
      imageUrl="/path/to/image.jpg"
      variant="artist"
      onClick={() => console.log("clicked")}
    />
  );
}
```

### SearchInput

```tsx
import { SearchInput } from '@/features/shared/components/ui/SearchInput';

function MySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <SearchInput
      value={searchTerm}
      onChange={setSearchTerm}
      placeholder="Buscar..."
      showClearButton
      onClear={() => setSearchTerm('')}
      showFilterButton
      onOpenFilters={() => console.log('open filters')}
    />
  );
}
```

### BaseFilter

```tsx
import { BaseFilter } from '@/features/shared/components/base/BaseFilter';

function MyFilter() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  
  return (
    <BaseFilter
      label="Categorías"
      options={[
        { value: '1', label: 'Opción 1' },
        { value: '2', label: 'Opción 2' }
      ]}
      selectedValues={selectedValues}
      onFilterChange={setSelectedValues}
      isMulti
    />
  );
}
```

## Convenciones

1. **Nombres de Componentes**:
   - Usar PascalCase para nombres de componentes
   - Prefijar componentes base con "Base"
   - Usar nombres descriptivos y específicos

2. **Props**:
   - Documentar todas las props con JSDoc
   - Usar interfaces TypeScript para las props
   - Proporcionar valores por defecto cuando sea apropiado

3. **Estilos**:
   - Usar Tailwind CSS para estilos
   - Mantener clases CSS organizadas y reutilizables
   - Usar el helper `cn` para combinar clases

4. **Accesibilidad**:
   - Incluir atributos ARIA apropiados
   - Asegurar navegación por teclado
   - Proporcionar textos alternativos para imágenes

5. **Testing**:
   - Escribir pruebas para cada componente
   - Cubrir casos de uso principales
   - Incluir pruebas de accesibilidad