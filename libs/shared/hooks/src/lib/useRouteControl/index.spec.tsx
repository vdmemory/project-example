import { renderHook, act } from '@testing-library/react-hooks';
import { useRouteControl } from './useRouteControl';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
    useRouter() {
        return {
            pathname: '/example',
            push: mockPush,
        };
    },
}));

describe('useRouteControl', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('changeQueryParams should update query parameters and call router.push', async () => {
        const { result } = renderHook(() => useRouteControl());

        const queryParamsToUpdate = { page: 2, filter: 'profile' };
        await act(async () => {
            await result.current.changeQueryParams(queryParamsToUpdate);
        });

        expect(mockPush).toHaveBeenCalledWith(
            {
                pathname: '/example',
                query: { ...queryParamsToUpdate },
            },
            undefined,
            { shallow: true },
        );
    });

    it('changePage should call router.push with the given path', async () => {
        const { result } = renderHook(() => useRouteControl());

        const pathToUpdate = '/new-example';
        await act(async () => {
            await result.current.changePage(pathToUpdate);
        });

        expect(mockPush).toHaveBeenCalledWith(pathToUpdate, undefined, {
            shallow: true,
        });
    });
});
