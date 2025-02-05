import React from 'react';
import { render, screen } from '@testing-library/react';
import { PreviewDocument } from './PreviewDocument';

const mockItem = {
    title: 'Sample Document',
    link: 'https://example.com/document.pdf',
    thumbnail: 'https://example.com/thumbnail.jpg',
};

const mockGoogleItem = {
    title: 'Sample Google Document',
    link: 'https://drive.google.com/file/d/1zzQsZN16h4pU-S4vqKYGlRC-onRictgC/view',
};

describe('PreviewDocument', () => {
    it('renders without preview or Google Doc icon', () => {
        render(<PreviewDocument item={mockItem} />);

        const documentLink = screen.getByTestId('link');
        const documentTitle = screen.getByText(mockItem.title);
        const downloadIcon = screen.queryByTestId('download-icon');
        const previewImage = screen.queryByTestId('preview-image');

        expect(documentLink).toBeInTheDocument();
        expect(documentTitle).toBeInTheDocument();
        expect(downloadIcon).toBeNull();
        expect(previewImage).toBeNull();
    });

    it('renders with preview image', () => {
        render(<PreviewDocument item={mockItem} isPreview />);

        const documentLink = screen.getByTestId('link');
        const documentTitle = screen.getByText(mockItem.title);
        const downloadIcon = screen.getByTestId('download-icon');

        expect(documentLink).toBeInTheDocument();
        expect(documentTitle).toBeInTheDocument();
        expect(downloadIcon).toBeInTheDocument();
    });

    it('renders with Google Doc icon', () => {
        render(<PreviewDocument item={mockGoogleItem} isGoogleDoc />);

        const documentLink = screen.getByTestId('link');
        const documentTitle = screen.getByText(mockGoogleItem.title);
        const downloadIcon = screen.getByTestId('download-icon');

        expect(documentLink).toBeInTheDocument();
        expect(documentTitle).toBeInTheDocument();
        expect(downloadIcon).toBeInTheDocument();
    });
});
