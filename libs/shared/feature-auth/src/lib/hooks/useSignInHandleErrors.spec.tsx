import { renderHook } from '@testing-library/react-hooks';
import { useSignInHandleErrors } from './useSignInHandleErrors';
import { LoginErrorType } from '../types/authFormTypes';
import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { mockConfiguredStore } from '../store/mockStore';
import { useAuthActions } from '../store/hook';

const mockSetSignInError = jest.fn();
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: { view: '' },
            asPath: '',
        };
    },
}));

jest.mock('../store/hook', () => ({
    useAuthActions: jest.fn(),
}));

beforeEach(() => {
    (useAuthActions as jest.Mock).mockImplementation(() => ({
        setSignInError: mockSetSignInError,
    }));
});

const wrapper = ({ children }: { children: ReactNode }) => {
    return <Provider store={mockConfiguredStore}>{children}</Provider>;
};

describe('useSignInHandleErrors', () => {
    it('should set form error and clear password when there is a backend error', () => {
        // prepare
        const fetchedError: LoginErrorType = {
            status: 400,
            data: {
                email: ['This field is required'],
                non_field_errors: ['Invalid credentials'],
                detail: 'Some detail error message',
            },
        };
        const setMethodsErrorMock = jest.fn();
        const setMethodsValueMock = jest.fn();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const methods: UseFormReturn = {
            setError: setMethodsErrorMock,
            setValue: setMethodsValueMock,
        };
        const redirectToMock = jest.fn();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        jest.spyOn(require('./useRedirectTo'), 'useRedirectTo').mockReturnValue(
            redirectToMock,
        );

        // execute
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renderHook(() => useSignInHandleErrors({ fetchedError, methods }), {
            wrapper,
        });

        // verify
        expect(mockSetSignInError).toBeCalledWith('This field is required');
    });
});
