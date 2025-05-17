import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';

describe('Button Component', () => {
    it('renders button with correct text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles click events', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies variant classes correctly', () => {
        const { rerender } = render(<Button variant="default">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('bg-primary');
        
        rerender(<Button variant="secondary">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('bg-secondary');
        
        rerender(<Button variant="outline">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('border');

        rerender(<Button variant="ghost">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('hover:bg-accent');

        rerender(<Button variant="link">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('text-primary');

        rerender(<Button variant="destructive">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('bg-destructive');
    });

    it('applies size classes correctly', () => {
        const { rerender } = render(<Button size="default">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('h-9');
        
        rerender(<Button size="sm">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('h-8');
        
        rerender(<Button size="lg">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('h-10');

        rerender(<Button size="icon">🔍</Button>);
        expect(screen.getByText('🔍')).toHaveClass('w-9');
    });

    it('disables button when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByText('Click me')).toBeDisabled();
        expect(screen.getByText('Click me')).toHaveClass('disabled:opacity-50');
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Button</Button>);
        expect(screen.getByText('Button')).toHaveClass('custom-class');
    });

    it('renders as child component when asChild is true', () => {
        render(
            <Button asChild>
                <a href="#">Link Button</a>
            </Button>
        );
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByText('Link Button')).toBeInTheDocument();
    });

    it('handles keyboard interactions', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.keyDown(screen.getByText('Click me'), { key: 'Enter' });
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
