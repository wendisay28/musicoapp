import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
describe('Button Component', () => {
    it('renders button with correct text', () => {
        render(_jsx(Button, { children: "Click me" }));
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    it('handles click events', () => {
        const handleClick = jest.fn();
        render(_jsx(Button, { onClick: handleClick, children: "Click me" }));
        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it('applies variant classes correctly', () => {
        const { rerender } = render(_jsx(Button, { variant: "primary", children: "Button" }));
        expect(screen.getByText('Button')).toHaveClass('bg-primary');
        rerender(_jsx(Button, { variant: "secondary", children: "Button" }));
        expect(screen.getByText('Button')).toHaveClass('bg-secondary');
        rerender(_jsx(Button, { variant: "outline", children: "Button" }));
        expect(screen.getByText('Button')).toHaveClass('border');
    });
    it('applies size classes correctly', () => {
        const { rerender } = render(_jsx(Button, { size: "sm", children: "Button" }));
        expect(screen.getByText('Button')).toHaveClass('text-sm');
        rerender(_jsx(Button, { size: "md", children: "Button" }));
        expect(screen.getByText('Button')).toHaveClass('text-base');
        rerender(_jsx(Button, { size: "lg", children: "Button" }));
        expect(screen.getByText('Button')).toHaveClass('text-lg');
    });
    it('disables button when disabled prop is true', () => {
        render(_jsx(Button, { disabled: true, children: "Click me" }));
        expect(screen.getByText('Click me')).toBeDisabled();
    });
    it('shows loading state when loading prop is true', () => {
        render(_jsx(Button, { loading: true, children: "Click me" }));
        expect(screen.getByText('Click me')).toHaveClass('opacity-50');
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
    it('applies custom className', () => {
        render(_jsx(Button, { className: "custom-class", children: "Button" }));
        expect(screen.getByText('Button')).toHaveClass('custom-class');
    });
    it('renders with icon when provided', () => {
        const Icon: React.FC = () => _jsx("span", { "data-testid": "icon", children: "\uD83D\uDD0D" });
        render(_jsx(Button, { icon: _jsx(Icon, {}), children: "Search" }));
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
    it('handles keyboard interactions', () => {
        const handleClick = jest.fn();
        render(_jsx(Button, { onClick: handleClick, children: "Click me" }));
        fireEvent.keyDown(screen.getByText('Click me'), { key: 'Enter' });
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
