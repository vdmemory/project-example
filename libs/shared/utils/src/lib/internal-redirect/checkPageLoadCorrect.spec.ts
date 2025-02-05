/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/react';
import router from 'next/router';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { checkRedirectToErrorPage } from './checkPageLoadCorrect';
import { getIsInternalServerError } from '../help-functions/getIs500StatusCode';

jest.mock('next/router', () => ({
    replace: jest.fn(),
}));

jest.mock('../help-functions/getIs500StatusCode', () => ({
    getIsInternalServerError: jest.fn(),
}));

jest.mock('../help-functions/getIs404StatusCode', () => ({
    getIs404StatusCode: jest.fn(),
}));

describe('checkRedirectToErrorPage', () => {
    const mockApi: BaseQueryApi = {
        endpoint: 'mockEndpoint',
        // @ts-ignore
        abortController: new AbortController(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('redirects to 404 page if error status', async () => {
        const mockError: FetchBaseQueryError = {
            status: 404,
            data: null,
        };
        await checkRedirectToErrorPage(mockApi, mockError);
        expect(router.replace).not.toBeCalled();
    });

    it('redirects to 403 page if error status is 403 and endpoint is not in except403Endpoints', async () => {
        const mockError: FetchBaseQueryError = {
            status: 403,
            data: '',
        };
        await checkRedirectToErrorPage(mockApi, mockError);
        expect(router.replace).toHaveBeenCalledWith('/403');
    });

    it('does not redirect if error status is 403 and endpoint is in except403Endpoints', async () => {
        const mockError: FetchBaseQueryError = {
            status: 403,
            data: null,
        };
        await checkRedirectToErrorPage(
            { ...mockApi, endpoint: 'mockEndpoint' },
            mockError,
        );
        expect(router.replace).toHaveBeenCalled();
    });

    it('redirects to 500 page if error status is internal server error', async () => {
        const mockError: FetchBaseQueryError = {
            status: 'PARSING_ERROR',
            originalStatus: 500,
            data: '',
            error: '',
        };
        // @ts-ignore
        getIsInternalServerError.mockReturnValue(true);
        await checkRedirectToErrorPage(mockApi, mockError);
        expect(router.replace).toHaveBeenCalledWith('/500');
    });
});
