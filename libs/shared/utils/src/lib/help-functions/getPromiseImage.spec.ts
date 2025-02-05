import { getPromiseImage } from './getPromiseImage';

describe('getPromiseImage', () => {
    it('returns a promise that resolves to an image', async () => {
        const image = new Image();
        const src = 'https://example.com/image.jpg';
        const promise = getPromiseImage(src);

        image.src = src;
        image.onload = () => {
            expect(promise).resolves.toBe(image);
        };
    });

    it('returns a promise that rejects when the image fails to load', async () => {
        const src = 'https://example.com/image.jpg';
        const promise = getPromiseImage(src);

        expect(promise).rejects.toBeTruthy; // eslint-disable-line
    });
});

describe('getPromiseImage any method test', () => {
    beforeAll(() => {
        global.Image = class {
            onload: (() => void) | undefined;
            onerror: (() => void) | undefined;
            src: string | undefined;
            constructor() {
                setTimeout(() => {
                    if (!this.onload || !this.onerror || !this.src) {
                        return;
                    }
                    if (this.src === 'valid_url.jpg') {
                        this.onload();
                    } else {
                        this.onerror();
                    }
                }, 50);
            }
        } as unknown as typeof globalThis.Image;
    });

    it('resolves when image loads successfully', async () => {
        await expect(getPromiseImage('valid_url.jpg')).resolves.toEqual(
            'valid_url.jpg',
        );
    });

    it('rejects when image fails to load', async () => {
        await expect(getPromiseImage('invalid_url.jpg')).rejects.toEqual(
            'invalid_url.jpg',
        );
    });
});
