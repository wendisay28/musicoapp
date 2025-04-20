import React from 'react';
import cn from 'classnames';

export type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  children?: React.ReactNode;
};

export const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn('aspect-square h-full w-full object-cover', className)}
        alt={alt}
        {...props}
      />
    );
  }
);

export const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('flex h-full w-full items-center justify-center bg-gray-300 text-gray-600', className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
AvatarImage.displayName = 'AvatarImage';
AvatarFallback.displayName = 'AvatarFallback';
