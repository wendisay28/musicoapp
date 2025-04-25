import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ProfileForm } from '../components/ProfileForm/ProfileForm';
import { useProfileForm } from '../hooks/useProfileForm';

interface ProfileEditViewProps {
  userId: string;
  initialData: any;
  onCancel: () => void;
  onSuccess: () => void;
}

/**
 * Vista para editar el perfil del usuario
 */
export function ProfileEditView({ 
  userId,
  initialData,
  onCancel,
  onSuccess
}: ProfileEditViewProps) {
  const { form, isSubmitting, submitForm } = useProfileForm(userId);

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = async (data: any) => {
    try {
      await submitForm(data);
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editar Perfil</h2>
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Cancelar
        </Button>
      </div>

      <ProfileForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
      />
    </div>
  );
}
