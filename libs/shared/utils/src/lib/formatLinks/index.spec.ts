import { SocialLinks } from '@breef/shared/types';
import {
    getTitleLink,
    getLink,
    getTitleOtherLink,
    addDefaultDomain,
    addSocialDomain,
    getProfileNameDisplay,
    removeSpaceSymbol,
    calculationCharacterLength,
} from './formatSociallinks';

import { replaceSocialLinks } from './replaceSocialLink';

describe('getTitleLink', () => {
    it('should return the title if not in defaultLinkTitles', () => {
        const title = 'Some title';
        const link = 'https://example.com';
        const defaultLinkTitles = ['Instagram', 'Twitter'];

        const result = getTitleLink({ title, link, defaultLinkTitles });

        expect(result).toEqual(title);
    });

    it('should return the profile name if in defaultLinkTitles', () => {
        const title = 'Twitter';
        const link = 'https://twitter.com/user123';
        const defaultLinkTitles = ['Twitter'];

        const result = getTitleLink({ title, link, defaultLinkTitles });

        expect(result).toEqual('@user123');
    });
});

describe('getLink', () => {
    it('should return the link if not in defaultLinkTitles', () => {
        const title = 'Not a default title';
        const link = 'https://example.com';
        const defaultLinkTitles = ['Instagram'];

        const result = getLink({ title, link, defaultLinkTitles });

        expect(result).toEqual(link);
    });

    it('should add default domain if link is a profile name', () => {
        const title = 'Twitter';
        const link = '@user123';
        const defaultLinkTitles = ['Twitter'];

        const result = getLink({ title, link, defaultLinkTitles });

        expect(result).toEqual('https://www.twitter.com/@user123/');
    });

    it('should add default domain if link is empty', () => {
        const title = 'Twitter';
        const link = '';
        const defaultLinkTitles = ['Twitter'];

        const result = getLink({ title, link, defaultLinkTitles });

        expect(result).toEqual('');
    });
});

describe('getTitleOtherLink', () => {
    it('should return the title if not in defaultLinkTitles', () => {
        const title = 'Not a default title';
        const link = 'https://example.com';
        const defaultLinkTitles = ['Instagram'];

        const result = getTitleOtherLink({ title, link, defaultLinkTitles });

        expect(result).toEqual(title);
    });

    it('should return the domain name if in defaultLinkTitles', () => {
        const title = 'Facebook';
        const link = 'https://www.facebook.com/page123';
        const defaultLinkTitles = ['Facebook'];

        const result = getTitleOtherLink({ title, link, defaultLinkTitles });

        expect(result).toEqual('facebook.com');
    });
});

describe('addDefaultDomain', () => {
    it('should add "https://" if missing and url is valid', () => {
        const link = 'example.com';

        const result = addDefaultDomain(link);

        expect(result).toEqual('https://example.com');
    });

    it('should not modify url if "http://" or "https://" already present', () => {
        const link = 'http://example.com';

        const result = addDefaultDomain(link);

        expect(result).toEqual(link);
    });

    it('should not modify url if "ftp://" or "ftp://" already present', () => {
        const link = '//ftp://www.example.com';

        const result = addDefaultDomain(link);

        expect(result).toEqual(link);
    });
});

describe('addSocialDomain', () => {
    it('should add social domain if link starts with "@"', () => {
        const title = 'Twitter';
        const link = '@user123';

        const result = addSocialDomain(title, link);

        expect(result).toEqual('https://www.twitter.com/user123');
    });

    it('should not modify link if it does not start with "@"', () => {
        const title = 'Twitter';
        const link = 'https://twitter.com/user123';

        const result = addSocialDomain(title, link);

        expect(result).toEqual(link);
    });

    it('should not modify link if it does start with "@"', () => {
        const title = 'Google';
        const link = 'https://google.com/user123';

        const result = addSocialDomain(title, link);

        expect(result).toEqual(link);
    });
});

describe('getProfileNameDisplay', () => {
    it('should return the profile name with an "@" symbol', () => {
        const link = 'https://www.instagram.com/johndoe/';
        expect(getProfileNameDisplay(link)).toBe('@johndoe');
    });

    it('should return the original link if the profile name cannot be extracted', () => {
        const link = 'https://www.google.com/';
        expect(getProfileNameDisplay(link)).toBe(link);
    });

    it('should return the original link if the link is not for a social media platform', () => {
        const link = 'https://www.example.com/johndoe';
        expect(getProfileNameDisplay(link)).toBe(link);
    });
});

describe('removeSpaceSymbol', () => {
    it('should remove any space symbols from the input string', () => {
        const link = 'https://www.example.com/john doe';
        expect(removeSpaceSymbol(link)).toBe('https://www.example.com/johndoe');
    });

    it('should return the original string if there are no space symbols', () => {
        const link = 'https://www.example.com/johndoe';
        expect(removeSpaceSymbol(link)).toBe(link);
    });
});

describe('replaceSocialLinks', () => {
    it('should return default social links when socialLink is empty', () => {
        const socialLinks = [] as SocialLinks[];
        expect(replaceSocialLinks({ socialLink: socialLinks })).toEqual([
            {
                title: 'tiktok',
                link: '',
            },
            {
                title: 'twitter',
                link: '',
            },
            {
                title: 'instagram',
                link: '',
            },
        ]);
    });

    it('should return social links with links replaced when socialLink contains valid links', () => {
        const socialLinks = [
            {
                title: 'tiktok',
                link: 'https://www.tiktok.com/',
            },
            {
                title: 'twitter',
                link: 'https://www.twitter.com/',
            },
            {
                title: 'instagram',
                link: 'https://www.instagram.com/',
            },
        ];
        expect(replaceSocialLinks({ socialLink: socialLinks })).toEqual([
            {
                title: 'instagram',
                link: 'https://www.instagram.com/',
            },
            {
                title: 'tiktok',
                link: 'https://www.tiktok.com/',
            },
            {
                title: 'twitter',
                link: 'https://www.twitter.com/',
            },
        ]);
    });

    it('should return social links with missing links replaced with empty strings', () => {
        const socialLinks = [
            {
                title: 'tiktok',
                link: 'https://www.tiktok.com/',
            },
            {
                title: 'twitter',
            },
            {
                title: 'instagram',
                link: 'https://www.instagram.com/',
            },
        ] as SocialLinks[];
        expect(replaceSocialLinks({ socialLink: socialLinks })).toEqual([
            {
                title: 'instagram',
                link: 'https://www.instagram.com/',
            },
            {
                title: 'tiktok',
                link: 'https://www.tiktok.com/',
            },
            {
                title: 'twitter',
                link: '',
            },
        ]);
    });
});

describe('calculationCharacterLength function', () => {
    it('should return the same length if title is not provided', () => {
        const result = calculationCharacterLength(10);
        expect(result).toBe(10);
    });

    it('should subtract the length of a specific title from the total length', () => {
        const title = 'twitter';
        const length = 30;

        const result = calculationCharacterLength(length, title);
        expect(result).toBe(6);
    });

    it('should return the same length if the title is not present in the SocialDomainExamples list', () => {
        const title = 'youtube';
        const length = 15;

        const result = calculationCharacterLength(length, title);
        expect(result).toBe(15);
    });
});
