import { render, screen } from '@testing-library/react';
import { BaseMap } from '../BaseMap';
import { ArtistProfile, PriceUnit } from '@/types/artist';

// Mock de Google Maps
jest.mock('@react-google-maps/api', () => ({
  useLoadScript: () => ({
    isLoaded: true,
    loadError: null
  })
}));

describe('BaseMap', () => {
  const mockArtist: ArtistProfile = {
    id: '1',
    userId: 'user1',
    displayName: 'Artista de prueba',
    photoURL: '/test.jpg',
    coverImage: '/cover.jpg',
    role: 'artist',
    minPrice: 100,
    maxPrice: 500,
    priceUnit: PriceUnit.HOUR,
    category: 'Pintura',
    gallery: [],
    location: {
      city: 'Ciudad de prueba',
      state: 'Estado de prueba',
      country: 'País de prueba',
      coordinates: { lat: 0, lng: 0 }
    }
  };

  const defaultProps = {
    center: {
      city: 'Ciudad de prueba',
      state: 'Estado de prueba',
      country: 'País de prueba',
      coordinates: { lat: 0, lng: 0 }
    },
    markers: [
      {
        id: '1',
        type: 'artist' as const,
        position: { lat: 0, lng: 0 },
        title: 'Marcador de prueba',
        data: mockArtist
      }
    ]
  };

  it('renderiza correctamente con props básicas', () => {
    render(<BaseMap {...defaultProps} />);
    
    expect(screen.getByTestId('base-map')).toBeInTheDocument();
  });

  it('aplica las clases CSS personalizadas', () => {
    render(<BaseMap {...defaultProps} className="custom-class" />);
    
    const map = screen.getByTestId('base-map');
    expect(map).toHaveClass('custom-class');
  });

  it('renderiza con zoom personalizado', () => {
    render(<BaseMap {...defaultProps} zoom={15} />);
    
    expect(screen.getByTestId('base-map')).toBeInTheDocument();
  });

  it('renderiza sin marcadores', () => {
    const { markers, ...props } = defaultProps;
    render(<BaseMap {...props} markers={[]} />);
    
    expect(screen.getByTestId('base-map')).toBeInTheDocument();
  });
}); 