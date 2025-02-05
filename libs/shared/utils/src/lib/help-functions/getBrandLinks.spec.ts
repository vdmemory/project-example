import { getBrandLinks } from './getBrandLinks';

jest.mock('./stringTransformFunctions', () => ({
    urlToDefaultFormat: jest.fn(link => `transformed_${link}`),
}));

describe('getBrandLinks', () => {
    const brandLinksMock = [
        { id: 1, title: 'Link 1', link: 'https://example.com/link1' },
        { id: 2, title: 'Link 2', link: 'https://example.com/link2' },
    ];

    const filesLinksMock = [
        {
            id: 1,
            name: 'File 1',
            url: 'https://example.com/file1',
            thumbnail_url: 'thumbnail1.jpg',
        },
        {
            id: 2,
            name: 'File 2',
            url: 'https://example.com/file2',
            thumbnail_url: 'thumbnail2.jpg',
        },
    ];

    it('transforms brand links and combines with files links', () => {
        const result = getBrandLinks(brandLinksMock, filesLinksMock);

        expect(result).toHaveLength(4); // 2 brand links + 2 files links
        expect(result[0].link).toBe('transformed_https://example.com/link1');
        expect(result[1].link).toBe('transformed_https://example.com/link2');
        expect(result[2].link).toBe('https://example.com/file1'); // File link is not transformed
        expect(result[3].link).toBe('https://example.com/file2'); // File link is not transformed
    });

    it('returns only transformed brand links if files links are not provided', () => {
        const result = getBrandLinks(brandLinksMock);

        expect(result).toHaveLength(2); // Only brand links are returned
        expect(result[0].link).toBe('transformed_https://example.com/link1');
        expect(result[1].link).toBe('transformed_https://example.com/link2');
    });

    it('returns empty array if brand links and files links are empty', () => {
        const result = getBrandLinks([], []);

        expect(result).toHaveLength(0);
    });
});
