import { render, screen, fireEvent } from '@testing-library/react';
import { Toast } from '../Toast';
import { toast } from '../use-toast';

describe('Toast', () => {
  it('renders toast with title and description', () => {
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        variant="default"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders toast with different variants', () => {
    const { rerender } = render(
      <Toast
        title="Test Title"
        description="Test Description"
        variant="default"
      />
    );

    expect(screen.getByRole('alert')).toHaveClass('bg-background');

    rerender(
      <Toast
        title="Test Title"
        description="Test Description"
        variant="destructive"
      />
    );

    expect(screen.getByRole('alert')).toHaveClass('bg-destructive');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        variant="default"
        onClose={onClose}
      />
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
}); 