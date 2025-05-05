import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "active" | "completed" | "cancelled" | "pending" | "accepted" | "rejected";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusVariants = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
} as const;

const statusText = {
  active: "Activa",
  completed: "Completada",
  cancelled: "Cancelada",
  pending: "Pendiente",
  accepted: "Aceptada",
  rejected: "Rechazada",
} as const;

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge className={cn(statusVariants[status], className)}>
      {statusText[status]}
    </Badge>
  );
} 