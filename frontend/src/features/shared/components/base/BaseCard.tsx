import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from '@/features/shared/components/card';
/**
 * Componente base para tarjetas que muestra información con una imagen opcional,
 * título, rol y precio.
 *
 * @component
 * @example
 * ```tsx
 * <BaseCard
 *   id="1"
 *   name="Artista Ejemplo"
 *   role="Músico"
 *   price={100}
 *   priceUnit="€"
 *   imageUrl="/images/artist.jpg"
 *   variant="artist"
 *   onClick={() => console.log('clicked')}
 * />
 * ```
 */
export function BaseCard (props: any){ id, name, role, price, priceUnit, imageUrl, variant = "default", className = "", onClick, }) {
    return (_jsx(Card, { className: `cursor-pointer hover:shadow-lg transition-shadow ${className}`, onClick: onClick, children: _jsxs(CardContent, { className: "p-4", children: [imageUrl && (_jsx("div", { className: "mb-4", children: _jsx("img", { src: imageUrl, alt: name, className: "w-full h-48 object-cover rounded-md" }) })), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-semibold", children: name }), role && _jsx("p", { className: "text-sm text-gray-500", children: role }), price && (_jsxs("p", { className: "text-sm font-medium", children: [price, " ", priceUnit] }))] })] }) }));
}
