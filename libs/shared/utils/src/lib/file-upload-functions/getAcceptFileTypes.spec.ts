import {
    TYPE_FILE_DOC,
    TYPE_FILE_DOCX,
    TYPE_FILE_JPEG,
    TYPE_FILE_JPG,
    TYPE_FILE_PDF,
    TYPE_FILE_PNG,
} from '@breef/shared/constants';

import { getAcceptFileTypes } from './getAcceptFileTypes';

describe('getAcceptFileTypes', () => {
    it('returns only PDF types when type is "pdf"', () => {
        const result = getAcceptFileTypes('pdf');
        const expected = { [TYPE_FILE_PDF]: ['.pdf'] };
        expect(result).toEqual(expected);
    });

    it('returns all file types when type is "all"', () => {
        const result = getAcceptFileTypes('all');
        const expected = {
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
            [TYPE_FILE_PNG]: ['.png'],
            [TYPE_FILE_JPG]: ['.jpg'],
            [TYPE_FILE_JPEG]: ['.jpeg'],
        };
        expect(result).toEqual(expected);
    });

    it('returns default file types when no type is specified', () => {
        const result = getAcceptFileTypes();
        const expected = {
            [TYPE_FILE_PDF]: ['.pdf'],
            [TYPE_FILE_DOC]: ['.doc', '.docx'],
            [TYPE_FILE_DOCX]: ['.docx'],
        };
        expect(result).toEqual(expected);
    });
});
