import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import cn from 'classnames';
import { useController } from 'react-hook-form';
export const Form = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("form", { ref: ref, className: cn('w-full space-y-4', className), ...props, children: children })));
Form.displayName = 'Form';
export const FormField: React.FC = ({ control, name, render }) => {
    const { field } = useController({ control, name });
    return _jsx("div", { children: render(field) });
};
FormField.displayName = 'FormField';
export const FormItem = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('mb-4', className), ...props, children: children })));
FormItem.displayName = 'FormItem';
export const FormLabel = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("label", { ref: ref, className: cn('block mb-1 font-medium text-sm', className), ...props, children: children })));
FormLabel.displayName = 'FormLabel';
export const FormControl = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('flex flex-col', className), ...props, children: children })));
FormControl.displayName = 'FormControl';
export const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("p", { ref: ref, className: cn('text-sm text-red-600 mt-1', className), ...props, children: children })));
FormMessage.displayName = 'FormMessage';
export const FormDescription = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("p", { ref: ref, className: cn('text-sm text-gray-500 mt-1', className), ...props, children: children })));
FormDescription.displayName = 'FormDescription';
// Asignación de displayNames
[Form, FormItem, FormLabel, FormControl, FormMessage, FormDescription, FormField].forEach((component) => {
    if ('displayName' in component) {
        component.displayName = component.name;
    }
});
