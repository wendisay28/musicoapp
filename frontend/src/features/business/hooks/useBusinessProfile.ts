import { useState, useEffect } from 'react';

interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  // Add more fields as needed
}

export function useBusinessProfile(businessId?: string) {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!businessId) {
        setIsLoading(false);
        return;
      }

      try {
        // Simulate API call
        const mockProfile: BusinessProfile = {
          id: businessId,
          name: 'Mi Negocio',
          description: 'Descripción del negocio'
        };
        setProfile(mockProfile);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error loading profile'));
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [businessId]);

  return { profile, isLoading, error };
} 