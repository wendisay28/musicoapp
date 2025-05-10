import { api } from './api';
/**
 * Obtiene las redes sociales de un usuario
 * @param userId ID del usuario
 * @returns Objeto de redes sociales
 */
export const getSocialMedia: any = async (userId) => {
    try {
        const response: any = await api.get(`/social-media/${userId}`);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al obtener las redes sociales');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener las redes sociales: ${error.message}`);
        }
        throw new Error('Error al obtener las redes sociales');
    }
};
/**
 * Actualiza las redes sociales de un usuario
 * @param userId ID del usuario
 * @param data Datos de redes sociales a actualizar
 * @returns Objeto de redes sociales actualizado
 */
export const updateSocialMedia: any = async (userId, data) => {
    try {
        const response: any = await api.patch(`/social-media/${userId}`, data);
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al actualizar las redes sociales');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al actualizar las redes sociales: ${error.message}`);
        }
        throw new Error('Error al actualizar las redes sociales');
    }
};
/**
 * Agrega una cuenta de red social
 * @param userId ID del usuario
 * @param platform Plataforma de red social
 * @param username Nombre de usuario
 * @returns Objeto de redes sociales actualizado
 */
export const addSocialMediaAccount: any = async (userId, platform, username) => {
    try {
        const response: any = await api.post(`/social-media/${userId}/accounts`, {
            platform,
            username
        });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al agregar la cuenta de red social');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al agregar la cuenta de red social: ${error.message}`);
        }
        throw new Error('Error al agregar la cuenta de red social');
    }
};
/**
 * Elimina una cuenta de red social
 * @param userId ID del usuario
 * @param platform Plataforma de red social
 * @returns Objeto de redes sociales actualizado
 */
export const removeSocialMediaAccount: any = async (userId, platform) => {
    try {
        const response: any = await api.delete(`/social-media/${userId}/accounts`, {
            params: { platform }
        });
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al eliminar la cuenta de red social');
        }
        return response.data.data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al eliminar la cuenta de red social: ${error.message}`);
        }
        throw new Error('Error al eliminar la cuenta de red social');
    }
};
