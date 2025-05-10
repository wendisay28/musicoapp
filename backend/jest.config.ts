import type { Config } from 'jest';
import baseConfig from '../jest.config.base';

const config: Config = {
  ...baseConfig,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  coverageReporters: ['text' as const, 'lcov' as const]
};

export default config; 