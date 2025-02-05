import { getBrandDocumentIcon } from './formatBrandDocumentsIcon';

describe('getBrandDocumentIcon', () => {
    it('should return a PDF icon when given a PDF link', () => {
        const result = getBrandDocumentIcon('my-file.pdf');
        expect(result).toBeDefined();

        expect(result?.props).toEqual({
            className: 'pdf-icon',
            'data-testid': 'pdf-icon',
        });
    });

    it('should return a File icon when given a DOC link', () => {
        const result = getBrandDocumentIcon('my-file.doc');
        expect(result).toBeDefined();
        expect(result?.props).toEqual({
            className: 'pdf-icon',
            'data-testid': 'file-icon',
        });
    });

    it('should return a File icon when given a DOCX link', () => {
        const result = getBrandDocumentIcon('my-file.docx');
        expect(result).toBeDefined();
        expect(result?.props).toEqual({
            className: 'pdf-icon',
            'data-testid': 'file-icon',
        });
    });

    it('should return null when given a link without an extension', () => {
        const result = getBrandDocumentIcon('my-file');
        expect(result).toBeNull();
    });

    it('should return null when given a link with an unrecognized extension', () => {
        const result = getBrandDocumentIcon('my-file.xyz');
        expect(result).toBeNull();
    });
});
