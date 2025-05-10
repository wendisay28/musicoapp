import { jest, beforeAll, afterAll, beforeEach } from '@jest/globals';

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.JWT_SECRET = 'test-secret';

// Global test setup
beforeAll(() => {
  // Add any global setup here
});

afterAll(() => {
  // Add any global cleanup here
});

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 