import { renderHook } from '@testing-library/react-hooks';
import { useSignInHandleSuccess } from './useSignInHandleSuccess';
import { useRedirectTo } from './useRedirectTo';
import React from 'react';

jest.mock('./useRedirectTo');

describe('useSignInHandleSuccess', () => {
    const methods = {
        reset: jest.fn(),
    };

    beforeAll(() => {
        jest.useFakeTimers();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should reset form data and redirect to success-reset on success find pass', () => {
        const isSuccessFindPass = true;
        const redirectTo = jest.fn();
        const resetFormData = jest.fn();
        const setTimeout = jest.spyOn(global, 'setTimeout');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        useRedirectTo.mockReturnValue(redirectTo);
        jest.spyOn(React, 'useCallback').mockReturnValue(resetFormData);

        renderHook(() =>
            useSignInHandleSuccess({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                methods,
                isSuccessFindPass,
            }),
        );

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);

        jest.runAllTimers();

        expect(resetFormData).toHaveBeenCalledTimes(1);
        expect(redirectTo).toHaveBeenCalledWith('success-reset', 'view');
    });

    it('should do nothing if isSuccessFindPass is false', () => {
        const isSuccessFindPass = false;
        const redirectTo = jest.fn();
        const resetFormData = jest.fn();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        useRedirectTo.mockReturnValue(redirectTo);
        jest.spyOn(React, 'useCallback').mockReturnValue(resetFormData);

        renderHook(() =>
            useSignInHandleSuccess({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                methods,
                isSuccessFindPass,
            }),
        );

        expect(setTimeout).not.toHaveBeenCalled();
        expect(resetFormData).not.toHaveBeenCalled();
        expect(redirectTo).not.toHaveBeenCalled();
    });
});
