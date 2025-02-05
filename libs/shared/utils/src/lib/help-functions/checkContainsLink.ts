import { containsUrlPattern } from '../pattern-validation/regexpForm';

export const checkContainsLink = (text: string) => {
    return !!text.match(containsUrlPattern);
};

export const getWarningLinkMessage = (text: string, message: string) => {
    if (checkContainsLink(text)) {
        return message;
    }
    return undefined;
};
