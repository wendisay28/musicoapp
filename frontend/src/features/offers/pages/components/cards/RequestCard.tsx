import React from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Clock, MapPin, DollarSign, Calendar, MessageCircle, Star } from "lucide-react";
import { Badge } from '@/features/ui/components/badge';
import { Button } from '@/features/ui/components/button';
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
export function RequestCard (props: any){ request, variant = "default", onViewDetails, onContact }) {
    const statusVariant: any = {
        active: "bg-green-100 text-green-800",
        completed: "bg-blue-100 text-blue-800",
        cancelled: "bg-red-100 text-red-800",
    };
    const statusText: any = {
        active: "Activa",
        completed: "Completada",
        cancelled: "Cancelada"
    };
    return (_jsxs("div", { className: cn("border rounded-lg overflow-hidden transition-all hover:shadow-md", variant === "compact" ? "p-3" : "p-5"), children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsx("h3", { className: "font-semibold text-lg", children: request.title }), _jsx(Badge, { className: statusVariant[request.status], children: statusText[request.status] })] }), _jsx("p", { className: cn("text-muted-foreground", variant === "compact" ? "text-sm" : "mb-4"), children: request.description }), _jsxs("div", { className: cn("grid gap-2", variant === "compact" ? "grid-cols-2 text-sm" : "grid-cols-2 md:grid-cols-4"), children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: request.location })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: new Date(request.date).toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "long",
                                }) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: request.time })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: new Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                }).format(request.price) })] })] }), variant !== "compact" && (_jsxs(_Fragment, { children: [request.tags && request.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: request.tags.map((tag) => (_jsx(Badge, { variant: "secondary", children: tag }, tag))) })), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-3", children: [_jsxs("h4", { className: "font-medium", children: ["Propuestas (", request.responses.length, ")"] }), onViewDetails && (_jsx(Button, { variant: "link", onClick: onViewDetails, children: "Ver todas" }))] }), request.responses.length > 0 ? (_jsx("div", { className: "space-y-3", children: request.responses.slice(0, 2).map((response) => (_jsxs("div", { className: "border rounded p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: response.artistPhoto, alt: response.artistName, className: "w-8 h-8 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: response.artistName }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-3 w-3 text-amber-500 fill-amber-500" }), _jsx("span", { className: "text-sm text-muted-foreground", children: response.artistRating.toFixed(1) })] })] })] }), _jsx(Badge, { variant: "outline", children: new Intl.NumberFormat("es-CO", {
                                                        style: "currency",
                                                        currency: "COP",
                                                    }).format(response.price) })] }), onContact && (_jsxs(Button, { variant: "outline", size: "sm", className: "w-full mt-2", onClick: onContact, children: [_jsx(MessageCircle, { className: "h-4 w-4 mr-2" }), "Contactar"] }))] }, response.id))) })) : (_jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "A\u00FAn no hay propuestas para esta solicitud" }))] })] })), variant === "compact" && (_jsx("div", { className: "mt-3 text-sm text-muted-foreground", children: formatDistanceToNow(new Date(request.date), {
                    addSuffix: true,
                    locale: es
                }) }))] }));
}
