import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@/features/shared/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/features/shared/components/ui/card';
export function ProfileSkeleton (props: any)) {
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Skeleton, { className: "h-8 w-48" }), _jsx(Skeleton, { className: "h-9 w-32" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(Skeleton, { className: "h-6 w-32" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-24 w-full" }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Skeleton, { className: "h-10 w-24" }), _jsx(Skeleton, { className: "h-10 w-24" })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(Skeleton, { className: "h-6 w-32" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Skeleton, { className: "h-32 w-full" }), _jsx(Skeleton, { className: "h-32 w-full" })] }) })] })] }));
}
