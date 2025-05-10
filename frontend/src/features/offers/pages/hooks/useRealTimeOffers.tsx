import React from 'react';
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
export const useServiceRequests: React.FC = (userId) => {
    return useQuery({
        queryKey: ['service-requests', userId],
        queryFn: async () => {
            const response = await apiRequest('GET', '/api/service-requests');
            return (await response.json()) || [];
        },
        enabled: !!userId,
    });
};
export const useCreateRequest: React.FC = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await apiRequest('POST', '/api/service-requests', data);
            return response.json();
        }
    });
};
export const useRespondToRequest: React.FC = () => {
    return useMutation({
        mutationFn: async ({ requestId, responseId, status, }) => {
            const response = await apiRequest('PATCH', `/api/service-requests/${requestId}/responses/${responseId}`, { status });
            return response.json();
        }
    });
};
