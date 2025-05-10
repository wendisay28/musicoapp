import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFormContext } from 'react-hook-form';
import { Avatar, AvatarImage, AvatarFallback } from '@/features/ui/components/avatar';
import { Button } from '@/features/ui/components/button';
import { Image, Upload, Trash2 } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/features/ui/components/form';
import { useState, useRef } from 'react';
import { Progress } from '@/features/ui/components/progress';
/**
 * Sección mejorada para la imagen de perfil/avatar
 */
export function AvatarSection (props: any){ control, maxFileSize = 2, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] }) {
    const { watch, setValue } = useFormContext();
    const photoURL = watch('photoURL');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileChange = async (e) => {
        setError(null);
        const file = e.target.files?.[0];
        if (!file)
            return;
        // Validaciones
        if (!allowedTypes.includes(file.type)) {
            setError(`Formatos permitidos: ${allowedTypes.join(', ').replace('image/', '')}`);
            return;
        }
        if (file.size > maxFileSize * 1024 * 1024) {
            setError(`El tamaño máximo es ${maxFileSize}MB`);
            return;
        }
        setUploading(true);
        setProgress(0);
        try {
            // Simulación de progreso (reemplazar con tu API real)
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);
            const uploadedUrl = await uploadImage(file, (progress) => {
                setProgress(Math.round(progress * 100));
            });
            clearInterval(interval);
            setProgress(100);
            setValue('photoURL', uploadedUrl);
            // Resetear el input para permitir subir la misma imagen otra vez
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
        catch (err) {
            setError('Error al subir la imagen. Intenta de nuevo.');
        }
        finally {
            setTimeout(() => setProgress(0), 1000);
            setUploading(false);
        }
    };
    const handleRemoveImage: React.FC = () => {
        setValue('photoURL', '');
        setError(null);
    };
    // Función simulada de subida con progreso
    const uploadImage: React.FC = (file, onProgress) => {
        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 0.1;
                onProgress?.(progress);
                if (progress >= 1) {
                    clearInterval(interval);
                    resolve(URL.createObjectURL(file));
                }
            }, 100);
        });
    };
    return (_jsx(FormField, { control: control, name: "photoURL", render: () => (_jsxs(FormItem, { className: "flex flex-col items-center space-y-4", children: [_jsx(FormLabel, { className: "text-lg", children: "Foto de perfil" }), _jsxs("div", { className: "relative group", children: [_jsxs(Avatar, { className: "h-32 w-32 border-2 border-primary/50", children: [_jsx(AvatarImage, { src: photoURL, className: "object-cover" }), _jsx(AvatarFallback, { className: "bg-muted text-2xl font-medium", children: watch('displayName')?.slice(0, 2).toUpperCase() || 'US' })] }), _jsxs("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full transition-opacity space-x-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "text-white hover:text-white hover:bg-white/20", type: "button", onClick: () => fileInputRef.current?.click(), disabled: uploading, children: uploading ? (_jsx(Upload, { className: "h-5 w-5 animate-pulse" })) : (_jsx(Image, { className: "h-5 w-5" })) }), photoURL && (_jsx(Button, { variant: "ghost", size: "icon", className: "text-white hover:text-destructive hover:bg-white/20", type: "button", onClick: handleRemoveImage, disabled: uploading, children: _jsx(Trash2, { className: "h-5 w-5" }) }))] })] }), _jsx(FormControl, { children: _jsx("input", { ref: fileInputRef, id: "avatarUpload", type: "file", accept: allowedTypes.join(','), className: "hidden", onChange: handleFileChange, disabled: uploading }) }), uploading && (_jsxs("div", { className: "w-full max-w-xs space-y-2", children: [_jsx(Progress, { value: progress, className: "h-2" }), _jsxs("p", { className: "text-sm text-muted-foreground text-center", children: ["Subiendo... ", progress, "%"] })] })), error && (_jsx(FormMessage, { className: "text-destructive max-w-xs text-center", children: error })), _jsxs("p", { className: "text-sm text-muted-foreground text-center", children: ["Formatos: ", allowedTypes.join(', ').replace('image/', ''), " \u2022 M\u00E1x. ", maxFileSize, "MB"] })] })) }));
}
