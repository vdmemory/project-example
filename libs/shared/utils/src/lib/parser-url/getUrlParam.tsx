import { getCamelCase } from '../adapters/getTransformCase';

export const utmKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
];

export const getUrlQueryParams = (prop: 'utmOnly' | undefined) => {
    const utmOnly = prop === 'utmOnly';
    const w = typeof window !== 'undefined' ? window : null;
    const url = w ? w.location.href : '';

    const params: { [x: string]: string } = {};
    (url + '?')
        .split('?')[1]
        .split('&')
        .forEach((pair: string | string[]) => {
            pair = (pair + '=').split('=').map(decodeURIComponent);

            if (pair[0].length && utmOnly && utmKeys.includes(pair[0])) {
                const keyParam = getCamelCase(pair[0]);
                params[keyParam] = pair[1];
            }
            if (pair[0].length && !utmOnly) {
                const keyParam = getCamelCase(pair[0]);
                params[keyParam] = pair[1];
            }
        });
    return params;
};

export const getPaymentIdFromUrl = () => {
    const url = document.URL;
    const parseData = url.match(/payment\/(\d+)/gm);
    if (parseData) {
        return parseData[0].split('/')[1];
    }
    return null;
};

export const getProjectIdFromUrl = () => {
    const url = document.URL;
    const parseData = url.match(/project\/(\d+)/gm);
    if (parseData) {
        return parseData[0].split('/')[1];
    }
    return null;
};
