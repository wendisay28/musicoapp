import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'src');

async function fixExtensions() {
  try {
    // Encontrar todos los archivos .ts
    const files = await glob('**/*.ts', {
      cwd: SRC_DIR,
      ignore: ['**/node_modules/**', '**/dist/**']
    });

    for (const file of files) {
      const filePath = path.join(SRC_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Verificar si el archivo contiene JSX
      if (content.includes('</') || content.includes('/>')) {
        const newPath = filePath.replace('.ts', '.tsx');
        fs.renameSync(filePath, newPath);
        console.log(`Renamed ${file} to ${file.replace('.ts', '.tsx')}`);
      }
    }

    console.log('Extension fixes completed!');
  } catch (error) {
    console.error('Error fixing extensions:', error);
  }
}

fixExtensions(); 