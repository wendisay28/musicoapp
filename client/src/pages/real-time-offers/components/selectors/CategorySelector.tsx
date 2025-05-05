import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: string[];
  onSelect: (categoryId: string) => void;
}

export function CategorySelector({
  categories,
  selectedCategories,
  onSelect,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          Categorías
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="max-h-[300px] overflow-y-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onSelect(category.id)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedCategories.includes(category.id) ? "opacity-100" : "opacity-0"
                )}
              />
              {category.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
} 