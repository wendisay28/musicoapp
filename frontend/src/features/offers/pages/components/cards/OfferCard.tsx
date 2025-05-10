import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from '@/features/shared/components/ui/avatar';
import { Badge } from '@/features/shared/components/ui/badge';
import { Button } from '@/features/shared/components/ui/button';
import { Star, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
export function OfferCard (props: any){ offer, variant = "default", onContact }) {
    const statusVariant: any = {
        PENDING: "bg-yellow-100 text-yellow-800",
        ACCEPTED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
        COUNTER_OFFER: "bg-blue-100 text-blue-800",
        COMPLETED: "bg-gray-100 text-gray-800",
        CANCELLED: "bg-red-100 text-red-800"
    };
    const statusText: any = {
        PENDING: "Pendiente",
        ACCEPTED: "Aceptada",
        REJECTED: "Rechazada",
        COUNTER_OFFER: "Contraoferta",
        COMPLETED: "Completada",
        CANCELLED: "Cancelada"
    };
    return (_jsxs("div", { className: cn("border rounded-lg overflow-hidden transition-all hover:shadow-md", variant === "compact" ? "p-3" : "p-5"), children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "h-10 w-10 border-2 border-muted", children: [_jsx(AvatarImage, { src: offer.artistId, alt: offer.title, className: "object-cover" }), _jsx(AvatarFallback, { className: "bg-muted font-medium", children: offer.title[0].toUpperCase() })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: offer.title }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-3 w-3 text-amber-500 fill-amber-500" }), _jsx("span", { className: "text-sm text-muted-foreground", children: offer.price.toLocaleString() })] })] })] }), _jsx(Badge, { className: statusVariant[offer.status], children: statusText[offer.status] })] }), _jsx("p", { className: cn("text-muted-foreground", variant === "compact" ? "text-sm" : "mb-4"), children: offer.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { variant: "outline", children: new Intl.NumberFormat("es-CO", {
                            style: "currency",
                            currency: "COP",
                        }).format(offer.price) }), onContact && (_jsxs(Button, { variant: "outline", size: "sm", onClick: onContact, children: [_jsx(MessageCircle, { className: "h-4 w-4 mr-2" }), "Contactar"] }))] }), variant === "compact" && (_jsx("div", { className: "mt-3 text-sm text-muted-foreground", children: formatDistanceToNow(new Date(offer.createdAt), {
                    addSuffix: true,
                    locale: es
                }) }))] }));
}
