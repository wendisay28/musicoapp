import { useState, useCallback } from 'react';
import { SocialMedia } from '../types/socialMedia';
import * as socialMediaService from '../services/socialMediaService';

interface UseSocialMediaReturn {
  socialMedia: SocialMedia | null;
  loading: boolean;
  error: string | null;
  fetchSocialMedia: (userId: string) => Promise<void>;
  updateSocialMedia: (userId: string, data: Partial<SocialMedia>) => Promise<void>;
  addSocialMediaAccount: (userId: string, platform: string, username: string) => Promise<void>;
  removeSocialMediaAccount: (userId: string, platform: string) => Promise<void>;
}

export const useSocialMedia = (): UseSocialMediaReturn => {
  const [socialMedia, setSocialMedia] = useState<SocialMedia | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSocialMedia = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await socialMediaService.getSocialMedia(userId);
      setSocialMedia(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener las redes sociales');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSocialMedia = useCallback(async (userId: string, data: Partial<SocialMedia>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSocialMedia = await socialMediaService.updateSocialMedia(userId, data);
      setSocialMedia(updatedSocialMedia);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar las redes sociales');
    } finally {
      setLoading(false);
    }
  }, []);

  const addSocialMediaAccount = useCallback(async (userId: string, platform: string, username: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSocialMedia = await socialMediaService.addSocialMediaAccount(userId, platform, username);
      setSocialMedia(updatedSocialMedia);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar la cuenta de red social');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeSocialMediaAccount = useCallback(async (userId: string, platform: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedSocialMedia = await socialMediaService.removeSocialMediaAccount(userId, platform);
      setSocialMedia(updatedSocialMedia);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la cuenta de red social');
    } finally {
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