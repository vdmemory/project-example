/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getHostName } from './getHostName';

describe('getHostName', () => {
    const originalWindow = { ...window };

    beforeAll(() => {
        // @ts-ignore
        delete global.window.location;
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                hostname: 'localhost',
            },
            writable: true,
        });
    });

    afterAll(() => {
        global.window = originalWindow;
    });

    it('returns "localhost:4200" for localhost', () => {
        const result = getHostName();

        expect(result).toBe('localhost:4200');
    });

    it('returns "https://example.com" for a custom hostname', () => {
        window.location.hostname = 'example.com';

        const result = getHostName();

        expect(result).toBe('https://example.com');
    });
});
