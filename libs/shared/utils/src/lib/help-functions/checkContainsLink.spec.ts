import { checkContainsLink, getWarningLinkMessage } from './checkContainsLink';

describe('checkContainsLink', () => {
    it('returns true if the text contains a URL', () => {
        const textWithUrl = 'This is a text with a URL: https://example.com';
        const result = checkContainsLink(textWithUrl);
        expect(result).toBe(true);
    });

    it('returns false if the text does not contain a URL', () => {
        const textWithoutUrl = 'This is a text without a URL';
        const result = checkContainsLink(textWithoutUrl);
        expect(result).toBe(false);
    });

    it('returns false if the text is empty', () => {
        const emptyText = '';
        const result = checkContainsLink(emptyText);
        expect(result).toBe(false);
    });
});

describe('getWarningLinkMessage', () => {
    it('returns the message if the text contains a URL', () => {
        const textWithUrl = 'This is a text with a URL: https://example.com';
        const message = 'Warning: Contains a link';
        const result = getWarningLinkMessage(textWithUrl, message);
        expect(result).toBe(message);
    });

    it('returns undefined if the text does not contain a URL', () => {
        const textWithoutUrl = 'This is a text without a URL';
        const message = 'Warning: Contains a link';
        const result = getWarningLinkMessage(textWithoutUrl, message);
        expect(result).toBeUndefined();
    });

    it('returns undefined if the text is empty', () => {
        const emptyText = '';
        const message = 'Warning: Contains a link';
        const result = getWarningLinkMessage(emptyText, message);
        expect(result).toBeUndefined();
    });
});
