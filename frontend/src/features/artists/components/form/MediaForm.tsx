import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFormContext } from 'react-hook-form';
import { Label } from '@/features/shared/components/ui/label';
import { Input } from '@/features/shared/components/ui/input';
export function MediaForm (props: any)) {
    const { register } = useFormContext();
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "images", children: "Im\u00E1genes de tu trabajo" }), _jsx(Input, { id: "images", type: "file", multiple: true, accept: "image/*", ...register('images') })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "videos", children: "Videos de tu trabajo" }), _jsx(Input, { id: "videos", type: "file", multiple: true, accept: "video/*", ...register('videos') })] })] }));
}
