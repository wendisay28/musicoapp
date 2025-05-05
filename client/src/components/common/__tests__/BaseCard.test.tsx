import { render, screen, fireEvent } from '@testing-library/react';
import { BaseCard } from '../BaseCard';

describe('BaseCard', () => {
  const defaultProps = {
    id: '1',
    title: 'Título de prueba',
    description: 'Descripción de prueba',
    imageUrl: '/test-image.jpg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02'
  };

  it('renderiza correctamente con props básicas', () => {
    render(<BaseCard {...defaultProps} />);
    
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument();
    expect(screen.getByTestId('base-card-1')).toBeInTheDocument();
  });

  it('renderiza sin descripción cuando no se proporciona', () => {
    const { description, ...props } = defaultProps;
    render(<BaseCard {...props} />);
    
    expect(screen.queryByText('Descripción de prueba')).not.toBeInTheDocument();
  });

  it('renderiza el footer cuando se proporciona', () => {
    const footer = <button>Botón de prueba</button>;
    render(<BaseCard {...defaultProps} footer={footer} />);
    
    expect(screen.getByText('Botón de prueba')).toBeInTheDocument();
  });

  it('llama al onClick cuando se hace clic en la tarjeta', () => {
    const handleClick = jest.fn();
    render(<BaseCard {...defaultProps} onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('base-card-1'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica las clases CSS personalizadas', () => {
    render(<BaseCard {...defaultProps} className="custom-class" />);
    
    const card = screen.getByTestId('base-card-1');
    expect(card).toHaveClass('custom-class');
  });
}); 