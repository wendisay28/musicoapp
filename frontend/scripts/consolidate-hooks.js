import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

// Crear directorio shared/hooks si no existe
const sharedHooksPath = path.join(srcPath, 'features/shared/hooks');
if (!fs.existsSync(sharedHooksPath)) {
  fs.mkdirSync(sharedHooksPath, { recursive: true });
}

// Hooks a consolidar
const hooks = {
  'useErrorHandler.ts': `import { useCallback } from 'react';
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
      console.error(context ? \`[\${context}] \${errorMessage}\` : errorMessage, error);
    }

    if (logToSentry && error instanceof Error) {
      Sentry.captureException(error, {
        extra: { context }
      });
    }

    return error;
  }, [showToast, logToConsole, logToSentry]);

  return { handleError };
};`,

  'useLoadingState.ts': `import { useState, useCallback } from 'react';

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
};

// Crear los hooks
Object.entries(hooks).forEach(([filename, content]) => {
  const filePath = path.join(sharedHooksPath, filename);
  fs.writeFileSync(filePath, content);
  console.log(`Hook creado: ${filename}`);
});

// Archivos a actualizar
const filesToUpdate = [
  'features/auth/components/LoginForm.tsx',
  'features/auth/components/RegisterForm.tsx',
  'features/artist/pages/profile/components/ProfileForm/ProfileForm.tsx',
  'features/events/components/EventForm.tsx'
];

// Actualizar importaciones
filesToUpdate.forEach(file => {
  const filePath = path.join(srcPath, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Archivo no encontrado: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Actualizar importaciones
  content = content.replace(
    /from ['"]@\/hooks\/use(ErrorHandler|LoadingState)['"]/g,
    'from \'@/features/shared/hooks/use$1\''
  );

  fs.writeFileSync(filePath, content);
  console.log(`Importaciones actualizadas en: ${file}`);
});

console.log('Consolidación de hooks completada!'); 