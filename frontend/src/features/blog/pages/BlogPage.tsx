import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { CreatePost } from '../components/CreatePost';
import { BlogPost } from '../components/BlogPost';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/api';
export function BlogPage (props: any)) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('all');
    const { data: posts, isLoading } = useQuery({
        queryKey: ['/api/posts', activeTab],
        queryFn: async () => {
            const response = await apiRequest({
                method: 'GET',
                url: `/api/posts?type=${activeTab}`
            });
            return response.json();
        }
    });
    const handleCreatePost = async (data) => {
        try {
            await apiRequest({
                method: 'POST',
                url: '/api/posts',
                data: {
                    ...data,
                    type: 'BLOG'
                }
            });
            toast({
                title: 'Post creado',
                description: 'Tu post ha sido publicado exitosamente'
            });
        }
        catch (error) {
            console.error('Error creating post:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo publicar el post'
            });
        }
    };
    const handleLike = async (postId) => {
        try {
            await apiRequest({
                method: 'POST',
                url: `/api/posts/${postId}/like`
            });
        }
        catch (error) {
            console.error('Error liking post:', error);
        }
    };
    const handleComment = async (postId, comment) => {
        try {
            await apiRequest({
                method: 'POST',
                url: `/api/posts/${postId}/comments`,
                data: { content: comment }
            });
        }
        catch (error) {
            console.error('Error commenting post:', error);
        }
    };
    const handleShare = async (postId) => {
        try {
            const post = posts?.find((p) => p.id === postId);
            if (post) {
                await navigator.share({
                    title: post.title,
                    text: post.content,
                    url: `${window.location.origin}/blog/${postId}`
                });
            }
        }
        catch (error) {
            console.error('Error sharing post:', error);
        }
    };
    const handleDelete = async (postId) => {
        try {
            await apiRequest({
                method: 'DELETE',
                url: `/api/posts/${postId}`
            });
            toast({
                title: 'Post eliminado',
                description: 'El post ha sido eliminado exitosamente'
            });
        }
        catch (error) {
            console.error('Error deleting post:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo eliminar el post'
            });
        }
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-6", children: [_jsxs("header", { className: "mb-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Blog" }), _jsx("p", { className: "text-muted-foreground", children: "Comparte tus experiencias y conecta con otros artistas" })] }), user && (_jsx(CreatePost, { onSubmit: handleCreatePost })), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "mb-6", children: [_jsx(TabsTrigger, { value: "all", children: "Todos" }), _jsx(TabsTrigger, { value: "following", children: "Siguiendo" }), _jsx(TabsTrigger, { value: "trending", children: "Tendencias" })] }), _jsx(TabsContent, { value: activeTab, children: isLoading ? (_jsx("div", { className: "space-y-4", children: Array.from({ length: 3 }).map((_, i) => (_jsx("div", { className: "h-48 w-full rounded-lg bg-muted animate-pulse" }, i))) })) : (_jsx("div", { className: "space-y-4", children: posts?.map((post) => (_jsx(BlogPost, { post: post, onLike: handleLike, onComment: handleComment, onShare: handleShare, onDelete: handleDelete, isOwnPost: post.author.id === user?.id }, post.id))) })) })] })] }));
}
