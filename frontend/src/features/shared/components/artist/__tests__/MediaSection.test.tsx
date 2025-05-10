import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { MediaSection } from '../MediaSection';
const mockImages = [
    {
        id: '1',
        url: 'https://example.com/image1.jpg',
        title: 'Image 1',
        description: 'Description 1',
    },
    {
        id: '2',
        url: 'https://example.com/image2.jpg',
        title: 'Image 2',
        description: 'Description 2',
    },
];
describe('MediaSection Component', () => {
    it('renders media section correctly', () => {
        render(_jsx(MediaSection, { images: mockImages }));
        expect(screen.getByText('Galería')).toBeInTheDocument();
        mockImages.forEach(image => {
            expect(screen.getByAltText(image.title)).toBeInTheDocument();
        });
    });
    it('handles image selection', () => {
        const handleSelect = jest.fn();
        render(_jsx(MediaSection, { images: mockImages, onSelect: handleSelect }));
        fireEvent.click(screen.getByAltText('Image 1'));
        expect(handleSelect).toHaveBeenCalledWith(mockImages[0]);
    });
    it('shows loading state', () => {
        render(_jsx(MediaSection, { images: mockImages, isLoading: true }));
        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    });
    it('shows empty state when no images', () => {
        render(_jsx(MediaSection, { images: [] }));
        expect(screen.getByText('No hay imágenes disponibles')).toBeInTheDocument();
    });
    it('applies custom styles', () => {
        render(_jsx(MediaSection, { images: mockImages, className: "custom-class" }));
        expect(screen.getByTestId('media-section')).toHaveClass('custom-class');
    });
});
