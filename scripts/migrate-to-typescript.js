const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FRONTEND_DIR = path.join(__dirname, '..', 'frontend', 'src');

function findJavaScriptFiles(dir) {
  const files = [];
  
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findJavaScriptFiles(fullPath));
    } else if (item.endsWith('.js')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

function migrateFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const newPath = file.replace(/\.js$/, '.ts');
  
  // Add type annotations where possible
  let newContent = content
    .replace(/function\s*\(/g, 'function (')
    .replace(/const\s+(\w+)\s*=/g, 'const $1: any =')
    .replace(/let\s+(\w+)\s*=/g, 'let $1: any =')
    .replace(/var\s+(\w+)\s*=/g, 'let $1: any =');
    
  fs.writeFileSync(newPath, newContent);
  fs.unlinkSync(file);
  
  console.log(`Migrated ${file} to ${newPath}`);
}

function migrateJSXFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const newPath = file.replace(/\.js$/, '.tsx');
  
  // Add React imports and type annotations
  let newContent = content;
  if (!content.includes('import React')) {
    newContent = `import React from 'react';\n${newContent}`;
  }
  
  newContent = newContent
    .replace(/function\s+(\w+)\s*\(/g, 'function $1 (props: any)')
    .replace(/const\s+(\w+)\s*=\s*\(/g, 'const $1: React.FC = (')
    .replace(/const\s+(\w+)\s*=\s*\{/g, 'const $1: any = {');
    
  fs.writeFileSync(newPath, newContent);
  fs.unlinkSync(file);
  
  console.log(`Migrated ${file} to ${newPath}`);
}

function main() {
  const files = findJavaScriptFiles(FRONTEND_DIR);
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check if file contains JSX
    if (content.includes('jsx') || content.includes('react')) {
      migrateJSXFile(file);
    } else {
      migrateFile(file);
    }
  });
  
  // Run ESLint fix
  try {
    execSync('cd frontend && npm run lint -- --fix', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running ESLint:', error);
  }
}

main(); 