import {
    AUTH_FRONT_APP_URL,
    GENERAL_ERROR_MESSAGE,
    LOGIN_FORM,
    ProjectCreationStepsEnum,
    ProjectStep,
    PROJECT_EDIT_ROUTE,
} from '@breef/shared/constants';
import {
    useLazyGetSelfQuery,
    useLoginGoogleMutation,
    useLoginMutation,
} from '@breef/shared/data-access-auth';
import { useLazyGetStreamlinedProjectDataQuery } from '@breef/shared/data-access-projects';
import {
    redirectToAppByUserType,
    removeStorageData,
    resetAuth,
} from '@breef/shared/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoginErrorType } from '../types/authFormTypes';

export const useAuthentication = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const nextPath = router.asPath.split('nextPath=')[1] || '';

    const [
        getSelfData,
        {
            isLoading: isLoadingGetSelf,
            isError: isErrorGetSelf,
            error: errorSelf,
        },
    ] = useLazyGetSelfQuery();

    const [getStreamlinedProject] = useLazyGetStreamlinedProjectDataQuery();

    const [
        loginGoogle,
        {
            isLoading: isLoadingGoogle,
            isSuccess: isSuccessGoogle,
            error: errorGoogle,
            isError: isErrorGoogle,
        },
    ] = useLoginGoogleMutation();

    const [
        login,
        {
            isLoading: isLoadingLogin,
            isSuccess: isSuccessLogin,
            error: errorLogin,
            isError: isErrorLogin,
        },
    ] = useLoginMutation();

    useEffect(() => {
        if (isLoadingGoogle || isLoadingLogin || isLoadingGetSelf) {
            return setIsLoading(true);
        }
        if (isErrorGoogle || isErrorLogin) {
            return setIsLoading(false);
        }
    }, [
        isErrorGetSelf,
        isErrorGoogle,
        isErrorLogin,
        isLoadingGetSelf,
        isLoadingGoogle,
        isLoadingLogin,
    ]);

    const redirectToStreamlinedProject = (
        unfilledStep: ProjectCreationStepsEnum,
        projectId: number,
        companyType: string,
    ) => {
        const isValidProjectData =
            unfilledStep === ProjectCreationStepsEnum.Review ||
            unfilledStep === ProjectCreationStepsEnum.Post;

        const isNotValidProjectData =
            unfilledStep !== ProjectCreationStepsEnum.Review &&
            unfilledStep !== ProjectCreationStepsEnum.Post;

        const unfilledStepParams = `?unfilled_step=${unfilledStep}`;
        const currentStepParams = `?current_step=${ProjectStep.REVIEW}`;

        if (isValidProjectData) {
            redirectToAppByUserType(
                companyType,
                PROJECT_EDIT_ROUTE.reverse({ projectId }) + currentStepParams,
            );
            return;
        }

        if (isNotValidProjectData) {
            redirectToAppByUserType(
                companyType,
                PROJECT_EDIT_ROUTE.reverse({ projectId }) + unfilledStepParams,
            );
            return;
        }
    };

    const fetchData = async () => {
        const selfData = await getSelfData().unwrap();
        removeStorageData('local', LOGIN_FORM);

        if (
            (!nextPath || nextPath.includes('/projects')) &&
            selfData.companyType === 'client'
        ) {
            const streamlinedProject = await getStreamlinedProject().unwrap();
            if (streamlinedProject) {
                redirectToStreamlinedProject(
                    streamlinedProject.unfilledStep,
                    streamlinedProject.projectId,
                    selfData.companyType,
                );
                return;
            } else {
                redirectToAppByUserType(selfData.companyType);
                return;
            }
        }

        redirectToAppByUserType(selfData.companyType, `${nextPath}`);
    };

    useEffect(() => {
        if (isSuccessLogin || isSuccessGoogle) {
            fetchData();
        }
    }, [isSuccessLogin, isSuccessGoogle, router]);

    const [allowRedirect, setAllowRedirect] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!isErrorGetSelf) return;
        const fetchError = errorSelf as LoginErrorType;

        if (fetchError?.status === 500) {
            setErrorMessage(GENERAL_ERROR_MESSAGE);
            resetAuth();
            return setAllowRedirect(AUTH_FRONT_APP_URL);
        }

        const message = fetchError?.data?.detail;

        if (Array.isArray(message)) {
            setErrorMessage(message[0]);
            return setAllowRedirect(AUTH_FRONT_APP_URL);
        }

        setErrorMessage(message || GENERAL_ERROR_MESSAGE);
        return setAllowRedirect(AUTH_FRONT_APP_URL);
    }, [errorSelf, isErrorGetSelf]);

    return {
        loginGoogle,
        login,
        isLoading,
        errorGoogle,
        errorLogin,
        isErrorGetSelf,
        allowRedirect,
        errorMessage,
    };
};
