import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

// Estructura estándar para cada feature
const standardFeatureStructure = {
  'ui': {
    components: ['forms', 'layout', 'feedback', 'navigation'],
    hooks: ['use-form', 'use-modal', 'use-toast'],
    utils: ['validation', 'formatting']
  },
  'shared': {
    components: ['artist', 'forms', 'layout', 'feedback'],
    hooks: ['use-query', 'use-mutation', 'use-auth'],
    utils: ['api', 'storage', 'validation']
  },
  'favorites': {
    components: ['tabs'],
    hooks: ['use-favorites'],
    utils: ['storage']
  }
};

// Componentes a consolidar
const componentsToConsolidate = [
  {
    from: [
      'features/artist/components/ArtistForm.tsx',
      'features/events/components/EventForm.tsx',
      'features/profile/components/ProfileForm.tsx'
    ],
    to: 'features/shared/components/forms/BaseForm.tsx'
  },
  {
    from: [
      'features/artist/components/ArtistCard.tsx',
      'features/events/components/EventCard.tsx',
      'features/offers/components/OfferCard.tsx'
    ],
    to: 'features/shared/components/artist/ArtistCard.tsx'
  }
];

// Función para asegurar que el directorio existe
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Función para crear la estructura estándar
function createStandardStructure() {
  // Crear estructura para features compartidos
  Object.entries(standardFeatureStructure).forEach(([feature, structure]) => {
    const featurePath = path.join(srcPath, 'features', feature);
    
    // Crear directorios principales
    Object.keys(structure).forEach(dir => {
      const dirPath = path.join(featurePath, dir);
      ensureDirectoryExists(dirPath);
      
      // Crear subdirectorios
      structure[dir].forEach(subdir => {
        ensureDirectoryExists(path.join(dirPath, subdir));
      });
    });
  });

  // Crear estructura estándar para cada feature
  const features = fs.readdirSync(path.join(srcPath, 'features'));
  features.forEach(feature => {
    if (!standardFeatureStructure[feature]) {
      const featurePath = path.join(srcPath, 'features', feature);
      const standardDirs = ['components', 'hooks', 'pages', 'utils'];
      
      standardDirs.forEach(dir => {
        ensureDirectoryExists(path.join(featurePath, dir));
      });
    }
  });
}

// Función para consolidar componentes
function consolidateComponents() {
  componentsToConsolidate.forEach(({ from, to }) => {
    const toPath = path.join(srcPath, to);
    ensureDirectoryExists(path.dirname(toPath));

    // Leer y combinar componentes
    const components = from
      .map(file => {
        const filePath = path.join(srcPath, file);
        if (fs.existsSync(filePath)) {
          return fs.readFileSync(filePath, 'utf8');
        }
        return null;
      })
      .filter(Boolean);

    if (components.length > 0) {
      // Crear componente base
      const baseComponent = `
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Tipos comunes
export interface BaseFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  schema?: z.ZodType<any>;
}

export function BaseForm({ onSubmit, initialData, schema }: BaseFormProps) {
  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialData
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Implementación base */}
    </form>
  );
}
      `;

      fs.writeFileSync(toPath, baseComponent);
      console.log(`Componente base creado: ${to}`);
    }
  });
}

// Función para crear archivos de barril
function createBarrelFiles() {
  const features = fs.readdirSync(path.join(srcPath, 'features'));
  
  features.forEach(feature => {
    const featurePath = path.join(srcPath, 'features', feature);
    const dirs = ['components', 'hooks', 'utils'];
    
    dirs.forEach(dir => {
      const dirPath = path.join(featurePath, dir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath)
          .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
          .map(file => file.replace(/\.(tsx|ts)$/, ''));
        
        if (files.length > 0) {
          const barrelContent = files
            .map(file => `export * from './${file}';`)
            .join('\n');
          
          fs.writeFileSync(path.join(dirPath, 'index.ts'), barrelContent);
          console.log('Archivo de barril creado: ' + feature + '/' + dir + '/index.ts');
        }
      }
    });
  });
}

// Función para crear READMEs
function createReadmes() {
  const features = fs.readdirSync(path.join(srcPath, 'features'));
  
  features.forEach(feature => {
    const featurePath = path.join(srcPath, 'features', feature);
    const readmeContent = [
      '# ' + feature.charAt(0).toUpperCase() + feature.slice(1) + ' Feature',
      '',
      '## Estructura',
      '- `components/`: Componentes específicos de la feature',
      '- `hooks/`: Hooks personalizados',
      '- `pages/`: Páginas de la feature',
      '- `utils/`: Utilidades específicas',
      '',
      '## Uso',
      '[Documentar el uso principal de la feature]',
      '',
      '## Componentes',
      '[Listar los componentes principales]',
      '',
      '## Hooks',
      '[Listar los hooks disponibles]',
      '',
      '## Ejemplos',
      '[Incluir ejemplos de uso]'
    ].join('\n');
    
    fs.writeFileSync(path.join(featurePath, 'README.md'), readmeContent);
    console.log('README creado para: ' + feature);
  });
}

// Ejecutar todas las funciones
console.log('Iniciando estandarización...');
createStandardStructure();
consolidateComponents();
createBarrelFiles();
createReadmes();
console.log('Estandarización completada!');