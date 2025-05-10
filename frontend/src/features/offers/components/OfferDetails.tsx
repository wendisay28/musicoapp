import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useOffers } from '../hooks/useOffers';
import { useQuery } from '@tanstack/react-query';
import { getOffer } from '@/services/offerService';
import { Offer } from '@/types/offer';

export const OfferDetails: React.FC = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { fetchOffer, updateOffer, deleteOffer } = useOffers();
    const { data: offer, error } = useQuery<Offer>({
        queryKey: ['offer', id],
        queryFn: () => getOffer(id!),
    });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo cargar la oferta",
            });
            navigate('/offers');
        }
        setLoading(false);
    }, [error, navigate]);

    const handleAccept = async () => {
        if (!id)
            return;
        try {
            await updateOffer(id, { status: 'ACCEPTED' });
            toast.success('Oferta aceptada');
            navigate('/offers');
        }
        catch (error) {
            toast.error('Error al aceptar la oferta');
        }
    };
    const handleReject = async () => {
        if (!id)
            return;
        try {
            await updateOffer(id, { status: 'REJECTED' });
            toast.success('Oferta rechazada');
            navigate('/offers');
        }
        catch (error) {
            toast.error('Error al rechazar la oferta');
        }
    };
    const handleDelete = async () => {
        if (!id)
            return;
        try {
            await deleteOffer(id);
            toast.success('Oferta eliminada');
            navigate('/offers');
        }
        catch (error) {
            toast.error('Error al eliminar la oferta');
        }
    };

    if (loading) {
        return _jsx("div", { className: "flex justify-center items-center h-64", children: "Cargando..." });
    }
    if (!offer) {
        return _jsx("div", { children: "Oferta no encontrada" });
    }
    return (_jsx("div", { className: "max-w-4xl mx-auto p-6", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: offer.title }), _jsx("p", { className: "text-gray-600 mb-6", children: offer.description }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-700", children: "Precio" }), _jsxs("p", { className: "text-2xl text-blue-600", children: ["$", offer.price.toLocaleString()] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-700", children: "Estado" }), _jsx("p", { className: "text-lg", children: offer.status })] })] }), user && user.id === offer.artistId && (_jsxs("div", { className: "flex gap-4", children: [_jsx("button", { onClick: handleAccept, className: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600", disabled: offer.status !== 'PENDING', children: "Aceptar" }), _jsx("button", { onClick: handleReject, className: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600", disabled: offer.status !== 'PENDING', children: "Rechazar" }), _jsx("button", { onClick: handleDelete, className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600", children: "Eliminar" })] }))] }) }));
};
