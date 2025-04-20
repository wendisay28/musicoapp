import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Download, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrdersTabsProps {
  className?: string;
  tabClasses?: {
    base?: string;
    active?: string;
    inactive?: string;
  };
}

/**
 * Componente de pestañas para navegar entre tipos de órdenes
 * 
 * @param {string} [className] - Clases adicionales para el contenedor principal
 * @param {object} [tabClasses] - Clases personalizadas para los tabs
 * @param {string} [tabClasses.base] - Clases base para todos los tabs
 * @param {string} [tabClasses.active] - Clases para el tab activo
 * @param {string} [tabClasses.inactive] - Clases para los tabs inactivos
 */
export function OrdersTabs({ className, tabClasses }: OrdersTabsProps) {
  const tabs = [
    {
      value: "made",
      icon: Send,
      label: "Realizadas",
      ariaLabel: "Ver órdenes realizadas por ti"
    },
    {
      value: "received",
      icon: Download,
      label: "Recibidas",
      ariaLabel: "Ver órdenes recibidas pendientes"
    },
    {
      value: "accepted",
      icon: CheckCircle,
      label: "Aceptadas",
      ariaLabel: "Ver órdenes aceptadas en proceso"
    }
  ];

  return (
    <TabsList 
      className={cn(
        "w-full grid grid-cols-3 bg-muted/50",
        className
      )}
    >
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className={cn(
            "flex items-center gap-2 transition-all",
            tabClasses?.base,
            "data-[state=active]:bg-background data-[state=active]:shadow-sm",
            tabClasses?.active,
            "data-[state=inactive]:hover:bg-muted",
            tabClasses?.inactive
          )}
          aria-label={tab.ariaLabel}
        >
          <tab.icon className="h-4 w-4" />
          <span className="sr-only md:not-sr-only">{tab.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}