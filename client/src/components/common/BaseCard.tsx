import { ReactNode, memo } from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Props para el componente BaseCard
 * @interface BaseCardProps
 * @property {string} id - ID de la tarjeta
 * @property {string} title - Título de la tarjeta
 * @property {string} [description] - Descripción opcional de la tarjeta
 * @property {string} imageUrl - URL de la imagen de la tarjeta
 * @property {ReactNode} [footer] - Contenido opcional del pie de la tarjeta
 * @property {string} [className] - Clases CSS adicionales
 * @property {() => void} [onClick] - Función opcional para manejar clics en la tarjeta
 */
interface BaseCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Componente base para tarjetas que muestra una imagen, título, descripción y pie opcional
 * @component
 * @example
 * ```tsx
 * <BaseCard
 *   id="1"
 *   title="Título de la tarjeta"
 *   description="Descripción de la tarjeta"
 *   imageUrl="/ruta/a/imagen.jpg"
 *   footer={<Button>Acción</Button>}
 * />
 * ```
 */
export const BaseCard = memo(function BaseCard({
  id,
  title,
  description,
  imageUrl,
  footer,
  className,
  onClick
}: BaseCardProps) {
  return (
    <Card 
      id={id}
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg cursor-pointer",
        className
      )}
      onClick={onClick}
      data-testid={`base-card-${id}`}
    >
      <div className="relative aspect-video">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}); 