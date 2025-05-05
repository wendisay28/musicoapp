import { z } from 'zod';

/**
 * Rol de usuario en la plataforma
 */
export enum UserRole {
  ARTIST = 'artist',
  CLIENT = 'client',
  ADMIN = 'admin'
}

/**
 * Esquema de validación para redes sociales
 */
export const socialMediaSchema = z.object({
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional()
});

/**
 * Esquema de validación para datos de usuario
 */
export const userDataSchema = z.object({
  displayName: z.string().min(1, 'El nombre es requerido'),
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
  bio: z.string().optional(),
  role: z.nativeEnum(UserRole),
  location: z.string().optional(),
  skills: z.array(z.string()),
  photoURL: z.string().url().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  tags: z.array(z.string()),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  socialMedia: socialMediaSchema.optional()
});

/**
 * Tipo inferido del esquema de datos de usuario
 */
export type UserData = z.infer<typeof userDataSchema>;

/**
 * Propiedades para el componente de perfil de usuario
 */
export interface UserProfileProps {
  userData: UserData;
  onUpdate?: (updatedData: Partial<UserData>) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Propiedades para el formulario de perfil
 */
export interface ProfileFormProps {
  initialData?: Partial<UserData>;
  onSubmit: (data: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Retorno del hook useUserProfile
 */
export interface UseUserProfileReturn {
  userData: UserData | null;
  isLoading: boolean;
  error: Error | null;
  updateProfile: (data: Partial<UserData>) => Promise<void>;
  refreshProfile: () => Promise<void>;
} 