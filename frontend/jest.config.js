module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Mapea las rutas con alias
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mapea los archivos de estilo
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Archivo para configurar entorno de pruebas
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'], // Define dónde buscar las pruebas
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Usa ts-jest para transformar los archivos ts/tsx
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensiones de archivos que Jest reconocerá
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Incluye archivos .ts/.tsx para la cobertura
    '!src/**/*.d.ts', // Excluye archivos de definición de tipos
    '!src/main.tsx', // Excluye el archivo principal de la aplicación
    '!src/vite-env.d.ts', // Excluye archivos específicos del entorno de Vite
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    }, // Establece el umbral de cobertura global
  },
};
