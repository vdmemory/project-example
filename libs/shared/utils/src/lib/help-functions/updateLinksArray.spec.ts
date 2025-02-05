/* eslint-disable @typescript-eslint/ban-ts-comment */
import { updateLinksArray } from './updateLinksArray';
import { urlToDefaultFormat } from './stringTransformFunctions';

describe('updateLinksArray', () => {
    const mockSocialLinks = [
        { title: 'Facebook', link: 'https://www.facebook.com' },
        { title: 'Twitter', link: 'https://www.twitter.com' },
        { title: 'Instagram', link: 'https://www.instagram.com' },
    ];

    const mockBrandLinks = [
        { id: 1, title: 'Website', link: 'https://www.example.com' },
        { id: 2, title: 'Blog', link: '' }, // Link is empty
        { id: 3, title: 'Shop', link: 'https://www.shop.com' },
    ];

    it('updates social links array with default format URLs', () => {
        const updatedSocialLinks = updateLinksArray(mockSocialLinks);

        expect(updatedSocialLinks).toEqual([
            {
                title: 'Facebook',
                link: urlToDefaultFormat('https://www.facebook.com'),
            },
            {
                title: 'Twitter',
                link: urlToDefaultFormat('https://www.twitter.com'),
            },
            {
                title: 'Instagram',
                link: urlToDefaultFormat('https://www.instagram.com'),
            },
        ]);
    });

    it('updates brand links array with default format URLs', () => {
        const updatedBrandLinks = updateLinksArray(mockBrandLinks);

        expect(updatedBrandLinks).toEqual([
            {
                id: 1,
                title: 'Website',
                link: urlToDefaultFormat('https://www.example.com'),
            },
            { id: 2, title: 'Blog', link: '' }, // Link remains empty
            {
                id: 3,
                title: 'Shop',
                link: urlToDefaultFormat('https://www.shop.com'),
            },
        ]);
    });

    it('returns an empty array if input array is empty', () => {
        const updatedLinks = updateLinksArray([]);
        expect(updatedLinks).toEqual([]);
    });

    it('returns an null if input array is empty', () => {
        // @ts-ignore
        const updatedLinks = updateLinksArray(null);
        expect(updatedLinks).toEqual([]);
    });
});
