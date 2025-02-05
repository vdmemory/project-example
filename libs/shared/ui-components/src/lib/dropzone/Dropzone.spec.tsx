import { useMediaContext } from '@breef/shared/hooks';
import { render, screen } from '@testing-library/react';
import { FileRejection, useDropzone } from 'react-dropzone';
import Dropzone from './Dropzone';

const dropzoneData = {
    fileRejections: [],
    getRootProps: jest.fn(() => ({})),
    getInputProps: jest.fn(() => ({})),
    isFocused: false,
    isDragAccept: false,
    isDragReject: false,
    inputRef: { current: null },
};

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMobile: false,
}));

jest.mock('react-dropzone');
(useDropzone as jest.Mock).mockImplementation(() => dropzoneData);

describe('Dropzone', () => {
    it('renders upload message initially', () => {
        render(<Dropzone />);
        expect(screen.getByText(/upload here/i)).toBeInTheDocument();
    });

    it('renders uploading message', () => {
        render(<Dropzone uploading />);
        expect(screen.getByText('Uploading...')).toBeInTheDocument();
    });
    it('renders uploading message', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<Dropzone uploading />);
        expect(screen.getByText('Uploading...')).toBeInTheDocument();
    });

    it('renders mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        (useDropzone as jest.Mock).mockImplementation(() => dropzoneData);
        render(<Dropzone />);
        expect(screen.getByText('UPLOAD DOCUMENTS')).toBeInTheDocument();
    });

    it('renders tip props', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: false,
        }));
        (useDropzone as jest.Mock).mockImplementation(() => dropzoneData);
        render(<Dropzone tip="hello" />);
        expect(screen.getByText('hello')).toBeInTheDocument();
    });

    it('renders tip mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<Dropzone tip="hello" />);
        expect(screen.queryByText('hello')).not.toBeInTheDocument();
    });

    it('renders Dropzone when fileRejections exist', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));

        const fileRejections: FileRejection[] = [
            {
                file: new File([''], 'file.pdf'),
                errors: [
                    { message: 'file is too large', code: 'file-too-large' },
                ],
            },
        ];

        (useDropzone as jest.Mock).mockImplementation(() => {
            return {
                ...dropzoneData,
                fileRejections,
            };
        });
        render(<Dropzone />);
        expect(
            screen.getByText('File is too large. Max size is 10MB'),
        ).toBeInTheDocument();
    });

    it('renders Dropzone when isDragAccept prop exist', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: false,
        }));

        (useDropzone as jest.Mock).mockImplementation(() => {
            return {
                ...dropzoneData,
                isDragAccept: true,
            };
        });
        render(<Dropzone isMobileView={false} />);
        expect(
            screen.getByText('All files will be accepted'),
        ).toBeInTheDocument();
    });

    it('renders Dropzone when isDragAccept prop exist', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: false,
        }));

        (useDropzone as jest.Mock).mockImplementation(() => {
            return {
                ...dropzoneData,
                isDragReject: true,
            };
        });
        render(<Dropzone isMobileView={false} />);
        expect(
            screen.getByText('Some files will be rejected'),
        ).toBeInTheDocument();
    });
});
