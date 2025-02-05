import { getFiles } from './getFiles';

describe('getFiles', () => {
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

    it('transforms FilesLinks objects into FileType objects', () => {
        const result = getFiles(filesLinksMock);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
            id: 1,
            link: 'https://example.com/file1',
            thumbnail: 'thumbnail1.jpg',
            title: 'File 1',
        });
        expect(result[1]).toEqual({
            id: 2,
            link: 'https://example.com/file2',
            thumbnail: 'thumbnail2.jpg',
            title: 'File 2',
        });
    });

    it('returns an empty array if filesLinks array is empty', () => {
        const result = getFiles([]);
        expect(result).toHaveLength(0);
    });
});
