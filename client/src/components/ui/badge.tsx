import React from 'react';
import cn from 'classnames';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
};

const variantClasses = {
  default: 'bg-gray-200 text-gray-800',
  secondary: 'bg-gray-300 text-gray-900',
  outline: 'border border-gray-300 text-gray-800',
  destructive: 'bg-red-600 text-white',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
