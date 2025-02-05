import { useMediaContext } from '@breef/shared/hooks';
import { render, screen } from '@testing-library/react';
import { FileRejection, useDropzone } from 'react-dropzone';
import DropzoneOld, { getAccept, renderError } from './DropzoneOld';
import { ErrorCode } from 'react-dropzone';
import {
    getFileTypeErrorMessage,
    MAX_DOCUMENT_SIZE_UPLOAD,
} from '@breef/shared/constants';
import {
    TYPE_FILE_DOC,
    TYPE_FILE_DOCX,
    TYPE_FILE_JPEG,
    TYPE_FILE_JPG,
    TYPE_FILE_PDF,
    TYPE_FILE_PNG,
} from '@breef/shared/constants';

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
        render(<DropzoneOld />);
        expect(
            screen.getByText(
                "Drag 'n' drop some files here, or click to select files",
            ),
        ).toBeInTheDocument();
    });

    it('renders uploading message', () => {
        render(<DropzoneOld uploading />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    it('renders uploading message', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        render(<DropzoneOld uploading />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));
        (useDropzone as jest.Mock).mockImplementation(() => dropzoneData);
        render(<DropzoneOld />);
        expect(screen.getByText('Upload')).toBeInTheDocument();
    });

    it('renders tip props', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: false,
        }));
        (useDropzone as jest.Mock).mockImplementation(() => dropzoneData);
        render(<DropzoneOld tip="hello" />);
        expect(screen.getByText('hello')).toBeInTheDocument();
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
        render(<DropzoneOld />);
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
        render(<DropzoneOld />);
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
        render(<DropzoneOld />);
        expect(
            screen.getByText('Some files will be rejected'),
        ).toBeInTheDocument();
    });
});

describe('getAccept', () => {
    it('returns correct file types for "only-pdf"', () => {
        const acceptedTypes = getAccept('only-pdf');
        expect(acceptedTypes).toEqual({
            [TYPE_FILE_PDF]: ['.pdf'],
        });
    });

    it('returns correct file types for "all"', () => {
        const acceptedTypes = getAccept('all');
        expect(acceptedTypes).toEqual({
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
            [TYPE_FILE_PNG]: ['.png'],
            [TYPE_FILE_JPG]: ['.jpg'],
            [TYPE_FILE_JPEG]: ['.jpeg'],
        });
    });

    it('returns default file types for unknown type', () => {
        const acceptedTypes = getAccept();
        expect(acceptedTypes).toEqual({
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
        });
    });
});

describe('renderError', () => {
    const defaultError = {
        message: 'Default error message',
        code: 'default',
    };

    const invalidTypeError = {
        message: 'Invalid file type error',
        code: ErrorCode.FileInvalidType,
    };

    const tooLargeError = {
        message: 'File is too large',
        code: ErrorCode.FileTooLarge,
    };

    it('returns default error message for unknown error code', () => {
        const errorMessage = renderError(defaultError);
        expect(errorMessage).toBe('Default error message');
    });

    it('returns file type error message for invalid file type', () => {
        const errorMessage = renderError(invalidTypeError, 'only-pdf');
        expect(errorMessage).toBe(getFileTypeErrorMessage('only-pdf'));
    });

    it('returns file too large error message for file too large error', () => {
        const errorMessage = renderError(tooLargeError);
        expect(errorMessage).toBe(
            `File is too large. Max size is ${Math.round(
                MAX_DOCUMENT_SIZE_UPLOAD / 1000000,
            )}MB`,
        );
    });
});
