import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
export function CreatePost (props: any){ onSubmit, className }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim())
            return;
        setIsSubmitting(true);
        try {
            await onSubmit({
                title: title.trim(),
                content: content.trim(),
                imageUrl
            });
            setTitle('');
            setContent('');
            setImageUrl(undefined);
        }
        catch (error) {
            console.error('Error creating post:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        // Aquí se implementaría la subida de la imagen a un servicio de almacenamiento
        // Por ahora solo simulamos una URL
        setImageUrl(URL.createObjectURL(file));
    };
    return (_jsx(Card, { className: cn("mb-6", className), children: _jsx(CardContent, { className: "pt-6", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(Input, { placeholder: "T\u00EDtulo del post", value: title, onChange: (e) => setTitle(e.target.value), className: "text-lg font-semibold" }), _jsx(Textarea, { placeholder: "\u00BFQu\u00E9 quieres compartir?", value: content, onChange: (e) => setContent(e.target.value), className: "min-h-[100px] resize-none" }), imageUrl && (_jsxs("div", { className: "relative", children: [_jsx("img", { src: imageUrl, alt: "Preview", className: "w-full rounded-lg object-cover max-h-[300px]" }), _jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "absolute top-2 right-2", onClick: () => setImageUrl(undefined), children: _jsx(X, { className: "h-4 w-4" }) })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("input", { type: "file", id: "image-upload", className: "hidden", accept: "image/*", onChange: handleImageUpload }), _jsx("label", { htmlFor: "image-upload", children: _jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: "flex items-center space-x-2", children: [_jsx(ImagePlus, { className: "h-4 w-4" }), _jsx("span", { children: "Agregar imagen" })] }) })] }), _jsx(Button, { type: "submit", disabled: !title.trim() || !content.trim() || isSubmitting, children: isSubmitting ? 'Publicando...' : 'Publicar' })] })] }) }) }));
}
