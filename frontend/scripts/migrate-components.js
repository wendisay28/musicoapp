import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'src');
const FEATURES_DIR = path.join(SRC_DIR, 'features');

// Mapeo de directorios antiguos a nuevos
const COMPONENT_MAPPING = {
  'pages': 'pages',
  'components/common': 'shared/components',
  'components/ui': 'shared/ui',
  'components/features': 'features'
};

async function migrateComponents() {
  try {
    // Crear directorios necesarios
    Object.values(COMPONENT_MAPPING).forEach(dir => {
      const fullPath = path.join(FEATURES_DIR, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });

    // Encontrar todos los componentes
    const components = await glob('**/*.{tsx,ts}', {
      cwd: SRC_DIR,
      ignore: ['**/node_modules/**', '**/dist/**']
    });

    // Migrar cada componente
    for (const component of components) {
      const oldPath = path.join(SRC_DIR, component);
      const content = fs.readFileSync(oldPath, 'utf-8');
      
      // Determinar nueva ubicación
      let newLocation = '';
      for (const [oldDir, newDir] of Object.entries(COMPONENT_MAPPING)) {
        if (component.startsWith(oldDir)) {
          newLocation = component.replace(oldDir, newDir);
          break;
        }
      }

      if (newLocation) {
        const newPath = path.join(FEATURES_DIR, newLocation);
        const newDir = path.dirname(newPath);

        // Crear directorio si no existe
        if (!fs.existsSync(newDir)) {
          fs.mkdirSync(newDir, { recursive: true });
        }

        // Mover archivo
        fs.writeFileSync(newPath, content);
        console.log(`Migrated: ${component} -> ${newLocation}`);
      }
    }

    console.log('Component migration completed!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

migrateComponents(); 