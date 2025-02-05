import { BrandLinksType, FilesLinks } from '@breef/shared/types';
import { urlToDefaultFormat } from './stringTransformFunctions';

export const getBrandLinks = (
    links: BrandLinksType[],
    files?: FilesLinks[],
) => {
    const brandLinks = links.map(item => ({
        id: item.id,
        link: urlToDefaultFormat(item.link),
        title: item.title,
        type: 'link',
    }));
    const brandFiles = files
        ? files.map(item => ({
              id: item.id,
              link: item.url,
              thumbnail: item.thumbnail_url,
              title: item.name,
              type: 'file',
          }))
        : [];
    return [...brandLinks, ...brandFiles];
};
