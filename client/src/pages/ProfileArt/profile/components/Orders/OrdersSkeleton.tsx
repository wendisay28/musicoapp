import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OrdersSkeletonProps {
  /**
   * Número de elementos skeleton a mostrar
   * @default 3
   */
  count?: number;
  /**
   * Clases adicionales para el contenedor
   */
  className?: string;
  /**
   * Altura de cada elemento skeleton
   * @default 'h-24'
   */
  height?: string;
  /**
   * Si es true, muestra un diseño de grid en lugar de lista
   * @default false
   */
  gridLayout?: boolean;
}

/**
 * Componente Skeleton para mostrar mientras se cargan las órdenes
 * 
 * @param {OrdersSkeletonProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de skeleton para órdenes
 */
export const OrdersSkeleton: React.FC<OrdersSkeletonProps> = ({
  count = 3,
  className,
  height = 'h-24',
  gridLayout = false,
}) => {
  return (
    <div className={cn(
      gridLayout ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4',
      className
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton 
          key={`order-skeleton-${i}`} 
          className={cn(
            'w-full rounded-lg',
            height,
            gridLayout ? 'h-full' : ''
          )} 
        />
      ))}
    </div>
  );
};