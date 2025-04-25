import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "wouter";

interface PageHeaderProps {
  title: string;
  address?: string;
  showCoordinates?: boolean;
}

export default function PageHeader({ title, address, showCoordinates }: PageHeaderProps) {
  return (
    <header className="flex items-center mb-6">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </Button>
      <div className="ml-2">
        <h1 className="font-bold text-2xl">{title}</h1>
        {showCoordinates && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {address || "Ubicación actual"}
          </div>
        )}
      </div>
    </header>
  );
}
