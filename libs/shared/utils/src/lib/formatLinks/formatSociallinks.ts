import { otherLinkTitles, SocialDomainExamples } from '@breef/shared/constants';
import {
    findDefaultSocialLinkDomain,
    findFirstAt,
    findSpace,
} from '../pattern-text/regExpText';
import { getUrlPattern } from '../pattern-validation/regexpForm';

export const getTitleLink = ({
    title,
    link,
    defaultLinkTitles,
}: {
    title: string;
    link: string;
    defaultLinkTitles: string[];
}) => {
    if (defaultLinkTitles.includes(title)) {
        if (otherLinkTitles.includes(title)) {
            const urlPartsArray = link.split('/').filter(str => str);
            return `${urlPartsArray[urlPartsArray.length - 1].split('?')[0]}`;
        } else {
            return getProfileNameDisplay(link);
        }
    }
    return title;
};

export const getLink = ({
    title,
    link,
    defaultLinkTitles,
}: {
    title: string;
    link: string;
    defaultLinkTitles: string[];
}) => {
    if (!link) {
        return '';
    }
    if (
        defaultLinkTitles.includes(title) &&
        link.indexOf('@') !== -1 &&
        link.indexOf('www') === -1
    ) {
        return `https://www.${title.toLowerCase()}.com/${link}/`;
    }
    return addDefaultDomain(link);
};

export const getTitleOtherLink = ({
    title,
    link,
    defaultLinkTitles,
}: {
    title: string;
    link: string;
    defaultLinkTitles: string[];
}) => {
    if (defaultLinkTitles.includes(title)) {
        const parser = document.createElement('a');
        parser.href = link;
        return parser.hostname.replace('www.', '');
    }
    return title;
};

export const addDefaultDomain = (link: string) => {
    const url = link;
    const testUrl = link.replace(/\s/g, '');
    const urlPattern = getUrlPattern();

    if (urlPattern.test(testUrl)) {
        if (
            url.toLowerCase().includes('http://') ||
            url.toLowerCase().includes('https://')
        )
            return url;
        return 'https://' + url;
    }

    return url;
};

export const addSocialDomain = (title: string, link: string) => {
    if (findFirstAt.test(link)) {
        const profileName = link.replace(findFirstAt, '');
        if (
            SocialDomainExamples[
                title.toLowerCase() as keyof typeof SocialDomainExamples
            ]
        ) {
            return `${
                SocialDomainExamples[
                    title.toLowerCase() as keyof typeof SocialDomainExamples
                ]
            }${profileName}`;
        }
        return link;
    }
    return link;
};

export const getProfileNameDisplay = (link: string) => {
    const linkParts = link.split('/').filter(part => part);
    const matchStr = linkParts[linkParts.length - 1];
    const matchDefaultSocial = link.match(findDefaultSocialLinkDomain);
    const str =
        matchStr && matchDefaultSocial
            ? matchStr.replace(findFirstAt, '').toLowerCase()
            : '';

    return str ? `@${str}` : link;
};

export const removeSpaceSymbol = (link: string) => {
    return link.replace(findSpace, '');
};

export function calculationCharacterLength(length: number, title?: string) {
    if (!title) return length;
    const linksNames = Object.keys(SocialDomainExamples);

    const linksUrls: { [key: string]: number } = Object.entries(
        SocialDomainExamples,
    ).reduce((acc, [key, value]) => {
        return Object.assign(acc, { [key]: value.length });
    }, {});

    if (linksNames.includes(title)) {
        const lengthLink = linksUrls[title];
        return length - lengthLink;
    }

    return length;
}
