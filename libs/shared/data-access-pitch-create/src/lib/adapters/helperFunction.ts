import { urlToDefaultFormat } from '@breef/shared/utils';

export const getSocialLink = (
    socialLinks: {
        link: string | null;
        title: string;
    }[],
    title: string,
) => {
    const link = socialLinks.find(item => item.title === title)?.link || '';
    return link ? urlToDefaultFormat(link) : '';
};
