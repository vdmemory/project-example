import { ErrorCode } from 'react-dropzone';
import {
    getFileTypeErrorMessage,
    MAX_DOCUMENT_SIZE_UPLOAD,
} from '@breef/shared/constants';
import { getErrorUploadMessage } from './getErrorUploadMessage';

jest.mock('@breef/shared/constants', () => ({
    getFileTypeErrorMessage: jest.fn(),
    MAX_DOCUMENT_SIZE_UPLOAD: 5000000, // Mocking the value as 5MB
}));

describe('getErrorUploadMessage', () => {
    it.each([
        [
            'file-too-large',
            ErrorCode.FileTooLarge,
            `File is too large. Max size is ${Math.round(
                MAX_DOCUMENT_SIZE_UPLOAD / 1000000,
            )}MB`,
        ],
        ['file-invalid-type', ErrorCode.FileInvalidType, 'Invalid file type'],
        [
            'generic-error',
            'unexpected-error-code',
            'An unexpected error occurred',
        ],
    ])(
        'returns correct message for error code: %s',
        (testName, errorCode, expectedMessage) => {
            const errorMessage =
                expectedMessage !== 'Invalid file type'
                    ? expectedMessage
                    : 'Expected error message for FileInvalidType';

            if (errorCode === ErrorCode.FileInvalidType) {
                (getFileTypeErrorMessage as jest.Mock).mockReturnValue(
                    errorMessage,
                );
            }

            const error = {
                code: errorCode,
                message: 'An unexpected error occurred',
            };
            const message = getErrorUploadMessage(
                error,
                errorCode === ErrorCode.FileInvalidType
                    ? 'only-pdf'
                    : undefined,
            );

            expect(message).toBe(errorMessage);
        },
    );
});
