// Muestra filtros para buscar productos por categoría, precio u otros criterios

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface FilterOption {
  value: string;
  label: string;
}

interface BaseFilterProps {
  searchPlaceholder?: string;
  categoryOptions?: FilterOption[];
  priceRange?: { min: number; max: number };
  onSearch?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  onPriceChange?: (value: number[]) => void;
  onClear?: () => void;
}

export function BaseFilter({
  searchPlaceholder = "Buscar...",
  categoryOptions = [],
  priceRange = { min: 0, max: 1000 },
  onSearch,
  onCategoryChange,
  onPriceChange,
  onClear
}: BaseFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  const [price, setPrice] = useState([priceRange.min, priceRange.max]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handlePriceChange = (value: number[]) => {
    setPrice(value);
    onPriceChange?.(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1"
        />
        {categoryOptions.length > 0 && (
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Rango de Precio</label>
        <Slider
          value={price}
          onValueChange={handlePriceChange}
          min={priceRange.min}
          max={priceRange.max}
          step={10}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${price[0]}</span>
          <span>${price[1]}</span>
        </div>
      </div>

      <Button variant="outline" onClick={onClear}>
        Limpiar Filtros
      </Button>
    </div>
  );
}
