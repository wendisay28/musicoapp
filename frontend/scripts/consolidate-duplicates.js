import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

// Archivos a crear/actualizar
const filesToUpdate = [
  {
    path: 'features/shared/hooks/useErrorHandler.ts',
    content: `import { useCallback } from 'react';
import { toast } from '@/features/ui/components/use-toast';
import { AppError } from '@/lib/error-handler';

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  logToSentry?: boolean;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    showToast = true,
    logToConsole = true,
    logToSentry = true
  } = options;

  const handleError = useCallback((error: unknown, context?: string) => {
    const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error inesperado';
    const errorTitle = error instanceof AppError ? error.code : 'Error';
    
    if (showToast) {
      toast({
        variant: 'destructive',
        title: errorTitle,
        description: errorMessage,
      });
    }

    if (logToConsole) {
      console.error(\`\${context ? \`[\${context}] \` : ''}\${errorMessage}\`, error);
    }

    if (logToSentry && error instanceof Error) {
      Sentry.captureException(error, {
        extra: { context }
      });
    }

    return error;
  }, [showToast, logToConsole, logToSentry]);

  return { handleError };
};`
  },
  {
    path: 'features/shared/hooks/useAuth.ts',
    content: `import { useState, useCallback } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signOut
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/features/ui/components/use-toast';
import { useErrorHandler } from './useErrorHandler';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';

interface AuthCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends AuthCredentials {
  username: string;
  displayName: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { handleError } = useErrorHandler();

  const createUserInDatabase = async (userCredential: UserCredential, username: string, displayName: string) => {
    try {
      await apiRequest("POST", "/api/users", {
        firebaseUid: userCredential.user.uid,
        email: userCredential.user.email,
        username,
        displayName,
        photoURL: userCredential.user.photoURL || "",
        role: "user"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    } catch (error) {
      handleError(error, 'createUserInDatabase');
      throw error;
    }
  };

  const signIn = async ({ email, password }: AuthCredentials) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Inicio de sesión exitoso",
        description: \`Bienvenido, \${userCredential.user.displayName || userCredential.user.email}\`,
      });
      return userCredential.user;
    } catch (error) {
      handleError(error, 'signIn');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async ({ email, password, username, displayName }: SignUpCredentials) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      await createUserInDatabase(userCredential, username, displayName);
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
      });
      return userCredential.user;
    } catch (error) {
      handleError(error, 'signUp');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error) {
      handleError(error, 'logout');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    signIn,
    signUp,
    logout
  };
};`
  },
  {
    path: 'features/shared/hooks/useLoadingState.ts',
    content: `import { useState, useCallback } from 'react';

export const useLoadingState = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const withLoading = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      return await promise;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    withLoading
  };
};`
  }
];

// Función para actualizar archivos
function updateFiles() {
  filesToUpdate.forEach(({ path: filePath, content }) => {
    const fullPath = path.join(srcPath, filePath);
    const dirPath = path.dirname(fullPath);
    
    // Asegurar que el directorio existe
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`Archivo actualizado: ${filePath}`);
  });
}

// Función para actualizar importaciones
function updateImports() {
  const filesToCheck = [
    'features/auth/components/LoginForm.tsx',
    'features/auth/components/RegisterForm.tsx',
    'features/artist/pages/profile/components/ProfileForm/ProfileForm.tsx',
    'features/events/components/EventForm.tsx',
    'features/search/components/SearchFilters.tsx',
    'features/artist/components/ArtistCard.tsx',
    'features/events/components/EventCard.tsx',
    'features/offers/components/OfferCard.tsx'
  ];

  filesToCheck.forEach(file => {
    const filePath = path.join(srcPath, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Actualizar importaciones de hooks
    content = content.replace(
      /from ['"]@\/hooks\/use(ErrorHandler|Auth|LoadingState)['"]/g,
      'from \'@/features/shared/hooks/use$1\''
    );

    // Actualizar importaciones de tipos
    content = content.replace(
      /from ['"]@\/types\/(.*?)['"]/g,
      'from \'@/features/shared/types/common\''
    );

    // Actualizar importaciones de componentes base
    content = content.replace(
      /from ['"]@\/components\/(.*?)['"]/g,
      'from \'@/features/shared/components/$1\''
    );

    fs.writeFileSync(filePath, content);
    console.log(`Importaciones actualizadas en: ${file}`);
  });
}

// Ejecutar consolidación
console.log('Iniciando consolidación...');
updateFiles();
updateImports();
console.log('Consolidación completada!'); 