/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAppType } from './getAppType'; // adjust the import based on your file structure
import router from 'next/router';

jest.mock('next/router', () => ({
    basePath: '/',
}));

describe('getAppType', () => {
    it('returns "client" when the basePath is "/client"', () => {
        router.basePath = '/client';
        expect(getAppType()).toEqual('client');
    });

    it('returns "agency" when the basePath is "/agency"', () => {
        router.basePath = '/agency';
        expect(getAppType()).toEqual('agency');
    });

    it('returns "public" as default for any other paths', () => {
        router.basePath = '/some-other-path';
        expect(getAppType()).toEqual('public');
    });

    it('returns "public" as default when basePath is undefined', () => {
        // @ts-ignore
        router.basePath = undefined;
        expect(getAppType()).toEqual('public');
    });
});
