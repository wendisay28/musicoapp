import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapeo de archivos a mover
const filesToMove = [
  {
    from: path.join(__dirname, '../src/pages/home/HomePage.tsx'),
    to: path.join(__dirname, '../src/features/home/pages/HomePage.tsx')
  },
  {
    from: path.join(__dirname, '../src/pages/explorer/ExplorerPage.tsx'),
    to: path.join(__dirname, '../src/features/explorer/pages/ExplorerPage.tsx')
  },
  {
    from: path.join(__dirname, '../src/pages/events/EventDetailsPage.tsx'),
    to: path.join(__dirname, '../src/features/events/pages/EventDetailsPage.tsx')
  },
  {
    from: path.join(__dirname, '../src/pages/events/CreateEventPage.tsx'),
    to: path.join(__dirname, '../src/features/events/pages/CreateEventPage.tsx')
  },
  {
    from: path.join(__dirname, '../src/pages/chat/ChatPage.tsx'),
    to: path.join(__dirname, '../src/features/chat/pages/ChatPage.tsx')
  }
];

// Función para asegurar que el directorio existe
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Mover cada archivo
filesToMove.forEach(({ from, to }) => {
  try {
    // Asegurar que el directorio de destino existe
    ensureDirectoryExists(path.dirname(to));

    // Mover el archivo
    if (fs.existsSync(from)) {
      fs.renameSync(from, to);
      console.log(`Moved ${from} to ${to}`);
    } else {
      console.log(`File not found: ${from}`);
    }
  } catch (error) {
    console.error(`Error moving ${from} to ${to}:`, error);
  }
});

console.log('File movement completed!'); 