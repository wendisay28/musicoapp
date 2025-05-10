import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
/**
 * Componente que muestra una calificación con estrellas
 *
 * @example
 * ```tsx
 * // Visualización simple
 * <RatingStars rating={4.5} />
 *
 * // Interactivo
 * <RatingStars
 *   rating={rating}
 *   interactive
 *   onChange={handleRatingChange}
 * />
 * ```
 */
export function RatingStars (props: any){ rating, size = 'md', interactive = false, onChange, className }) {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);
    const sizeClasses: any = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };
    return (_jsx("div", { className: cn('flex items-center gap-1', className), role: interactive ? 'radiogroup' : 'img', "aria-label": `Calificación: ${rating} de 5 estrellas`, children: stars.map((star) => (_jsx(Star, { className: cn(sizeClasses[size], star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300', interactive && 'cursor-pointer hover:text-yellow-400'), onClick: () => interactive && onChange?.(star), role: interactive ? 'radio' : 'presentation', "aria-checked": star <= rating, tabIndex: interactive ? 0 : undefined }, star))) }));
}
