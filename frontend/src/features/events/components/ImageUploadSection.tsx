import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '@/features/ui/components/button';
import { Label } from '@/features/ui/components/label';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
export function ImageUploadSection (props: any){ onImageChange, className }) {
    const [preview, setPreview] = React.useState(null);
    const handleFileChange: React.FC = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsx(Label, { children: "Imagen del Evento" }), _jsxs("div", { className: "flex items-center gap-4", children: [preview && (_jsx("img", { src: preview, alt: "Preview", className: "w-32 h-32 object-cover rounded-lg" })), _jsxs("div", { className: "flex-1", children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "hidden", id: "image-upload" }), _jsx(Label, { htmlFor: "image-upload", children: _jsxs(Button, { type: "button", variant: "outline", className: "w-full", children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Subir Imagen"] }) })] })] })] }));
}
