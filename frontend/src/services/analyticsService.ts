import { apiClient } from '@/lib/api';

export interface PageView {
  id: string;
  path: string;
  userId?: string;
  sessionId: string;
  userAgent: string;
  referrer?: string;
  timestamp: string;
}

export interface Event {
  id: string;
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  userId?: string;
  sessionId: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: {
    path: string;
    views: number;
  }[];
  topEvents: {
    name: string;
    count: number;
  }[];
}

export interface TimeRange {
  start: string;
  end: string;
}

export const trackPageView = async (data: Omit<PageView, 'id' | 'timestamp'>): Promise<PageView> => {
  const response = await apiClient.post<PageView>('/analytics/pageview', data);
  return response.data;
};

export const trackEvent = async (data: Omit<Event, 'id' | 'timestamp'>): Promise<Event> => {
  const response = await apiClient.post<Event>('/analytics/event', data);
  return response.data;
};

export const getAnalyticsSummary = async (timeRange: TimeRange): Promise<AnalyticsSummary> => {
  const response = await apiClient.get<AnalyticsSummary>('/analytics/summary', {
    params: timeRange
  });
  return response.data;
};

export const getPageViews = async (timeRange: TimeRange, page = 1, limit = 50): Promise<{ views: PageView[]; total: number }> => {
  const response = await apiClient.get<{ views: PageView[]; total: number }>('/analytics/pageviews', {
    params: { ...timeRange, page, limit }
  });
  return response.data;
};

export const getEvents = async (timeRange: TimeRange, page = 1, limit = 50): Promise<{ events: Event[]; total: number }> => {
  const response = await apiClient.get<{ events: Event[]; total: number }>('/analytics/events', {
    params: { ...timeRange, page, limit }
  });
  return response.data;
}; 