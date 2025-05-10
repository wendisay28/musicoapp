import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileForm } from '@/features/shared/components/ProfileForm/ProfileForm';
import { AvatarSection } from '@/features/shared/components/ProfileForm/AvatarSection';
import { BasicInfoSection } from '@/features/shared/components/ProfileForm/BasicInfoSection';
import { SkillsSection } from '@/features/shared/components/ProfileForm/SkillsSection';
import { ArtistInfoSection } from '@/features/shared/components/ProfileForm/ArtistInfoSection';
import { profileFormSchema } from '@/features/shared/components/ProfileForm/schemas/profileFormSchema';
import { useToast } from '@/features/shared/hooks/use-toast';
const defaultValues: any = {
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
export default function ProfileEditView (props: any)) {
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    });
    const onSubmit = async (data) => {
        try {
            console.log('Formulario enviado con:', data);
            toast({
                title: "Perfil actualizado",
                description: "Los cambios se han guardado correctamente",
            });
            // Aquí puedes llamar a tu API de actualización de perfil
        }
        catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };
    const handleCategoryChange: React.FC = (category) => {
        form.setValue('category', category);
        form.setValue('subcategory', '');
    };
    return (_jsxs("div", { className: "max-w-4xl mx-auto space-y-8 px-4 py-10", children: [_jsx("h1", { className: "text-3xl font-bold text-center", children: "Editar perfil" }), _jsxs(ProfileForm, { form: form, onSubmit: onSubmit, isSubmitting: false, onCancel: () => toast({
                    title: "Cambios cancelados",
                    description: "Los cambios no se han guardado",
                }), children: [_jsx(AvatarSection, { control: form.control }), _jsx(BasicInfoSection, { control: form.control }), _jsx(SkillsSection, { control: form.control, onAddSkill: (skill) => {
                            const currentSkills = form.getValues('skills') || [];
                            form.setValue('skills', [...currentSkills, skill]);
                        }, onRemoveSkill: (skill) => {
                            const currentSkills = form.getValues('skills') || [];
                            form.setValue('skills', currentSkills.filter(s => s !== skill));
                        } }), _jsx(ArtistInfoSection, { control: form.control, onCategoryChange: handleCategoryChange })] })] }));
}
