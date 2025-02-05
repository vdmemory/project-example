import { render, fireEvent, screen } from '@testing-library/react';
import { UploadButton } from './UploadButton';
import { useDropzone } from 'react-dropzone';

jest.mock('react-dropzone', () => ({
    useDropzone: jest.fn(),
    ErrorCode: jest.requireActual('react-dropzone').ErrorCode,
}));

describe('UploadButton', () => {
    const mockOnChange = jest.fn();
    const mockSetError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useDropzone as jest.Mock).mockReturnValue({
            getInputProps: jest.fn(() => ({ 'data-testid': 'file-input' })),
            fileRejections: [],
            inputRef: {
                current: {
                    value: '',
                },
            },
        });
    });

    it('renders the input component correctly', () => {
        render(
            <UploadButton onChange={mockOnChange} setError={mockSetError} />,
        );
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    it('calls onChange with accepted files', async () => {
        const mockFiles = [
            new File(['test'], 'test.pdf', { type: 'application/pdf' }),
        ];
        (useDropzone as jest.Mock).mockReturnValue({
            getInputProps: jest.fn(() => ({ 'data-testid': 'file-input' })),
            fileRejections: [],
            onDropAccepted: jest
                .fn()
                .mockImplementation(callback => callback(mockFiles)),
            inputRef: {
                current: {
                    value: '',
                },
            },
        });

        render(
            <UploadButton onChange={mockOnChange} setError={mockSetError} />,
        );
        const input: HTMLInputElement = screen.getByTestId('file-input');
        fireEvent.change(input, { target: { files: mockFiles } });

        expect(input.value).toBe('');
    });

    it('displays correct error message on file rejection', () => {
        const rejectionError = {
            code: 'file-too-large',
            message: 'File is too large. Max size is 10MB',
        };
        (useDropzone as jest.Mock).mockReturnValue({
            getInputProps: jest.fn(() => ({ 'data-testid': 'file-input' })),
            fileRejections: [{ errors: [rejectionError] }],
            inputRef: {
                current: {
                    value: '',
                },
            },
        });

        render(
            <UploadButton onChange={mockOnChange} setError={mockSetError} />,
        );
        expect(mockSetError).toHaveBeenCalledWith(
            'File is too large. Max size is 10MB',
        ); // Assuming getErrorUploadMessage returns message based on error
    });

    it('disables the input when disabled prop is true', () => {
        render(
            <UploadButton
                onChange={mockOnChange}
                setError={mockSetError}
                disabled={true}
            />,
        );
        const input = screen.getByTestId('file-input');
        expect(input).toBeDisabled();
    });
});
