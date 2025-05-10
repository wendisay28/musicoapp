import { apiRequest } from '@/lib/api';
export async function getRecommendedContent(type, userPreferences, config) {
    const response: any = await apiRequest({
        method: 'POST',
        url: '/api/recommendations',
        data: {
            type,
            userPreferences,
            config
        }
    });
    return response.data;
}
export async function getFeaturedContent(type) {
    const response: any = await apiRequest({
        method: 'GET',
        url: `/api/featured-content/${type}`
    });
    return response.data;
}
export async function updateUserPreferences(preferences) {
    const response: any = await apiRequest({
        method: 'PATCH',
        url: '/api/user/preferences',
        data: preferences
    });
    return response.data;
}
export async function trackUserInteraction(contentId, type) {
    const response: any = await apiRequest({
        method: 'POST',
        url: '/api/user/interactions',
        data: {
            contentId,
            type
        }
    });
    return response.data;
}
