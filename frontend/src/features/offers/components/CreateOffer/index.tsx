import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useOffers } from '../../hooks/useOffers';
import { toast } from 'react-hot-toast';
export const CreateOffer: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { createOffer } = useOffers();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
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
                category,
                location,
                status: 'PENDING'
            });
            toast.success('Oferta creada exitosamente');
            navigate('/offers');
        }
        catch (error) {
            toast.error('Error al crear la oferta');
        }
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto p-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Crear Nueva Oferta" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700", children: "T\u00EDtulo" }), _jsx("input", { type: "text", id: "title", value: title, onChange: (e) => setTitle(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700", children: "Descripci\u00F3n" }), _jsx("textarea", { id: "description", value: description, onChange: (e) => setDescription(e.target.value), rows: 4, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "price", className: "block text-sm font-medium text-gray-700", children: "Precio" }), _jsx("input", { type: "number", id: "price", value: price, onChange: (e) => setPrice(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700", children: "Categor\u00EDa" }), _jsx("input", { type: "text", id: "category", value: category, onChange: (e) => setCategory(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "location", className: "block text-sm font-medium text-gray-700", children: "Ubicaci\u00F3n" }), _jsx("input", { type: "text", id: "location", value: location, onChange: (e) => setLocation(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { type: "submit", className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600", children: "Crear Oferta" }) })] })] }));
};
