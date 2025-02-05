import { ErrorCode, FileError } from 'react-dropzone';
import {
    getFileTypeErrorMessage,
    MAX_DOCUMENT_SIZE_UPLOAD,
} from '@breef/shared/constants';

export const getErrorUploadMessage = (
    error: FileError,
    acceptFileTypes?: 'all' | 'only-pdf',
) => {
    if (error.code === ErrorCode.FileInvalidType) {
        return getFileTypeErrorMessage(acceptFileTypes);
    }
    if (error.code === ErrorCode.FileTooLarge) {
        return `File is too large. Max size is ${Math.round(
            MAX_DOCUMENT_SIZE_UPLOAD / 1000000,
        )}MB`;
    }
    return error.message;
};
