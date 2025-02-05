/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen } from '@testing-library/react';
import { BrandDocuments } from './BrandDocuments';

const googleLink =
    'https://drive.google.com/file/d/1zzQsZN16h4pU-S4vqKYGlRC-onRictgC/view';
const mockDocuments = [
    { link: 'example.com/file.pdf', title: 'Document 1', type: 'file' },
    { link: 'example.com/doc.docx', title: 'Document 2', type: 'file' },
    { link: 'example.com/link1', title: 'Link 1', type: 'link' },
    { link: 'example.com/link2', title: 'Link 2', type: 'link' },
    {
        link: googleLink,
        title: 'Link 3',
        type: 'link',
    },
];

describe('BrandDocuments', () => {
    it('renders in list mode', () => {
        render(<BrandDocuments documents={mockDocuments} mode="list" />);
        const listModeElement = screen.getByTestId('list-mode');
        expect(listModeElement).toBeInTheDocument();

        mockDocuments.forEach(({ title }) => {
            const documentElement = screen.getByText(title);
            expect(documentElement).toBeInTheDocument();
        });
    });

    it('renders in empty mode', () => {
        // @ts-ignore
        render(<BrandDocuments documents={mockDocuments} mode="" />);
        const listModeElement = screen.queryByTestId('list-mode');
        expect(listModeElement).not.toBeInTheDocument();
        const previewModeElement = screen.queryByTestId('preview-mode');
        expect(previewModeElement).not.toBeInTheDocument();
    });

    it('renders in list mode when documents empty', () => {
        render(<BrandDocuments documents={[]} mode="list" />);
        const listModeElement = screen.queryByTestId('list-mode');
        expect(listModeElement).not.toBeInTheDocument();
    });

    it('renders in preview mode', () => {
        render(<BrandDocuments documents={mockDocuments} mode="preview" />);

        const previewModeElement = screen.getByTestId('preview-mode');
        expect(previewModeElement).toBeInTheDocument();

        const link1 = screen.getByText('Link 1');
        const link2 = screen.getByText('Link 2');
        const link3 = screen.getByText('Link 3');
        const doc1 = screen.getByText('Document 1');
        const doc2 = screen.getByText('Document 2');

        expect(link1).toBeInTheDocument();
        expect(link2).toBeInTheDocument();
        expect(link3).toBeInTheDocument();
        expect(doc1).toBeInTheDocument();
        expect(doc2).toBeInTheDocument();

        const link1Element = link1.parentElement?.parentElement;
        const link2Element = link2.parentElement?.parentElement;
        const link3Element = link3.parentElement?.parentElement;
        const doc1Element = doc1.parentElement?.parentElement;
        const doc2Element = doc2.parentElement?.parentElement;

        expect(link1Element).toHaveAttribute('href', 'example.com/link1');
        expect(link2Element).toHaveAttribute('href', 'example.com/link2');
        expect(link3Element).toHaveAttribute('href', googleLink);
        expect(doc1Element).toHaveAttribute('href', 'example.com/file.pdf');
        expect(doc2Element).toHaveAttribute('href', 'example.com/doc.docx');
    });
});
