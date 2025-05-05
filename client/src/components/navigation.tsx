import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Home, Search, Star, Map, Settings } from "lucide-react";

export function Navigation() {
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    toast({
      title: "Navegación",
      description: `Has cambiado a la pestaña ${tab}`,
    });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around items-center h-16">
        <Button
          variant={activeTab === "home" ? "default" : "ghost"}
          onClick={() => handleTabClick("home")}
        >
          <Home className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === "search" ? "default" : "ghost"}
          onClick={() => handleTabClick("search")}
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === "favorites" ? "default" : "ghost"}
          onClick={() => handleTabClick("favorites")}
        >
          <Star className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === "map" ? "default" : "ghost"}
          onClick={() => handleTabClick("map")}
        >
          <Map className="h-5 w-5" />
        </Button>
        <Button
          variant={activeTab === "settings" ? "default" : "ghost"}
          onClick={() => handleTabClick("settings")}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
} 