import { BrandLinksType, SocialLinks } from '@breef/shared/types';
import { urlToDefaultFormat } from './stringTransformFunctions';

export const updateLinksArray = (links: SocialLinks[] | BrandLinksType[]) => {
    if (!links) return [];
    return links.map(item => {
        if (item.link) item.link = urlToDefaultFormat(item.link);
        return item;
    });
};
