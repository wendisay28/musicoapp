import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
export function BlogPost (props: any){ post, onLike, onComment, onShare, onDelete, isOwnPost = false }) {
    const [isCommenting, setIsCommenting] = useState(false);
    const [comment, setComment] = useState('');
    const handleComment: React.FC = () => {
        if (comment.trim() && onComment) {
            onComment(post.id, comment);
            setComment('');
            setIsCommenting(false);
        }
    };
    return (_jsxs(Card, { className: "mb-4", children: [_jsxs(CardHeader, { className: "flex flex-row items-center space-x-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: post.author.avatar }), _jsx(AvatarFallback, { children: post.author.name.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold", children: post.author.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: post.author.role })] }), _jsx("div", { className: "text-sm text-muted-foreground", children: formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: es }) })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("h2", { className: "text-xl font-bold", children: post.title }), _jsx("p", { className: "text-muted-foreground whitespace-pre-wrap", children: post.content }), post.imageUrl && (_jsx("img", { src: post.imageUrl, alt: post.title, className: "w-full rounded-lg object-cover max-h-[400px]" }))] }), _jsxs(CardFooter, { className: "flex flex-col space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => onLike?.(post.id), className: cn("flex items-center space-x-2", post.isLiked && "text-red-500"), children: [_jsx(Heart, { className: cn("h-4 w-4", post.isLiked && "fill-current") }), _jsx("span", { children: post.likes })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setIsCommenting(!isCommenting), className: "flex items-center space-x-2", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx("span", { children: post.comments })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => onShare?.(post.id), className: "flex items-center space-x-2", children: [_jsx(Share2, { className: "h-4 w-4" }), _jsx("span", { children: post.shares })] })] }), isOwnPost && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => onDelete?.(post.id), className: "text-red-500", children: "Eliminar" }))] }), isCommenting && (_jsxs("div", { className: "w-full space-y-2", children: [_jsx(Textarea, { placeholder: "Escribe un comentario...", value: comment, onChange: (e) => setComment(e.target.value), className: "min-h-[80px]" }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setIsCommenting(false), children: "Cancelar" }), _jsx(Button, { size: "sm", onClick: handleComment, disabled: !comment.trim(), children: "Comentar" })] })] }))] })] }));
}
