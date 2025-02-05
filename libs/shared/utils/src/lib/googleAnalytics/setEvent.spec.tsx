/* eslint-disable @typescript-eslint/ban-ts-comment */
import { googleAnalyticsEvent } from './setEvents';

describe('googleAnalyticsEvent', () => {
    let originalWindow: Window & typeof globalThis;
    let mockGtag: jest.Mock;

    beforeEach(() => {
        originalWindow = { ...window };
        mockGtag = jest.fn();
        // @ts-ignore
        window.gtag = mockGtag;
    });

    it('calls window.gtag when gtag is defined', () => {
        googleAnalyticsEvent();

        expect(mockGtag).toHaveBeenCalledTimes(1);
        expect(mockGtag).toHaveBeenCalledWith('event', 'conversion', {
            send_to: 'AW-829006948/t5ZBCI6xuPsBEOTIposD',
        });
    });
});
