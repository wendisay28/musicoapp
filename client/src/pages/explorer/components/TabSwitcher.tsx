import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TabType = "artists" | "events";

interface TabSwitcherProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: "artists", label: "Artistas" },
    { id: "events", label: "Eventos" }
  ];

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          className={cn(
            "whitespace-nowrap",
            activeTab === tab.id && "bg-primary text-primary-foreground"
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
} 