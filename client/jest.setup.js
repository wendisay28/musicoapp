import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { jest } from '@jest/globals';
import React from 'react';

configure({ testIdAttribute: 'data-testid' });

// Mock de Google Maps
jest.mock('@react-google-maps/api', () => ({
  useLoadScript: jest.fn().mockReturnValue({
    isLoaded: true,
    loadError: null
  }),
  GoogleMap: jest.fn().mockImplementation(({ children }) => React.createElement('div', { 'data-testid': 'google-map' }, children)),
  Marker: jest.fn().mockImplementation(({ children }) => React.createElement('div', { 'data-testid': 'marker' }, children)),
  useJsApiLoader: jest.fn().mockReturnValue({
    isLoaded: true,
    loadError: null
  })
}));

// Mock del objeto google
global.google = {
  maps: {
    Map: jest.fn().mockImplementation(() => ({
      setCenter: jest.fn(),
      setZoom: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn()
    })),
    Marker: jest.fn().mockImplementation(() => ({
      setMap: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn()
    })),
    LatLng: jest.fn().mockImplementation((lat, lng) => ({ lat, lng })),
    event: {
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
  }
};

// Hacer jest disponible globalmente
global.jest = jest; 