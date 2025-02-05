import { act } from '@testing-library/react-hooks';
import { useRouter } from 'next/router';
import { renderHook } from '@testing-library/react-hooks';
import { useRedirectTo } from './useRedirectTo';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('useRedirectTo', () => {
    it('should return a function', () => {
        (useRouter as jest.Mock).mockReturnValueOnce({
            pathname: '/mocked-pathname',
        });
        const { result } = renderHook(() => useRedirectTo());
        expect(typeof result.current).toBe('function');
    });

    it('should trigger the router push method with the correct arguments when queryParamValue is falsy', () => {
        const pushMock = jest.fn(() => Promise.resolve(null));
        (useRouter as jest.Mock).mockReturnValueOnce({
            pathname: '/mocked-pathname',
            push: pushMock,
            query: {},
        });
        const { result } = renderHook(() => useRedirectTo());
        act(() => {
            result.current('');
        });
        expect(pushMock).toHaveBeenCalledWith(
            { pathname: '/mocked-pathname' },
            undefined,
            {
                shallow: true,
            },
        );
    });

    it('should trigger the router push method with the correct arguments when queryParamValue is truthy', () => {
        const pushMock = jest.fn(() => Promise.resolve(null));
        (useRouter as jest.Mock).mockReturnValueOnce({
            pathname: '/mocked-pathname',
            push: pushMock,
        });
        const { result } = renderHook(() => useRedirectTo());
        act(() => {
            result.current('queryParamValue', 'queryParamName');
        });
        expect(pushMock).toHaveBeenCalledWith(
            {
                pathname: '/mocked-pathname',
                query: { queryParamName: 'queryParamValue' },
            },
            undefined,
            {
                shallow: true,
            },
        );
    });
});
