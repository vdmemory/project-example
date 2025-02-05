import {
    TYPE_FILE_DOC,
    TYPE_FILE_DOCX,
    TYPE_FILE_JPEG,
    TYPE_FILE_JPG,
    TYPE_FILE_PDF,
    TYPE_FILE_PNG,
} from '@breef/shared/constants';

export const getAcceptFileTypes = (type?: string): Record<string, string[]> => {
    if (type === 'pdf') {
        return {
            [TYPE_FILE_PDF]: ['.pdf'],
        };
    }

    if (type === 'all') {
        return {
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
            [TYPE_FILE_PNG]: ['.png'],
            [TYPE_FILE_JPG]: ['.jpg'],
            [TYPE_FILE_JPEG]: ['.jpeg'],
        };
    }

    return {
        [TYPE_FILE_PDF]: ['.pdf'],
        [TYPE_FILE_DOC]: ['.doc', '.docx'],
        [TYPE_FILE_DOCX]: ['.docx'],
    };
};
