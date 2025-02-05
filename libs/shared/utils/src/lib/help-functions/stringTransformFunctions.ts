import { findBrackets, findDollar } from '../pattern-text/regExpText';
import { getUrlPattern } from '../pattern-validation/regexpForm';

export type MaskType = 'phoneNumber' | '';

export const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
};

export const replaceExtraBreakSpaces = (value: string) =>
    value.trimStart().replace(/\s+/g, ' ');

export const limitSymbols = (
    limit: number,
    value: string,
    threeDots?: boolean,
) =>
    `${value.slice(0, limit)}${threeDots && value.length > limit ? '...' : ''}`;

export const stringMask = (type: MaskType, value: string) => {
    switch (type) {
        case 'phoneNumber':
            return phoneNumberMask(value);
        default:
            return value;
    }
};

const phoneNumberMask = (value: string) => {
    const phoneNumber = limitSymbols(10, value.replace(/\D/g, ''));
    if (phoneNumber.length > 6)
        return (
            phoneNumber.slice(0, 2) +
            '-' +
            phoneNumber.slice(2, 6) +
            ' ' +
            phoneNumber.slice(6, 10)
        );
    if (phoneNumber.length > 2 && phoneNumber.length <= 6)
        return phoneNumber.slice(0, 2) + '-' + phoneNumber.slice(2, 6);
    return phoneNumber;
};

export const urlToDefaultFormat = (value: string) => {
    if (value.match(getUrlPattern())) {
        if (
            value.includes('http://') ||
            value.includes('https://') ||
            value.includes('HTTP://') ||
            value.includes('HTTPS://')
        )
            return value;
        return 'https://' + value;
    }
    return value;
};

export const formatTemplateToText = (value: string) => {
    return value.replace(findBrackets, '').replace(findDollar, '');
};

export const keyWordsReplacer = (
    value: string,
    keyWords: { [key: string]: string },
) => {
    const currentKeyWord =
        value.match(/\{.*}/g)?.[0].replace(/\{|}/g, '') || '';
    if (Object.keys(keyWords).some(item => item === currentKeyWord)) {
        return value.replace(
            '{' + currentKeyWord + '}',
            keyWords[currentKeyWord],
        );
    }
    return value;
};
