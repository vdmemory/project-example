/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirectToApp, redirectToAppByUserType } from './redirect';

describe('Redirection functionality', () => {
    const originalLocation = window.location;

    beforeEach(() => {
        // @ts-ignore
        delete window.location;
        // @ts-ignore
        window.location = { href: '' };
    });

    afterEach(() => {
        window.location = originalLocation;
    });

    it('should redirect the user to the provided URL', () => {
        const testUrl = 'http://example.com';
        redirectToApp(testUrl);
        expect(window.location.href).toBe(testUrl);
    });
});

describe('Redirection functionality', () => {
    let originalLocation: Location;

    beforeEach(() => {
        originalLocation = window.location;
        // @ts-ignore
        delete window.location;

        // @ts-ignore
        window.location = {
            href: '',
            assign: jest.fn(url => {
                // @ts-ignore
                window.location.href = url;
            }),
        };
    });

    afterEach(() => {
        window.location = originalLocation;
    });

    it('should redirect client user to client app with a specific route', () => {
        redirectToAppByUserType('client', '/dashboard');
        const href = window.location.href;
        const isTrue = href.includes('/dashboard');
        expect(isTrue).toBeTruthy();
    });
});
