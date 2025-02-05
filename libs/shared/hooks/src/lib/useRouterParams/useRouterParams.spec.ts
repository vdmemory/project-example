import { renderHook } from '@testing-library/react-hooks';
import { useRouterParams } from './useRouterParams';

jest.mock('next/router', () => ({
    useRouter: () => ({
        pathname: '/example/path',
        query: {
            stepper: '1',
            step: '2',
            success: 'true',
            viewType: 'list',
        },
    }),
}));

describe('useRouterParams', () => {
    it('should return an object with the router information', () => {
        const { result } = renderHook(() => useRouterParams());

        expect(result.current).toEqual({
            router: expect.any(Object),
            routerRef: expect.any(Object),
            query: {
                stepper: '1',
                step: '2',
                success: 'true',
                viewType: 'list',
            },
            pathname: '/example/path',
        });
    });
});
