import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  profileFormSchema,
  ProfileFormValues
} from './schemas/profileFormSchema';

interface ProfileFormProps {
  initialData?: Partial<ProfileFormValues>;
  onSubmit: (data: ProfileFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
  form?: UseFormReturn<ProfileFormValues>; // Opcional: permite recibir un form externo
}

export function ProfileForm({
  initialData = {},
  onSubmit,
  isSubmitting = false,
  onCancel,
  children,
  form: externalForm,
}: ProfileFormProps) {
  const internalForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: '',
      username: '',
      bio: '',
      role: '',
      location: '',
      skills: [],
      photoURL: '',
      category: '',
      subcategory: '',
      tags: [],
      ...initialData,
    },
    mode: 'onBlur',
  });

  const form = externalForm ?? internalForm;

  const handleSubmit = async (data: ProfileFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid gap-6">
          {children}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar cambios'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
