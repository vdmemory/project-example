import moment from 'moment';
import { momentLanguages } from './listMomentLanguage';

export const initializeMomentLocale = (startDefault?: string) => {
    if (startDefault) {
        const existLocale = findLanguage([startDefault], momentLanguages);
        if (existLocale) return setLocaleToMoment(existLocale);
    }

    if (!startDefault) {
        const locales =
            (typeof window !== 'undefined' && window.navigator.languages) || [];
        const existLocale = findLanguage(locales, momentLanguages);
        if (existLocale) return setLocaleToMoment(existLocale);
    }

    return moment.locale('en');
};

export function getLocaleFile(locale: string) {
    require('moment/locale/' + locale);
}

export function findLanguage(
    incoming: string[] | readonly string[],
    current: string[],
) {
    let currentLocale = '';
    incoming?.forEach(locale => {
        const lowerCaseLocale = locale.toLowerCase();
        if (current.includes(lowerCaseLocale)) {
            currentLocale = lowerCaseLocale;
            return;
        }

        const shortLocale = lowerCaseLocale.split('-')[0];
        if (current.includes(shortLocale)) {
            currentLocale = shortLocale;
            return;
        }
    });
    return currentLocale;
}

export function setLocaleToMoment(locale: string) {
    try {
        getLocaleFile(locale);
        moment.locale(locale);
    } catch (error) {
        moment.locale('en');
    }
}
