import { getAcceptFileTypes } from './getAcceptFileTypes';

import { getErrorMessage } from './getErrorMessage';
import { ErrorCode, FileError } from 'react-dropzone';
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

describe('getAcceptFileTypes', () => {
    it('returns correct file types for PDF', () => {
        const acceptedFileTypes = getAcceptFileTypes('pdf');
        expect(acceptedFileTypes).toEqual({
            [TYPE_FILE_PDF]: ['.pdf'],
        });
    });

    it('returns correct file types for all types', () => {
        const acceptedFileTypes = getAcceptFileTypes('all');
        expect(acceptedFileTypes).toEqual({
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
            [TYPE_FILE_PNG]: ['.png'],
            [TYPE_FILE_JPG]: ['.jpg'],
            [TYPE_FILE_JPEG]: ['.jpeg'],
        });
    });

    it('returns default file types for undefined type', () => {
        const acceptedFileTypes = getAcceptFileTypes();
        expect(acceptedFileTypes).toEqual({
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
        });
    });

    it('returns default file types for unknown type', () => {
        const acceptedFileTypes = getAcceptFileTypes('unknown');
        expect(acceptedFileTypes).toEqual({
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
        });
    });
});

describe('getErrorMessage', () => {
    const defaultError: FileError = {
        message: 'Default error message',
        code: 'default',
    };

    const invalidTypeError: FileError = {
        message: 'Invalid file type error',
        code: ErrorCode.FileInvalidType,
    };

    const tooLargeError: FileError = {
        message: 'File is too large',
        code: ErrorCode.FileTooLarge,
    };

    it('returns default error message for unknown error code', () => {
        const errorMessage = getErrorMessage(defaultError);
        expect(errorMessage).toBe('Default error message');
    });

    it('returns file type error message for invalid file type', () => {
        const errorMessage = getErrorMessage(invalidTypeError, 'all');
        expect(errorMessage).toBe(getFileTypeErrorMessage('all'));
    });

    it('returns file too large error message for file too large error', () => {
        const errorMessage = getErrorMessage(tooLargeError);
        expect(errorMessage).toBe(
            `File is too large. Max size is ${Math.round(
                MAX_DOCUMENT_SIZE_UPLOAD / 1000000,
            )}MB`,
        );
    });
});
