// getSocialLink.test.ts
import { getSocialLink } from './helperFunction';
import { urlToDefaultFormat } from '@breef/shared/utils';

jest.mock('@breef/shared/utils', () => ({
    urlToDefaultFormat: jest.fn(url => url),
}));

describe('getSocialLink', () => {
    const mockSocialLinks = [
        { link: 'https://facebook.com/company', title: 'Facebook' },
        { link: 'https://twitter.com/company', title: 'Twitter' },
        { link: null, title: 'LinkedIn' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the formatted link if the title matches', () => {
        (urlToDefaultFormat as jest.Mock).mockImplementation(
            url => `formatted_${url}`,
        );

        const result = getSocialLink(mockSocialLinks, 'Facebook');
        expect(result).toBe('formatted_https://facebook.com/company');
        expect(urlToDefaultFormat).toHaveBeenCalledWith(
            'https://facebook.com/company',
        );
    });

    it('should return an empty string if the title does not match any link', () => {
        const result = getSocialLink(mockSocialLinks, 'Instagram');
        expect(result).toBe('');
        expect(urlToDefaultFormat).not.toHaveBeenCalled();
    });

    it('should return an empty string if the link is null', () => {
        const result = getSocialLink(mockSocialLinks, 'LinkedIn');
        expect(result).toBe('');
        expect(urlToDefaultFormat).not.toHaveBeenCalled();
    });

    it('should return an empty string if the socialLinks array is empty', () => {
        const result = getSocialLink([], 'Facebook');
        expect(result).toBe('');
        expect(urlToDefaultFormat).not.toHaveBeenCalled();
    });

    it('should return an empty string if the link is an empty string', () => {
        const customMockSocialLinks = [{ link: '', title: 'Facebook' }];
        const result = getSocialLink(customMockSocialLinks, 'Facebook');
        expect(result).toBe('');
        expect(urlToDefaultFormat).not.toHaveBeenCalled();
    });
});
