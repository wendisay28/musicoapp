import React from 'react';
import cn from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
};

const variantClasses = {
  default: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'border border-gray-300 hover:bg-gray-100',
  ghost: 'bg-transparent hover:bg-gray-100',
  link: 'underline text-primary hover:text-primary-dark',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
};

const sizeClasses = {
  default: 'px-4 py-2 text-sm',
  sm: 'px-2 py-1 text-xs',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Component = asChild ? React.Fragment : 'button';
    return (
      <Component
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
