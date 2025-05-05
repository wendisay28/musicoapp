import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileForm } from '../components/ProfileForm/ProfileForm';
import { AvatarSection } from '../components/ProfileForm/AvatarSection';
import { BasicInfoSection } from '../components/ProfileForm/BasicInfoSection';
import { SkillsSection } from '../components/ProfileForm/SkillsSection';
import { ArtistInfoSection } from '../components/ProfileForm/ArtistInfoSection';
import { profileFormSchema } from '../components/ProfileForm/schemas/profileFormSchema';
import { ProfileFormValues } from '../components/ProfileForm/schemas/profileFormSchema';
import { useToast } from '@/hooks/use-toast';


const defaultValues: ProfileFormValues = {
  displayName: '',
  username: '',
  photoURL: '',
  skills: [],
  tags: [],
  bio: '',
  role: '',
  location: '',
  category: '',
  subcategory: '',
};

export default function ProfileEditView() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      console.log('Formulario enviado con:', data);
      toast({
        title: "Perfil actualizado",
        description: "Los cambios se han guardado correctamente",
      });
      // Aquí puedes llamar a tu API de actualización de perfil
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleCategoryChange = (category: string) => {
    form.setValue('category', category);
    form.setValue('subcategory', '');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 py-10">
      <h1 className="text-3xl font-bold text-center">Editar perfil</h1>

      <ProfileForm form={form} onSubmit={onSubmit} isSubmitting={false} onCancel={() => toast({
        title: "Cambios cancelados",
        description: "Los cambios no se han guardado",
      })}>
        <AvatarSection control={form.control} />
        <BasicInfoSection control={form.control} />
        <SkillsSection 
          control={form.control}
          onAddSkill={(skill) => {
            const currentSkills = form.getValues('skills') || [];
            form.setValue('skills', [...currentSkills, skill]);
          }}
          onRemoveSkill={(skill) => {
            const currentSkills = form.getValues('skills') || [];
            form.setValue('skills', currentSkills.filter(s => s !== skill));
          }}
        />
        <ArtistInfoSection
          control={form.control}
          onCategoryChange={handleCategoryChange}
        />
      </ProfileForm>
    </div>
  );
}
