import { useState } from 'react';
import {
    useLazyGetAccountInfoQuery,
    useLazyGetCompanyInfoQuery,
    useLazyGetTeamMembersQuery,
} from '@breef/shared/data-access-profile';
import { useLazyGetProjectByIdQuery } from '@breef/shared/data-access-project';
import {
    ProjectCreationStepsEnum,
    ProjectStatuses,
    PROJECTS_ROUTE,
    ProjectStep,
} from '@breef/shared/constants';
import { useProjectCreateActions } from '../store/hooks';
import { useRouteControl } from '@breef/shared/hooks';
import { getStepValueByKey } from '../utils/functions/getStep';
import { ProjectByIdType } from '@breef/shared/types';
import { toast } from 'react-toastify';

export const useFetchProjects = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { changePage, queryParams, clearHistoryQueryParamsBasePath } =
        useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || 0;
    const {
        unfilled_step: unfilledStepParam,
        current_step: currentStepParam,
        element_id: elementIdParam,
    } = queryParams as {
        unfilled_step: ProjectCreationStepsEnum;
        current_step: string;
        element_id: string;
    };

    const [getLazyProjectById, { data: projectData }] =
        useLazyGetProjectByIdQuery();

    const [getLazyUser] = useLazyGetAccountInfoQuery();
    const [getLazyCompany, { data: companyData }] =
        useLazyGetCompanyInfoQuery();
    const [getLazyTeamMembers] = useLazyGetTeamMembersQuery();

    const { setStep, setPenMode } = useProjectCreateActions();

    const checkIsNotAvailableFlow = (values: ProjectByIdType) => {
        return (
            (unfilledStepParam && values.unfilledStep !== unfilledStepParam) ||
            values.status !== ProjectStatuses.draft
        );
    };

    const initCreationStep = (
        stepKey: ProjectCreationStepsEnum,
        isStreamline?: boolean,
    ) => {
        if (isStreamline) {
            setStep({ step: ProjectStep.REVIEW });
            return;
        }

        if (currentStepParam && !elementIdParam) {
            setStep({ step: Number(currentStepParam) });
            return;
        }

        if (currentStepParam && elementIdParam) {
            setStep({ step: Number(currentStepParam) });
            setPenMode({
                isPenMode: true,
                targetElementId: elementIdParam,
            });
            return;
        }

        setStep({
            step:
                getStepValueByKey(unfilledStepParam) ||
                getStepValueByKey(stepKey) ||
                1,
        });
    };

    const getFetchData = async (isStreamline?: boolean) => {
        try {
            setIsLoading(true);
            if (projectId) {
                const result = await getLazyProjectById(projectId).unwrap();

                if (currentStepParam || unfilledStepParam) {
                    clearHistoryQueryParamsBasePath();
                }

                if (checkIsNotAvailableFlow(result)) {
                    changePage(PROJECTS_ROUTE);
                    return;
                }

                initCreationStep(result.step, isStreamline);
            }

            await getLazyUser({ companyType: 'client' }).unwrap();
            await getLazyCompany({ companyType: 'client' }).unwrap();
            await getLazyTeamMembers().unwrap();
        } catch (error) {
            const s404 = (error as { status: number })?.status === 404;
            const c403 = (error as { status: number })?.status === 403;
            if (s404 || c403) {
                toast.error('No permissions to view this page');
                changePage(PROJECTS_ROUTE);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getFetchData,
        isLoading,
        projectData,
        companyData,
    };
};
