import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from '@/features/ui/components/badge';
import { cn } from "@/lib/utils";
const statusVariants: any = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
};
const statusText: any = {
    active: "Activa",
    completed: "Completada",
    cancelled: "Cancelada",
    pending: "Pendiente",
    accepted: "Aceptada",
    rejected: "Rechazada",
};
export function StatusBadge (props: any){ status, className }) {
    return (_jsx(Badge, { className: cn(statusVariants[status], className), children: statusText[status] }));
}
