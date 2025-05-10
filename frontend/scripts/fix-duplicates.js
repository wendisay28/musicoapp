const fs = require('fs');
const path = require('path');

// Directorios a eliminar (vacíos o redundantes)
const dirsToDelete = [
  'src/features/features',
  'src/features/shared/components/gallery',
  'src/features/shared/components/about',
  'src/features/shared/components/reviews',
  'src/features/shared/components/services',
  'src/features/shared/components/layout',
  'src/features/shared/components/header',
  'src/features/shared/components/contact',
  'src/features/shared/components/lists'
];

// Archivos a eliminar (duplicados)
const filesToDelete = [
  'src/features/ui/components/BaseCard.tsx',
  'src/pages/favorites/FavoriteArtistsTab.tsx',
  'src/features/pages/favorites/FavoriteArtistsTab.tsx',
  'src/features/artist/components/ArtistCard.tsx'
];

// Archivos a actualizar (imports)
const filesToUpdate = [
  {
    file: 'src/features/shared/components/artist/ArtistCard.tsx',
    changes: [
      {
        from: '@/types/artist',
        to: '@/features/shared/types/models/artist'
      }
    ]
  },
  {
    file: 'src/features/shared/components/artist/ArtistServices.tsx',
    changes: [
      {
        from: '@/types/service',
        to: '@/features/shared/types/models/service'
      }
    ]
  },
  {
    file: 'src/features/shared/components/artist/ArtistReviews.tsx',
    changes: [
      {
        from: '@/types/review',
        to: '@/features/shared/types/models/review'
      }
    ]
  },
  {
    file: 'src/features/shared/components/artist/ArtistGallery.tsx',
    changes: [
      {
        from: '@/types/gallery',
        to: '@/features/shared/types/models/gallery'
      }
    ]
  },
  {
    file: 'src/features/shared/components/artist/ArtistContact.tsx',
    changes: [
      {
        from: '@/types/contact',
        to: '@/features/shared/types/models/contact'
      }
    ]
  }
];

// Eliminar directorios vacíos
dirsToDelete.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    fs.rmdirSync(dirPath, { recursive: true });
    console.log(`Deleted directory: ${dir}`);
  }
});

// Eliminar archivos duplicados
filesToDelete.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${file}`);
  }
});

// Actualizar imports
filesToUpdate.forEach(({ file, changes }) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    changes.forEach(({ from, to }) => {
      content = content.replace(new RegExp(from, 'g'), to);
    });
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
  }
}); 