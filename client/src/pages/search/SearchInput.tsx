// client/src/pages/search/components/SearchInput.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  openFilters: () => void;
}

const SearchInput = ({ searchTerm, setSearchTerm, openFilters }: SearchInputProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar artistas o eventos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-10 pr-10"
      />
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-1 top-1/2 transform -translate-y-1/2"
        onClick={openFilters}
      >
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchInput;
