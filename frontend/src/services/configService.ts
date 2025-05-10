import { apiClient } from '@/lib/api';

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  siteFavicon: string;
  siteTheme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  contactInfo: {
    email: string;
    phone?: string;
    address?: string;
  };
  features: {
    enableRegistration: boolean;
    enableSocialLogin: boolean;
    enableEmailVerification: boolean;
    enableTwoFactorAuth: boolean;
    enableFileUpload: boolean;
    maxFileSize: number;
    allowedFileTypes: string[];
  };
  limits: {
    maxPortfolioItems: number;
    maxImagesPerPortfolio: number;
    maxFileSize: number;
    maxMessageLength: number;
    maxCommentLength: number;
  };
}

export interface UpdateSiteConfigData {
  siteName?: string;
  siteDescription?: string;
  siteLogo?: string;
  siteFavicon?: string;
  siteTheme?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  features?: {
    enableRegistration?: boolean;
    enableSocialLogin?: boolean;
    enableEmailVerification?: boolean;
    enableTwoFactorAuth?: boolean;
    enableFileUpload?: boolean;
    maxFileSize?: number;
    allowedFileTypes?: string[];
  };
  limits?: {
    maxPortfolioItems?: number;
    maxImagesPerPortfolio?: number;
    maxFileSize?: number;
    maxMessageLength?: number;
    maxCommentLength?: number;
  };
}

export const getSiteConfig = async (): Promise<SiteConfig> => {
  const response = await apiClient.get<SiteConfig>('/config/site');
  return response.data;
};

export const updateSiteConfig = async (data: UpdateSiteConfigData): Promise<SiteConfig> => {
  const response = await apiClient.put<SiteConfig>('/config/site', data);
  return response.data;
};

export const getFeatureFlags = async (): Promise<{ [key: string]: boolean }> => {
  const response = await apiClient.get<{ [key: string]: boolean }>('/config/features');
  return response.data;
};

export const updateFeatureFlags = async (flags: { [key: string]: boolean }): Promise<{ [key: string]: boolean }> => {
  const response = await apiClient.put<{ [key: string]: boolean }>('/config/features', flags);
  return response.data;
};

export const getSystemLimits = async (): Promise<{ [key: string]: number }> => {
  const response = await apiClient.get<{ [key: string]: number }>('/config/limits');
  return response.data;
};

export const updateSystemLimits = async (limits: { [key: string]: number }): Promise<{ [key: string]: number }> => {
  const response = await apiClient.put<{ [key: string]: number }>('/config/limits', limits);
  return response.data;
}; 