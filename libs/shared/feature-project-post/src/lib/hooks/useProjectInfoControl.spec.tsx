import { renderHook, act } from '@testing-library/react-hooks';
import { useProjectInfoControl } from './useProjectInfoControl';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { useRouteControl } from '@breef/shared/hooks';
import { useProjectPostSelector } from '../store/hooks';
import { PROJECTS_ROUTE } from '@breef/shared/constants';
import { useLazyGetProjectFromPostProjectQuery } from '@breef/shared/data-access-project';

jest.mock('@breef/shared/data-access-profile', () => ({
    useGetCompanyInfoQuery: jest.fn(),
}));

jest.mock('@breef/shared/data-access-project', () => ({
    useLazyGetProjectFromPostProjectQuery: jest.fn(),
}));

jest.mock('@breef/shared/hooks', () => ({
    useRouteControl: jest.fn(),
}));

jest.mock('../store/hooks', () => ({
    useProjectPostSelector: jest.fn(),
}));

describe('useProjectInfoControl', () => {
    const mockChangePage = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useRouteControl as jest.Mock).mockReturnValue({
            queryParams: { projectId: 1 },
            changePage: mockChangePage,
        });

        (useGetCompanyInfoQuery as jest.Mock).mockReturnValue({
            isSuccess: true,
            isLoading: false,
            data: { name: 'Test Company' },
        });

        const getProjectById = jest.fn();

        (useLazyGetProjectFromPostProjectQuery as jest.Mock).mockImplementation(
            () => [
                getProjectById,
                {
                    data: { status: 'draft' },
                    isLoading: false,
                },
            ],
        );

        (useProjectPostSelector as jest.Mock).mockReturnValue({
            projectPost: { couponInfo: { discount: 10 } },
        });
    });

    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => useProjectInfoControl());

        expect(result.current.loadingProject).toBe(false);
        // expect(result.current.projectPost).toEqual({
        //     projectInfo: { status: 'draft' },
        //     couponInfo: { discount: 10 },
        //     companyInfo: { name: 'Test Company' },
        // });
    });

    // it('should navigate to PROJECTS_ROUTE if project status is not draft', () => {
    //     const getProjectById = jest.fn();
    //     (useLazyGetProjectFromPostProjectQuery as jest.Mock).mockImplementation(
    //         () => [
    //             getProjectById,
    //             {
    //                 data: { status: 'completed' },
    //                 isLoading: false,
    //             },
    //         ],
    //     );

    //     renderHook(() => useProjectInfoControl());

    //     expect(mockChangePage).toHaveBeenCalledWith(PROJECTS_ROUTE);
    // });

    it('should handle loading state correctly', () => {
        (useGetCompanyInfoQuery as jest.Mock).mockReturnValueOnce({
            isSuccess: false,
            isLoading: true,
            data: null,
        });

        const getProjectById = jest.fn();
        (useLazyGetProjectFromPostProjectQuery as jest.Mock).mockImplementation(
            () => [
                getProjectById,
                {
                    data: null,
                    isLoading: true,
                },
            ],
        );

        const { result } = renderHook(() => useProjectInfoControl());

        expect(result.current.loadingProject).toBe(true);
    });
});
