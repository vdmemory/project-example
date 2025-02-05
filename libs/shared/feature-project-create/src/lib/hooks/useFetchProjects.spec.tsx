import { act, renderHook } from '@testing-library/react-hooks';
import { useFetchProjects } from './useFetchProjects';
import {
    useLazyGetAccountInfoQuery,
    useLazyGetCompanyInfoQuery,
    useLazyGetTeamMembersQuery,
} from '@breef/shared/data-access-profile';
import { useLazyGetProjectByIdQuery } from '@breef/shared/data-access-project';
import { useProjectCreateActions } from '../store/hooks';
import { useRouteControl } from '@breef/shared/hooks';
import {
    ProjectCreationStepsEnum,
    ProjectStatuses,
    PROJECTS_ROUTE,
    ProjectStep,
} from '@breef/shared/constants';
import { toast } from 'react-toastify';

jest.mock('@breef/shared/data-access-profile');
jest.mock('@breef/shared/data-access-project');
jest.mock('../store/hooks');
jest.mock('@breef/shared/hooks');
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

const setStepMock = jest.fn();
const setPenModeMock = jest.fn();
const changePageMock = jest.fn();
const clearHistoryQueryParamsBasePathMock = jest.fn();

(useProjectCreateActions as jest.Mock).mockReturnValue({
    setStep: setStepMock,
    setPenMode: setPenModeMock,
});

(useRouteControl as jest.Mock).mockReturnValue({
    changePage: changePageMock,
    queryParams: { projectId: 1 },
    clearHistoryQueryParamsBasePath: clearHistoryQueryParamsBasePathMock,
});

const projectData = {
    step: ProjectCreationStepsEnum.ProjectScope,
    unfilledStep: ProjectCreationStepsEnum.ProjectScope,
    status: ProjectStatuses.draft,
};

describe('useFetchProjects', () => {
    beforeEach(() => {
        (useLazyGetProjectByIdQuery as jest.Mock).mockReturnValue([
            jest.fn(() => ({
                unwrap: jest.fn().mockResolvedValue(projectData),
            })),
            { data: projectData },
        ]);

        (useLazyGetAccountInfoQuery as jest.Mock).mockReturnValue([
            jest.fn(() => ({ unwrap: jest.fn().mockResolvedValue({}) })),
        ]);

        (useLazyGetCompanyInfoQuery as jest.Mock).mockReturnValue([
            jest.fn(() => ({ unwrap: jest.fn().mockResolvedValue({}) })),
            { data: {} },
        ]);

        (useLazyGetTeamMembersQuery as jest.Mock).mockReturnValue([
            jest.fn(() => ({ unwrap: jest.fn().mockResolvedValue({}) })),
        ]);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch project data and initialize steps correctly', async () => {
        const { result } = renderHook(() => useFetchProjects());

        await act(async () => {
            await result.current.getFetchData();
        });

        expect(setStepMock).toHaveBeenCalledWith({ step: 1 });
        expect(result.current.isLoading).toBe(false);
        expect(result.current.projectData).toEqual(projectData);
    });

    it('should handle errors and redirect on 404 or 403 status', async () => {
        const error = { status: 404 };

        (useLazyGetProjectByIdQuery as jest.Mock).mockReturnValue([
            jest.fn(() => ({
                unwrap: jest.fn().mockRejectedValue(error),
            })),
            { data: null },
        ]);

        const { result } = renderHook(() => useFetchProjects());

        await act(async () => {
            await result.current.getFetchData();
        });

        expect(toast.error).toHaveBeenCalledWith(
            'No permissions to view this page',
        );
        expect(changePageMock).toHaveBeenCalledWith(PROJECTS_ROUTE);
    });

    it('should initialize with pen mode if currentStepParam and elementIdParam are provided', async () => {
        (useRouteControl as jest.Mock).mockReturnValue({
            changePage: changePageMock,
            queryParams: {
                projectId: 1,
                current_step: '2',
                element_id: 'element-id',
            },
            clearHistoryQueryParamsBasePath:
                clearHistoryQueryParamsBasePathMock,
        });

        const { result } = renderHook(() => useFetchProjects());

        await act(async () => {
            await result.current.getFetchData();
        });

        expect(setStepMock).toHaveBeenCalledWith({ step: 2 });
        expect(setPenModeMock).toHaveBeenCalledWith({
            isPenMode: true,
            targetElementId: 'element-id',
        });
        expect(result.current.isLoading).toBe(false);
    });

    it('should handle streamline flow correctly', async () => {
        const { result } = renderHook(() => useFetchProjects());

        await act(async () => {
            await result.current.getFetchData(true);
        });

        expect(setStepMock).toHaveBeenCalledWith({ step: ProjectStep.REVIEW });
        expect(result.current.isLoading).toBe(false);
    });
});
