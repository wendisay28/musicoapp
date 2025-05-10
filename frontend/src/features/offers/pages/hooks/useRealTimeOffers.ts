import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { RequestOffer } from '@/features/shared/types/real-time-offers';

export const useServiceRequests = (userId?: string) => {
  return useQuery<RequestOffer[]>({
    queryKey: ['service-requests', userId],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/service-requests');
      return (await response.json()) || [];
    },
    enabled: !!userId,
  });
};

export const useCreateRequest = () => {
  return useMutation({
    mutationFn: async (data: Omit<RequestOffer, 'id' | 'createdAt' | 'responses'>) => {
      const response = await apiRequest('POST', '/api/service-requests', data);
      return response.json();
    }
  });
};

export const useRespondToRequest = () => {
  return useMutation({
    mutationFn: async ({
      requestId,
      responseId,
      status,
    }: {
      requestId: number;
      responseId: number;
      status: 'accepted' | 'rejected';
    }) => {
      const response = await apiRequest(
        'PATCH', 
        `/api/service-requests/${requestId}/responses/${responseId}`, 
        { status }
      );
      return response.json();
    }
  });
};