import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { profileFormSchema, ProfileFormValues } from '@/pages/ProfileArt/profile/components/ProfileForm/schemas/profileFormSchema';
import { useCallback } from 'react';
import { apiRequest } from '@/lib/queryClient';

interface UseProfileFormReturn {
  form: UseFormReturn<ProfileFormValues>;
  isSubmitting: boolean;
  isDirty: boolean;
  handleSubmit: UseFormReturn<ProfileFormValues>['handleSubmit'];
  submitForm: (data: ProfileFormValues) => Promise<void>;
  resetForm: () => void;
}

export function useProfileForm(userId: string): UseProfileFormReturn {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
    defaultValues: async () => {
      try {
        const response = await apiRequest('GET', `/api/users/${userId}/profile`);
        const data = await response.json();
        return profileFormSchema.parse(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudieron cargar los datos del perfil',
        });
        return profileFormSchema.parse({});
      }
    }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: ProfileFormValues) => {
      const response = await apiRequest(
        'PATCH',
        `/api/users/${userId}/profile`,
        {
          ...formData,
          username: formData.username.toLowerCase(),
        }
      );
      return profileFormSchema.parse(await response.json());
    },
    onSuccess: (data) => {
      form.reset(data);
      queryClient.invalidateQueries({ queryKey: ['user-profile', userId] });
      toast({
        title: 'Perfil actualizado',
        description: 'Cambios guardados correctamente',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Error al actualizar el perfil',
      });
    }
  });

  const submitForm = useCallback(
    async (data: ProfileFormValues) => {
      await mutateAsync(data);
    },
    [mutateAsync]
  );

  const resetForm = useCallback(() => {
    form.reset();
  }, [form]);

  return {
    form,
    isSubmitting: isPending,
    isDirty: form.formState.isDirty,
    handleSubmit: form.handleSubmit,
    submitForm,
    resetForm,
  };
}