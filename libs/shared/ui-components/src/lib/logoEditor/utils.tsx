import {
    MAX_FILE_SIZE_UPLOAD,
    TYPE_FILE_JPEG,
    TYPE_FILE_JPG,
    TYPE_FILE_PNG,
} from '@breef/shared/constants';

export const getValidationMessage = (
    files: FileList,
    maxSize = MAX_FILE_SIZE_UPLOAD,
) => {
    if (files.length && files[0].size > maxSize) {
        return `File must not exceed ${convertToMb(MAX_FILE_SIZE_UPLOAD)}mb`;
    }
    if (
        files.length &&
        files[0].type !== TYPE_FILE_JPG &&
        files[0].type !== TYPE_FILE_PNG &&
        files[0].type !== TYPE_FILE_JPEG
    ) {
        return 'TipBothParts must be in jpeg/png format';
    }
    return '';
};

export const convertToMb = (size: number) =>
    Math.round((size / 1024 / 1024) * 100) / 100;
