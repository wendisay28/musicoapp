import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { Skeleton } from '@/features/shared/components/ui/skeleton';
import { cn } from '@/lib/utils';
/**
 * Componente Skeleton para mostrar mientras se cargan las órdenes
 *
 * @param {OrdersSkeletonProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de skeleton para órdenes
 */
export const OrdersSkeleton: React.FC = ({ count = 3, className, height = 'h-24', gridLayout = false, }) => {
    return (_jsx("div", { className: cn(gridLayout ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4', className), children: Array.from({ length: count }).map((_, i) => (_jsx(Skeleton, { className: cn('w-full rounded-lg', height, gridLayout ? 'h-full' : '') }, `order-skeleton-${i}`))) }));
};
