import {
    checkProfileNameInSocial,
    findBrackets,
    findDefaultSocialLinkDomain,
    findDollar,
    findFirstAt,
    findProfileNameInSocial,
    findQuestionMark,
    findSlash,
    findSpace,
    findSpecialCharacters,
    matchTextByCurlyBrackets,
    normalizingString,
    splitTextByCurlyBrackets,
} from './regExpText';

describe('matchTextByCurlyBrackets', () => {
    it('matches multiple instances of text inside curly brackets and words', () => {
        const text =
            'This is {some} text with {multiple} instances {of} {text} inside curly brackets.';
        const matches = text.match(matchTextByCurlyBrackets);
        expect(matches).toEqual([
            'This is ',
            '{some}',
            ' text with ',
            '{multiple}',
            ' instances ',
            '{of}',
            ' ',
            '{text}',
            ' inside curly brackets.',
        ]);
    });
    it('matches text without inside curly brackets and words', () => {
        const text =
            'This is some text with hyphens and periods, like this-example and that.thing!';
        const matches = text.match(matchTextByCurlyBrackets);
        expect(matches).toEqual([
            'This is some text with hyphens and periods, like this-example and that.thing!',
        ]);
    });
});

describe('splitTextByCurlyBrackets', () => {
    it('splits text with multiple instances of curly brackets', () => {
        const text =
            'This is {some} text with {multiple} instances {of} {text} inside curly brackets.';
        const splitText = text.split(splitTextByCurlyBrackets);
        expect(splitText).toEqual([
            'This is ',
            'some',
            ' text with ',
            'multiple',
            ' instances ',
            'of',
            ' ',
            'text',
            ' inside curly brackets.',
        ]);
    });
    it('matches text without inside curly brackets and words', () => {
        const text =
            'This is some text with hyphens and periods, like this-example and that.thing!';
        const splitText = text.split(splitTextByCurlyBrackets);
        expect(splitText).toEqual([
            'This is some text with hyphens and periods, like this-example and that.thing!',
        ]);
    });
});

describe('findBrackets', () => {
    it('matches closing curly brackets', () => {
        const text = 'This is some {text} inside curly brackets.';
        const matches = text.match(findBrackets);
        expect(matches).toEqual(['{', '}']);
    });
});

describe('findDollar', () => {
    it('matches single dollar sign', () => {
        const text = 'This is a {$test} sign.';
        const matches = text.match(findDollar);
        expect(matches).toEqual(['$']);
    });
});

describe('normalizingString', () => {
    it('matches dollar symbol, opening and closing curly brackets', () => {
        const text = 'This is some {$text} inside curly brackets.';
        const normalizedText = text.replace(normalizingString, '');
        expect(normalizedText).toEqual(
            'This is some text inside curly brackets.',
        );
    });
});

describe('findFirstAt', () => {
    it('matches "@" at the beginning of a string', () => {
        const input = '@username';
        const match = input.match(findFirstAt);
        expect(match).toBeTruthy();
        expect(match?.[0]).toBe('@');
    });
});

describe('findProfileNameInSocial', () => {
    it('matches a profile name with an "@" in a social media URL', () => {
        const input = 'https://www.instagram.com/@username';
        const match = input.match(findProfileNameInSocial);
        expect(match).toBeTruthy();
        expect(match?.[0]).toBe('com/@username');
    });
});

describe('findDefaultSocialLinkDomain', () => {
    it('matches default Twitter domain', () => {
        const input = 'https://twitter.com/username';
        const match = input.match(findDefaultSocialLinkDomain);
        expect(match).toBeTruthy();
        expect(match?.[0]).toBe('twitter.com');
    });

    it('matches default TikTok domain', () => {
        const input = 'https://www.tiktok.com/@username';
        const match = input.match(findDefaultSocialLinkDomain);
        expect(match).toBeTruthy();
        expect(match?.[0]).toBe('tiktok.com');
    });

    it('matches default Instagram domain', () => {
        const input = 'https://www.instagram.com/user.name';
        const match = input.match(findDefaultSocialLinkDomain);
        expect(match).toBeTruthy();
        expect(match?.[0]).toBe('instagram.com');
    });
});

describe('checkProfileNameInSocial', () => {
    it('matches a profile name with letters, dots, and numbers', () => {
        const input = 'user.name123';
        const match = input.match(checkProfileNameInSocial);

        expect(match).toBeTruthy();
        expect(match?.[0]).toBe('user.name123');
    });

    it('does not match a profile name with spaces', () => {
        const input = 'user name';
        const match = input.match(checkProfileNameInSocial);

        expect(match).toBeNull();
    });
});

describe('findSlash regular expression', () => {
    it('should match a string with a single forward slash', () => {
        const input = 'hello/world';
        expect(input.match(findSlash)).toEqual(['/']);
    });
});

describe('findQuestionMark regular expression', () => {
    it('should match a string with a single question mark', () => {
        const input = 'https://www.example.com/page?param=value';
        expect(input.match(findQuestionMark)).toEqual(['?param=value']);
    });

    it('should match a string with multiple question marks', () => {
        const input =
            'https://www.example.com/page?param1=value1&param2=value2';
        expect(input.match(findQuestionMark)).toEqual([
            '?param1=value1&param2=value2',
        ]);
    });

    it('should not match a string without any question marks', () => {
        const input = 'https://www.example.com/page';
        expect(input.match(findQuestionMark)).toBeNull();
    });
});

describe('findSpace regular expression', () => {
    it('should match a string with a single space', () => {
        const input = 'hello world';
        expect(input.match(findSpace)).toEqual([' ']);
    });
    it('should not match a string without any spaces', () => {
        const input = 'helloworld';
        expect(input.match(findSpace)).toBeNull();
    });
});

describe('findSpecialCharacters', () => {
    it('should match all special characters', () => {
        const regex = findSpecialCharacters;
        const str1 = 'This string has !@#$ special characters';
        const str2 = 'Would you look at that!! @This #is $cool! :)';
        const str3 = '|test|me|\\';

        expect(str1.match(regex)).toEqual(['!', '@', '#', '$']);
        expect(str2.match(regex)).toEqual([
            '!',
            '!',
            '@',
            '#',
            '$',
            '!',
            ':',
            ')',
        ]);
        expect(str3.match(regex)).toEqual(['|', '|', '|', '\\']);
    });

    it('should not match any regular characters', () => {
        const regex = findSpecialCharacters;
        const str1 =
            'Hey this is a regular string with no special characters 123 __ --';

        expect(str1.match(regex)).toBe(null);
    });
});
