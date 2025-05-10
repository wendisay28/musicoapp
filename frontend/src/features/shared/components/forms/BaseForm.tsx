import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/features/shared/components/ui/button';
import { cn } from '@/lib/utils';
export function BaseForm (props: any){ schema, onSubmit, defaultValues, children, className, submitLabel = 'Submit', isLoading = false, }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });
    return (_jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: cn('space-y-4', className), children: [children, _jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? 'Loading...' : submitLabel })] }));
}
