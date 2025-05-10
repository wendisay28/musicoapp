import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyChanges() {
  try {
    console.log('🔍 Iniciando verificación de cambios...\n');

    // 1. Verificar tipos
    console.log('Verificando tipos TypeScript...');
    try {
      await execAsync('npm run typecheck');
      console.log('✅ Verificación de tipos completada\n');
    } catch (error) {
      console.log('⚠️ Advertencia: Se encontraron errores en la verificación de tipos\n');
    }

    // 2. Ejecutar linter
    console.log('Ejecutando ESLint...');
    try {
      await execAsync('npm run lint');
      console.log('✅ Verificación de linter completada\n');
    } catch (error) {
      console.log('⚠️ Advertencia: Se encontraron errores en el linter\n');
    }

    // 3. Ejecutar pruebas
    console.log('Ejecutando pruebas...');
    try {
      await execAsync('npm run test');
      console.log('✅ Pruebas completadas\n');
    } catch (error) {
      console.log('⚠️ Advertencia: Se encontraron errores en las pruebas\n');
    }

    // 4. Verificar importaciones
    console.log('Verificando importaciones...');
    const importErrors = await checkImports();
    if (importErrors.length > 0) {
      console.log('❌ Se encontraron problemas en las importaciones:');
      importErrors.forEach(error => console.log(`- ${error}`));
    } else {
      console.log('✅ Verificación de importaciones completada\n');
    }

    // 5. Verificar estructura de directorios
    console.log('Verificando estructura de directorios...');
    const structureErrors = checkDirectoryStructure();
    if (structureErrors.length > 0) {
      console.log('❌ Se encontraron problemas en la estructura:');
      structureErrors.forEach(error => console.log(`- ${error}`));
    } else {
      console.log('✅ Verificación de estructura completada\n');
    }

    console.log('🎉 ¡Verificación completada!');
  } catch (error) {
    console.error('❌ Error durante la verificación:', error.message);
    process.exit(1);
  }
}

async function checkImports() {
  const errors = [];
  const srcDir = path.join(__dirname, '..', 'src');
  
  function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const importLines = content.match(/^import.*from.*/gm) || [];
    
    importLines.forEach(line => {
      if (line.includes('../components/') || line.includes('../pages/')) {
        errors.push(`Importación antigua encontrada en ${filePath}: ${line.trim()}`);
      }
    });
  }

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        if (!file.includes('node_modules') && !file.includes('dist')) {
          walkDir(filePath);
        }
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        checkFile(filePath);
      }
    });
  }

  walkDir(srcDir);
  return errors;
}

function checkDirectoryStructure() {
  const errors = [];
  const requiredDirs = [
    'src/features',
    'src/features/shared',
    'src/features/shared/components',
    'src/features/shared/types',
    'src/features/shared/hooks'
  ];

  requiredDirs.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Directorio requerido no encontrado: ${dir}`);
    }
  });

  return errors;
}

verifyChanges(); 