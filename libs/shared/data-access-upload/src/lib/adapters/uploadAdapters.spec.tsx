import {
    prepareCreateObjectData,
    transformCreateObjectFilesData,
} from './uploadAdapters';

describe('prepareCreateObjectData', () => {
    it('prepareCreateObjectData should return correct value', () => {
        const values = {
            name: 'object name',
        };

        const result = prepareCreateObjectData(values);
        expect(result).toEqual([
            {
                name: 'object name',
            },
        ]);
    });
});

describe('transformCreateObjectFilesData', () => {
    it('transformCreateObjectFilesData should return correct value', () => {
        const values = [
            {
                id: 25,
                name: 'name',
                upload_url: 'url.com',
                read_url: 'read.com',
                thumbnail_url: 'thumbnail.com',
            },
            {
                id: 29,
                name: 'name-1',
                upload_url: 'url-1.com',
                read_url: 'read-1.com',
                thumbnail_url: 'thumbnail-1.com',
            },
        ];

        const result = transformCreateObjectFilesData(values);
        expect(result).toEqual({
            id: 25,
            name: 'name',
            uploadUrl: 'url.com',
            readUrl: 'read.com',
            thumbnail: 'thumbnail.com',
        });
    });

    it('transformCreateObjectFilesData should return correct value with optional property', () => {
        const values = [
            {
                id: 25,
                name: 'name',
                upload_url: 'url.com',
                read_url: 'read.com',
            },
        ];

        const result = transformCreateObjectFilesData(values);
        expect(result).toEqual({
            id: 25,
            name: 'name',
            uploadUrl: 'url.com',
            readUrl: 'read.com',
            thumbnail: undefined,
        });
    });
});
