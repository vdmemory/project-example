/* eslint-disable @typescript-eslint/ban-ts-comment */
import { checkIsElemOverflowsOnElement } from './checkIsElemOverflowsOnElement';

describe('checkIsElemOverflowsOnElement', () => {
    let originalGetElementsByTagName: (
        tagName: string,
    ) => HTMLCollectionOf<Element>;
    let mockRefObject: { current: HTMLElement | null };

    beforeEach(() => {
        originalGetElementsByTagName = document.getElementsByTagName;
        // @ts-ignore
        document.getElementsByTagName = jest.fn(tagName => {
            if (tagName === 'footer') {
                return [{ scrollHeight: 50 }];
            } else if (tagName === 'body') {
                return [
                    {
                        getBoundingClientRect: jest.fn(() => ({
                            height: 100,
                            y: 0,
                        })),
                    },
                ];
            }
            return [];
        });
        mockRefObject = { current: document.createElement('div') };
    });

    afterEach(() => {
        document.getElementsByTagName = originalGetElementsByTagName;
    });

    it('returns true if the element overflows on the footer element', () => {
        // @ts-ignore
        mockRefObject.current.getBoundingClientRect = jest.fn(() => ({
            y: 90,
            height: 20,
        }));
        const result = checkIsElemOverflowsOnElement(mockRefObject);
        expect(result).toBeTruthy();
    });

    it('returns false if the element does not overflow on the footer element', () => {
        // @ts-ignore
        mockRefObject.current.getBoundingClientRect = jest.fn(() => ({
            y: 10,
            height: 20,
        }));
        const result = checkIsElemOverflowsOnElement(mockRefObject);
        expect(result).toBeFalsy();
    });

    it('returns false if refElem is not defined', () => {
        mockRefObject.current = null;
        const result = checkIsElemOverflowsOnElement(mockRefObject);
        expect(result).toBeFalsy();
    });
});
