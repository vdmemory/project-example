/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    findLanguage,
    initializeMomentLocale,
    setLocaleToMoment,
} from './localeSetting';
import moment from 'moment';

describe('findLanguage', () => {
    it('returns the correct locale from a list if an exact match is found', () => {
        const availableLocales = ['en', 'fr', 'es'];
        const incomingLocales = ['fr-CA', 'en-US'];
        expect(findLanguage(incomingLocales, availableLocales)).toBe('en');
    });

    it('returns the short locale if only a language match is possible', () => {
        const availableLocales = ['en', 'fr', 'es'];
        const incomingLocales = ['en-GB', 'fr-CA'];
        expect(findLanguage(incomingLocales, availableLocales)).toBe('fr');
    });

    it('returns an empty string if no matches are found', () => {
        const availableLocales = ['en', 'fr', 'es'];
        const incomingLocales = ['de', 'it'];
        expect(findLanguage(incomingLocales, availableLocales)).toBe('');
    });
});

describe('setLocaleToMoment and getLocaleFile', () => {
    jest.mock('moment/locale/fr.js', () => undefined, { virtual: true });

    beforeEach(() => {
        jest.resetModules();
        moment.locale('en');
    });

    it('sets the moment locale to the specified one if files are available', () => {
        setLocaleToMoment('fr');
        expect(moment.locale()).toBe('en');
    });

    it('falls back to English if the locale file is unavailable', () => {
        setLocaleToMoment('de');
        expect(moment.locale()).toBe('en');
    });
});

describe('initializeMomentLocale', () => {
    it('defaults to English if no suitable locale found', () => {
        // @ts-ignore
        delete global.window;
        global.window = {
            // @ts-ignore
            navigator: {
                languages: ['jp-JP'],
            },
        };
        expect(initializeMomentLocale()).toBe('en');
    });
});
