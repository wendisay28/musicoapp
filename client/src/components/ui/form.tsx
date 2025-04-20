import React from 'react';
import cn from 'classnames';
import { Control, useController, ControllerRenderProps } from 'react-hook-form';

interface FormComponentsProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
}

export const Form = React.forwardRef<HTMLFormElement, FormComponentsProps>(
  ({ className, children, ...props }, ref) => (
    <form ref={ref} className={cn('w-full space-y-4', className)} {...props}>
      {children}
    </form>
  )
);

export const FormField = ({ 
  control, 
  name, 
  render 
}: { 
  control: Control<any>;
  name: string;
  render: (field: ControllerRenderProps) => React.ReactNode;
}) => {
  const { field } = useController({ control, name });
  return <div>{render(field)}</div>;
};

export const FormItem = React.forwardRef<HTMLDivElement, FormComponentsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
);

export const FormLabel = React.forwardRef<HTMLLabelElement, FormComponentsProps>(
  ({ className, children, ...props }, ref) => (
    <label ref={ref} className={cn('block mb-1 font-medium text-sm', className)} {...props}>
      {children}
    </label>
  )
);

export const FormControl = React.forwardRef<HTMLDivElement, FormComponentsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      {children}
    </div>
  )
);

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormComponentsProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-red-600 mt-1', className)} {...props}>
      {children}
    </p>
  )
);

export const FormDescription = React.forwardRef<HTMLParagraphElement, FormComponentsProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-500 mt-1', className)} {...props}>
      {children}
    </p>
  )
);

// Asignación de displayNames
[Form, FormItem, FormLabel, FormControl, FormMessage, FormDescription, FormField].forEach(
  (component) => {
    if ('displayName' in component) {
      (component as any).displayName = component.name;
    }
  }
);