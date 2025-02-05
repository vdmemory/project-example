/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    utmKeys,
    getUrlQueryParams,
    getPaymentIdFromUrl,
    getProjectIdFromUrl,
} from './getUrlParam';

describe('UTM Keys', () => {
    it('should contain the correct UTM keys', () => {
        const expectedKeys = [
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_content',
            'utm_term',
        ];
        expect(utmKeys).toEqual(expectedKeys);
    });
});

describe('getUrlQueryParams', () => {
    it('should return URL query params', () => {
        const mockUrl =
            'https://www.example.com/?utm_source=google&utm_medium=cpc';
        Object.defineProperty(window, 'location', {
            value: {
                href: mockUrl,
            },
            writable: true,
        });

        const queryParamsUtmOnly = getUrlQueryParams('utmOnly');
        expect(queryParamsUtmOnly).toEqual({
            utmSource: 'google',
            utmMedium: 'cpc',
        });

        const queryParamsAll = getUrlQueryParams(undefined);
        expect(queryParamsAll).toEqual({
            utmSource: 'google',
            utmMedium: 'cpc',
        });
    });
});

describe('getProjectIdFromUrl function', () => {
    let currentURL: string;

    beforeEach(() => {
        Object.defineProperty(global.document, 'URL', {
            get() {
                return currentURL;
            },
            set(newValue) {
                currentURL = newValue;
            },
            configurable: true,
        });
    });

    it('should return the project ID extracted from the URL', () => {
        // @ts-ignore
        global.document.URL = 'https://example.com/project/123';
        const projectId = getProjectIdFromUrl();
        expect(projectId).toBe('123');
    });

    it('should return the payment ID extracted from the URL', () => {
        // @ts-ignore
        global.document.URL = 'https://example.com/payment/123';
        const paymentId = getPaymentIdFromUrl();
        expect(paymentId).toBe('123');
    });

    it('should return null when URL does not contain payment ID', () => {
        // @ts-ignore
        global.document.URL = 'https://example.com/payment';
        const paymentId = getPaymentIdFromUrl();
        expect(paymentId).toBeNull();
    });

    it('should return null when URL does not contain project ID', () => {
        // @ts-ignore
        global.document.URL = 'https://example.com/project';
        const projectId = getProjectIdFromUrl();
        expect(projectId).toBeNull();
    });
});
