import { render, screen, fireEvent } from '@testing-library/react';
import File from './File';

describe('File component', () => {
    it('renders file name and icon when showIcon is true', () => {
        render(<File name="example.pdf" showIcon={true} />);
        const fileNameElement = screen.getByText('example.pdf');
        const fileIconElement = screen.getByAltText('File');
        expect(fileNameElement).toBeInTheDocument();
        expect(fileIconElement).toBeInTheDocument();
    });

    it('renders file name and default file icon when showIcon is false', () => {
        render(<File name="example.doc" showIcon={false} />);
        const fileNameElement = screen.getByText('example.doc');
        const defaultFileIconElement = screen.getByAltText('File');
        expect(fileNameElement).toBeInTheDocument();
        expect(defaultFileIconElement).toBeInTheDocument();
    });

    it('calls onRemove callback when TrashIconButton is clicked', () => {
        const mockOnRemove = jest.fn();
        render(<File name="example.pdf" onRemove={mockOnRemove} />);
        const trashIconButton = screen.getByTestId('trash-icon-button');
        fireEvent.click(trashIconButton);
        expect(mockOnRemove).toHaveBeenCalled();
    });

    it('does not call onRemove callback when File is clicked', () => {
        const mockOnRemove = jest.fn();
        render(<File name="example.pdf" onRemove={mockOnRemove} />);
        const fileItem = screen.getByText('example.pdf');
        fireEvent.click(fileItem);
        expect(mockOnRemove).not.toHaveBeenCalled();
    });
});
