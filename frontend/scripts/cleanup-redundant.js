import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcPath = path.join(__dirname, '../src');

// Directorios a verificar
const emptyDirs = [
  'features/home/pages/components',
  'features/layout/components',
  'features/profile',
  'pages/GeoRecommendationsPage',
  'pages/favorites'
];

// Directorios redundantes y sus destinos
const redundantDirs = [
  {
    source: 'features/profile/components',
    target: 'features/artist/components'
  },
  {
    source: 'features/profile/hooks',
    target: 'features/artist/hooks'
  },
  {
    source: 'features/profile/utils',
    target: 'features/artist/utils'
  }
];

// Función para verificar si un directorio está vacío
function isDirEmpty(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files.length === 0;
  } catch (error) {
    return true;
  }
}

// Función para eliminar directorios vacíos recursivamente
function removeEmptyDirs(dirPath) {
  if (!fs.existsSync(dirPath)) return;

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
}

// Función para mover archivos de directorios redundantes
function moveRedundantFiles() {
  redundantDirs.forEach(({ source, target }) => {
    const sourcePath = path.join(srcPath, source);
    const targetPath = path.join(srcPath, target);

    if (!fs.existsSync(sourcePath)) return;

    // Asegurar que el directorio destino existe
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    // Mover archivos
    const files = fs.readdirSync(sourcePath);
    files.forEach(file => {
      const sourceFile = path.join(sourcePath, file);
      const targetFile = path.join(targetPath, file);
      
      if (fs.statSync(sourceFile).isFile()) {
        fs.copyFileSync(sourceFile, targetFile);
        fs.unlinkSync(sourceFile);
        console.log(`Archivo movido: ${sourceFile} -> ${targetFile}`);
      }
    });

    // Eliminar el directorio fuente si está vacío
    if (isDirEmpty(sourcePath)) {
      fs.rmdirSync(sourcePath);
      console.log(`Directorio redundante eliminado: ${sourcePath}`);
    }
  });
}

// Función para actualizar importaciones
function updateImports() {
  const filesToUpdate = [
    'App.tsx',
    'features/artist/components/ArtistProfile.tsx',
    'features/events/components/EventList.tsx'
  ];

  filesToUpdate.forEach(file => {
    const filePath = path.join(srcPath, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Actualizar rutas de importación
    content = content.replace(
      /from ['"]\.\.\/profile\/(.*?)['"]/g,
      'from \'../artist/$1\''
    );

    fs.writeFileSync(filePath, content);
    console.log(`Importaciones actualizadas en: ${file}`);
  });
}

// Ejecutar limpieza
console.log('Iniciando limpieza...');

// Eliminar directorios vacíos
emptyDirs.forEach(dir => {
  const dirPath = path.join(srcPath, dir);
  removeEmptyDirs(dirPath);
});

// Mover archivos redundantes
moveRedundantFiles();

// Actualizar importaciones
updateImports();

console.log('Limpieza completada!'); 