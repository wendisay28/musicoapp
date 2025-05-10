import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { createOffer } from '../services/offerService';
import { toast } from 'react-hot-toast';
export const CreateOffer: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user)
            return;
        try {
            await createOffer({
                title,
                description,
                price: Number(price),
                artistId: user.id,
            });
            toast.success('Oferta creada exitosamente');
            navigate('/offers');
        }
        catch (error) {
            toast.error('Error al crear la oferta');
        }
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Crear Nueva Oferta" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700", children: "T\u00EDtulo" }), _jsx("input", { type: "text", id: "title", value: title, onChange: (e) => setTitle(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700", children: "Descripci\u00F3n" }), _jsx("textarea", { id: "description", value: description, onChange: (e) => setDescription(e.target.value), rows: 4, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "price", className: "block text-sm font-medium text-gray-700", children: "Precio" }), _jsx("input", { type: "number", id: "price", value: price, onChange: (e) => setPrice(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500", required: true })] }), _jsx("button", { type: "submit", className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Crear Oferta" })] })] }));
};
