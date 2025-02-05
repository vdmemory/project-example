import { FilesLinks, FileType } from '@breef/shared/types';

export const getFiles = (filesLinks: FilesLinks[]): FileType[] =>
    filesLinks.map(item => ({
        id: item.id,
        link: item.url,
        thumbnail: item.thumbnail_url,
        title: item.name,
    }));
