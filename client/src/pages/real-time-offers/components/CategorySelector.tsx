import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = {
  "Artes Musicales": ["Músicos", "Cantantes", "Compositores", "Directores"],
  "Artes Visuales": ["Pintores", "Escultores", "Fotógrafos", "Ilustradores"],
  // ... otras categorías
};

export function CategorySelector({ 
  value,
  onChange 
}: {
  value: { category: string; subcategory: string };
  onChange: (val: { category: string; subcategory: string }) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Categoría</Label>
        <Select
          value={value.category}
          onValueChange={(category) => onChange({ category, subcategory: "" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(categories).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {value.category && (
        <div className="space-y-2">
          <Label>Subcategoría</Label>
          <Select
            value={value.subcategory}
            onValueChange={(subcategory) => onChange({ ...value, subcategory })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una subcategoría" />
            </SelectTrigger>
            <SelectContent>
              {categories[value.category as keyof typeof categories]?.map(
                (subcategory) => (
                  <SelectItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}