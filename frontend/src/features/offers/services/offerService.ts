import axios from 'axios';
import { api } from './api';
const API_URL: any = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
/**
 * Obtiene una oferta por su ID
 */
export const getOffer: any = async (id) => {
    const response: any = await axios.get(`${API_URL}/offers/${id}`);
    return response.data;
};
/**
 * Obtiene una lista paginada de ofertas
 */
export const getOffers: any = async () => {
    const response: any = await axios.get(`${API_URL}/offers`);
    return response.data;
};
/**
 * Crea una nueva oferta
 */
export const createOffer: any = async (data) => {
    const response: any = await axios.post(`${API_URL}/offers`, data);
    return response.data;
};
/**
 * Actualiza una oferta existente
 */
export const updateOffer: any = async (id, data) => {
    const response: any = await axios.put(`${API_URL}/offers/${id}`, data);
    return response.data;
};
/**
 * Elimina una oferta
 */
export const deleteOffer: any = async (id) => {
    await axios.delete(`${API_URL}/offers/${id}`);
};
/**
 * Envía una contraoferta
 */
export const sendCounterOffer: any = async (id, data) => {
    try {
        const response: any = await api.post(`/offers/${id}/counter`, data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al enviar la contraoferta');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al enviar la contraoferta: ${error.message}`);
        }
        throw new Error('Error al enviar la contraoferta');
    }
};
/**
 * Obtiene las ofertas de un usuario
 */
export const getUserOffers: any = async (userId) => {
    const response: any = await axios.get(`${API_URL}/users/${userId}/offers`);
    return response.data;
};
export const createCounterOffer: any = async (data) => {
    const response: any = await axios.post(`${API_URL}/offers/${data.offerId}/counter`, data);
    return response.data;
};
