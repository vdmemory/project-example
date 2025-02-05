import {
    ProjectCreationStepsEnum,
    ProjectStatuses,
    PROJECTS_ROUTE,
    PROJECT_EDIT_ROUTE,
} from '@breef/shared/constants';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';
import { useLazyGetProjectFromPostProjectQuery } from '@breef/shared/data-access-project';
import { useRouteControl } from '@breef/shared/hooks';
import { useEffect, useState } from 'react';
import { useProjectPostSelector } from '../store/hooks';
import { toast } from 'react-toastify';

export const useProjectInfoControl = () => {
    const { changePage, queryParams, clearHistoryQueryParamsBasePath } =
        useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || -1;
    const { unfilled_step: unfilledStepParam } = queryParams;

    const [isLoadingScreen, setIsLoadingScreen] = useState(false);
    const { isLoading: isLoadingCompanyInfo } = useGetCompanyInfoQuery({
        companyType: 'client',
    });

    const {
        projectPost: { couponInfo },
    } = useProjectPostSelector(state => state);

    const [
        getProjectById,
        { data: projectInfo, isLoading: loadingGetProject },
    ] = useLazyGetProjectFromPostProjectQuery();

    const fetchProject = async () => {
        try {
            setIsLoadingScreen(true);

            const result = await getProjectById(projectId).unwrap();

            const isRedirectToDashboard =
                (unfilledStepParam &&
                    result?.unfilledStep !== unfilledStepParam) ||
                result?.status !== ProjectStatuses.draft;

            const projectUnavailable =
                result?.unfilledStep !== ProjectCreationStepsEnum.Post;

            clearHistoryQueryParamsBasePath();

            if (isRedirectToDashboard) {
                changePage(PROJECTS_ROUTE);
                return;
            }

            if (projectUnavailable) {
                changePage(PROJECT_EDIT_ROUTE.reverse({ projectId }) || '');
                return;
            }
        } catch (error) {
            const s404 = (error as { status: number })?.status === 404;
            const c403 = (error as { status: number })?.status === 403;
            if (s404 || c403) {
                toast.error('No permissions to view this page');
                changePage(PROJECTS_ROUTE);
            }
        } finally {
            setIsLoadingScreen(false);
        }
    };

    useEffect(() => {
        if (!projectId) return;
        fetchProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    const loadingProject =
        loadingGetProject || isLoadingCompanyInfo || isLoadingScreen;

    return {
        loadingProject,
        projectPost: {
            projectInfo,
            couponInfo,
        },
    };
};
