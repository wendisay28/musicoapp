import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'src');

// Patrones de importación a actualizar
const IMPORT_PATTERNS = [
  {
    from: /from ['"]\.\.?\/.*\/components\/(.*)['"]/g,
    to: (match, p1) => `from '@/features/shared/components/${p1}'`
  },
  {
    from: /from ['"]\.\.?\/.*\/pages\/(.*)['"]/g,
    to: (match, p1) => `from '@/features/pages/${p1}'`
  },
  {
    from: /from ['"]@\/components\/(.*)['"]/g,
    to: (match, p1) => `from '@/features/shared/components/${p1}'`
  },
  // Patrones específicos para las características
  {
    from: /from ['"]\.\.\/components\/(.*)['"]/g,
    to: (match, p1) => `from '@/features/shared/components/${p1}'`
  },
  {
    from: /from ['"]\.\.\/components\/(.*?)\/(.*)['"]/g,
    to: (match, p1, p2) => `from '@/features/shared/components/${p1}/${p2}'`
  }
];

async function updateImports() {
  try {
    // Encontrar todos los archivos TypeScript/React
    const files = await glob('**/*.{ts,tsx}', {
      cwd: SRC_DIR,
      ignore: ['**/node_modules/**', '**/dist/**']
    });

    for (const file of files) {
      const filePath = path.join(SRC_DIR, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      let wasUpdated = false;

      // Aplicar cada patrón de actualización
      for (const pattern of IMPORT_PATTERNS) {
        const newContent = content.replace(pattern.from, pattern.to);
        if (newContent !== content) {
          content = newContent;
          wasUpdated = true;
        }
      }

      // Guardar archivo si fue modificado
      if (wasUpdated) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated imports in: ${file}`);
      }
    }

    console.log('Import updates completed!');
  } catch (error) {
    console.error('Error updating imports:', error);
  }
}

updateImports(); 