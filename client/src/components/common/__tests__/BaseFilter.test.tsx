import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, describe, it } from 'vitest';
import { BaseFilter } from '../BaseFilter';

describe('BaseFilter', () => {
  const defaultProps = {
    label: 'Filtro de prueba',
    options: [
      { value: '1', label: 'Opción 1' },
      { value: '2', label: 'Opción 2' },
      { value: '3', label: 'Opción 3' }
    ],
    selectedValues: ['1'],
    onFilterChange: jest.fn()
  };

  it('renderiza correctamente con props básicas', () => {
    render(<BaseFilter {...defaultProps} />);
    
    expect(screen.getByText('Filtro de prueba')).toBeInTheDocument();
    expect(screen.getByText('Opción 1')).toBeInTheDocument();
    expect(screen.getByText('Opción 2')).toBeInTheDocument();
    expect(screen.getByText('Opción 3')).toBeInTheDocument();
  });

  it('llama a onFilterChange cuando se hace clic en una opción', () => {
    render(<BaseFilter {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Opción 2'));
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('deselecciona una opción cuando se hace clic en una opción ya seleccionada', () => {
    render(<BaseFilter {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Opción 1'));
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith([]);
  });

  it('solo permite una selección cuando isMulti es false', () => {
    render(<BaseFilter {...defaultProps} isMulti={false} />);
    
    fireEvent.click(screen.getByText('Opción 2'));
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith(['2']);
    
    fireEvent.click(screen.getByText('Opción 3'));
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith(['3']);
  });

  it('aplica las clases CSS personalizadas', () => {
    render(<BaseFilter {...defaultProps} className="custom-class" />);
    
    const filter = screen.getByTestId('base-filter');
    expect(filter).toHaveClass('custom-class');
  });

  it('maneja correctamente el estado de carga', () => {
    render(<BaseFilter {...defaultProps} isLoading={true} />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('muestra mensaje de error cuando hay un error', () => {
    render(<BaseFilter {...defaultProps} error="Error de carga" />);
    
    expect(screen.getByText('Error de carga')).toBeInTheDocument();
  });

  it('es accesible para lectores de pantalla', () => {
    render(<BaseFilter {...defaultProps} />);
    
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByLabelText('Filtro de prueba')).toBeInTheDocument();
  });

  it('permite navegación por teclado', () => {
    render(<BaseFilter {...defaultProps} />);
    
    const option2 = screen.getByText('Opción 2');
    fireEvent.keyDown(option2, { key: 'Enter' });
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith(['1', '2']);
  });

  it('valida que los valores seleccionados existan en las opciones', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    render(<BaseFilter {...defaultProps} selectedValues={['4']} />);
    
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });
}); 