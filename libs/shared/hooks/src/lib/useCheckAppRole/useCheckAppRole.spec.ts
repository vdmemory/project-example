import { renderHook } from '@testing-library/react-hooks';
import { useCheckAppRole } from './useCheckAppRole';

jest.mock('@breef/shared/data-access-auth', () => ({
    useLazyGetSelfQuery: () => [
        jest.fn().mockReturnValue({
            unwrap: jest.fn().mockResolvedValue({
                companyType: 'mockedCompanyType',
            }),
        }),
        { data: null, isError: false },
    ],
}));

jest.mock('@breef/shared/utils', () => ({
    redirectToAppByUserType: jest.fn(),
}));

describe('useCheckAppRole', () => {
    it('should check app role correctly', async () => {
        const { result } = renderHook(() =>
            useCheckAppRole({ userType: 'client' }),
        );

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isError).toBeFalsy();
        expect(result.current.isAnotherUserType).toBeNull();
        expect(result.current.userData).toBeNull();
    });

    it('should check app companyType !== userType', async () => {
        const { result } = renderHook(() =>
            useCheckAppRole({ userType: 'client' }),
        );

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isError).toBeFalsy();
        expect(result.current.isAnotherUserType).toBeNull();
        expect(result.current.userData).toBeNull();
    });
});
