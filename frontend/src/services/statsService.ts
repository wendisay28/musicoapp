import { apiClient } from '@/lib/api';

export interface ArtistStats {
  totalOrders: number;
  completedOrders: number;
  totalEarnings: number;
  averageRating: number;
  portfolioViews: number;
  profileViews: number;
  reviews: {
    total: number;
    average: number;
    distribution: {
      [key: number]: number;
    };
  };
}

export interface ClientStats {
  totalOrders: number;
  completedOrders: number;
  totalSpent: number;
  reviewsGiven: number;
  favoriteArtists: number;
}

export interface AdminStats {
  totalUsers: number;
  totalArtists: number;
  totalClients: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
  newUsers: {
    total: number;
    byRole: {
      artist: number;
      client: number;
    };
  };
  orders: {
    total: number;
    byStatus: {
      pending: number;
      in_progress: number;
      completed: number;
      cancelled: number;
    };
  };
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  usersByRole: {
    user: number;
    artist: number;
    admin: number;
  };
}

export interface PortfolioStats {
  totalItems: number;
  publishedItems: number;
  draftItems: number;
  itemsByCategory: {
    [category: string]: number;
  };
  itemsByTag: {
    [tag: string]: number;
  };
}

export interface EngagementStats {
  totalLikes: number;
  totalComments: number;
  totalFollowers: number;
  totalMessages: number;
  likesByDay: {
    [date: string]: number;
  };
  commentsByDay: {
    [date: string]: number;
  };
}

export interface SystemStats {
  totalStorage: number;
  usedStorage: number;
  totalFiles: number;
  filesByType: {
    image: number;
    document: number;
  };
  averageResponseTime: number;
  errorRate: number;
}

export interface TimeRange {
  startDate: string;
  endDate: string;
}

export const getArtistStats = async (): Promise<ArtistStats> => {
  const response = await apiClient.get<ArtistStats>('/stats/artist');
  return response.data;
};

export const getClientStats = async (): Promise<ClientStats> => {
  const response = await apiClient.get<ClientStats>('/stats/client');
  return response.data;
};

export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await apiClient.get<AdminStats>('/stats/admin');
  return response.data;
};

export const getUserStats = async (timeRange?: TimeRange): Promise<UserStats> => {
  const response = await apiClient.get<UserStats>('/stats/users', {
    params: timeRange
  });
  return response.data;
};

export const getPortfolioStats = async (timeRange?: TimeRange): Promise<PortfolioStats> => {
  const response = await apiClient.get<PortfolioStats>('/stats/portfolio', {
    params: timeRange
  });
  return response.data;
};

export const getEngagementStats = async (timeRange?: TimeRange): Promise<EngagementStats> => {
  const response = await apiClient.get<EngagementStats>('/stats/engagement', {
    params: timeRange
  });
  return response.data;
};

export const getSystemStats = async (): Promise<SystemStats> => {
  const response = await apiClient.get<SystemStats>('/stats/system');
  return response.data;
};

export const getStatsSummary = async (timeRange?: TimeRange): Promise<{
  users: UserStats;
  portfolio: PortfolioStats;
  engagement: EngagementStats;
  system: SystemStats;
}> => {
  const response = await apiClient.get<{
    users: UserStats;
    portfolio: PortfolioStats;
    engagement: EngagementStats;
    system: SystemStats;
  }>('/stats/summary', {
    params: timeRange
  });
  return response.data;
}; 