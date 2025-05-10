import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

// Directorios a verificar
const dirsToCheck = [
  'features/home/pages/components',
  'pages/GeoRecommendationsPage',
  'pages/favorites'
];

// Mover archivos de documentación
const docsToMove = [
  {
    from: path.join(srcPath, 'pages/README.md'),
    to: path.join(srcPath, 'docs/pages.md')
  },
  {
    from: path.join(srcPath, 'pages/ARCHITECTURE.md'),
    to: path.join(srcPath, 'docs/architecture.md')
  }
];

// Función para asegurar que el directorio existe
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Función para verificar si un directorio está vacío
function isDirEmpty(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files.length === 0;
  } catch (error) {
    console.error(`Error al verificar directorio ${dirPath}:`, error);
    return false;
  }
}

// Función para eliminar un directorio y sus subdirectorios vacíos
function removeEmptyDirs(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      return;
    }

    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        removeEmptyDirs(fullPath);
      }
    }

    if (isDirEmpty(dirPath)) {
      fs.rmdirSync(dirPath);
      console.log(`Directorio vacío eliminado: ${dirPath}`);
    }
  } catch (error) {
    console.error(`Error al eliminar directorio ${dirPath}:`, error);
  }
}

// Mover archivos de documentación
ensureDirectoryExists(path.join(srcPath, 'docs'));
docsToMove.forEach(({ from, to }) => {
  try {
    if (fs.existsSync(from)) {
      fs.copyFileSync(from, to);
      console.log(`Archivo de documentación movido: ${from} -> ${to}`);
    }
  } catch (error) {
    console.error(`Error al mover archivo ${from}:`, error);
  }
});

// Eliminar directorios vacíos
dirsToCheck.forEach(dir => {
  const fullPath = path.join(srcPath, dir);
  removeEmptyDirs(fullPath);
});

console.log('Limpieza completada!'); 