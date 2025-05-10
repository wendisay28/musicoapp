import React from 'react';
import { useState, useCallback } from 'react';
import * as socialMediaService from '../services/socialMediaService';
export const useSocialMedia: React.FC = () => {
    const [socialMedia, setSocialMedia] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchSocialMedia = useCallback(async (userId) => {
        try {
            setLoading(true);
            setError(null);
            const data = await socialMediaService.getSocialMedia(userId);
            setSocialMedia(data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener las redes sociales');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const updateSocialMedia = useCallback(async (userId, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedSocialMedia = await socialMediaService.updateSocialMedia(userId, data);
            setSocialMedia(updatedSocialMedia);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar las redes sociales');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const addSocialMediaAccount = useCallback(async (userId, platform, username) => {
        try {
            setLoading(true);
            setError(null);
            const updatedSocialMedia = await socialMediaService.addSocialMediaAccount(userId, platform, username);
            setSocialMedia(updatedSocialMedia);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al agregar la cuenta de red social');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const removeSocialMediaAccount = useCallback(async (userId, platform) => {
        try {
            setLoading(true);
            setError(null);
            const updatedSocialMedia = await socialMediaService.removeSocialMediaAccount(userId, platform);
            setSocialMedia(updatedSocialMedia);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar la cuenta de red social');
        }
        finally {
            setLoading(false);
        }
    }, []);
    return {
        socialMedia,
        loading,
        error,
        fetchSocialMedia,
        updateSocialMedia,
        addSocialMediaAccount,
        removeSocialMediaAccount,
    };
};
