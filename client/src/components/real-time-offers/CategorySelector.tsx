import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySelectorProps {
  value: {
    category: string;
    subcategory: string;
  };
  onChange: (value: { category: string; subcategory: string }) => void;
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="space-y-4">
      <Select
        value={value.category}
        onValueChange={(category) => onChange({ ...value, category })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fotografia">Fotografía</SelectItem>
          <SelectItem value="musica">Música</SelectItem>
          <SelectItem value="arte">Arte</SelectItem>
        </SelectContent>
      </Select>

      {value.category && (
        <Select
          value={value.subcategory}
          onValueChange={(subcategory) => onChange({ ...value, subcategory })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una subcategoría" />
          </SelectTrigger>
          <SelectContent>
            {value.category === "fotografia" && (
              <>
                <SelectItem value="eventos">Eventos</SelectItem>
                <SelectItem value="retratos">Retratos</SelectItem>
                <SelectItem value="producto">Producto</SelectItem>
              </>
            )}
            {value.category === "musica" && (
              <>
                <SelectItem value="dj">DJ</SelectItem>
                <SelectItem value="banda">Banda</SelectItem>
                <SelectItem value="solo">Artista Solista</SelectItem>
              </>
            )}
            {value.category === "arte" && (
              <>
                <SelectItem value="pintura">Pintura</SelectItem>
                <SelectItem value="escultura">Escultura</SelectItem>
                <SelectItem value="digital">Arte Digital</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      )}
    </div>
  );
} 