import { api } from '@/lib/api';

export interface UserSettings {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  language: string;
  theme: 'light' | 'dark' | 'system';
  timezone: string;
  currency: string;
  updatedAt: string;
}

export interface UpdateSettingsData {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  marketingEmails?: boolean;
  language?: string;
  theme?: UserSettings['theme'];
  timezone?: string;
  currency?: string;
}

export const getUserSettings = async (): Promise<UserSettings> => {
  const response = await api.get<UserSettings>('/settings');
  return response.data;
};

export const updateUserSettings = async (data: UpdateSettingsData): Promise<UserSettings> => {
  const response = await api.put<UserSettings>('/settings', data);
  return response.data;
};

export const resetUserSettings = async (): Promise<UserSettings> => {
  const response = await api.post<UserSettings>('/settings/reset');
  return response.data;
}; 