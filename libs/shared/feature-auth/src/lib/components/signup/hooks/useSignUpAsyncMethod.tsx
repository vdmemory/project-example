import {
    useRegistrationMutation,
    useRegisterGoogleMutation,
    useCheckEmailMutation,
    useCheckUserStatusMutation,
    useLoginGoogleMutation,
} from '@breef/shared/data-access-auth';
import {
    AuthValidationType,
    SignUpProjectType,
    SignUpRequestType,
} from '@breef/shared/types';
import {
    getSnakeCaseObject,
    googleAnalyticsEvent,
    resetAuth,
} from '@breef/shared/utils';
import { useState } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import { useAuthSelector } from '../../../store/hook';
import {
    SignUpErrorType,
    getCustomMessage,
    getSignUpFormErrors,
    BackMessageNames,
} from '../../../utils/transformErrors/transformSignUpErrors';
import { useGetSelfRedirect } from './useGetSelf';
import { SignUpQueryParamsType } from '../../../types/queryParamsTypes';
import { BREEF_AGENCY_ONBOARDING_ROUTE } from '@breef/shared/constants';

export const useSignUpAsyncMethod = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methods: UseFormReturn<SignUpRequestType, any>,
    queryParams: SignUpQueryParamsType,
) => {
    const { utm } = useAuthSelector(state => state.auth);
    const transformUtm = getSnakeCaseObject(utm);
    const project: SignUpProjectType = {
        skills: queryParams.project,
        start: queryParams.start,
        budget: queryParams.budget,
    };

    const [signUp, { data: signUpResult }] = useRegistrationMutation();
    const [signUpGoogle, { data: signUpGoogleResult }] =
        useRegisterGoogleMutation();

    const [loginGoogle] = useLoginGoogleMutation();

    const [checkEmailExist] = useCheckEmailMutation();
    const [checkUserStatus] = useCheckUserStatusMutation();

    const projectId =
        signUpResult?.project_id ?? signUpGoogleResult?.project_id;
    const {
        isLoading: isLoadingGetSelf,
        setIsSkipSelf,
        allowRedirect,
        errorMessage,
    } = useGetSelfRedirect({ projectId });

    const [isLoading, setIsLoading] = useState(false);

    const getDataGoogle = (data: SignUpRequestType) => {
        return {
            user: {
                role: data.user?.role,
                acceptPrivacy: data.user?.acceptPrivacy,
            },
            accessToken: data.accessToken || '',
            utm: transformUtm,
            project,
        };
    };

    const redirectOnboarding = (token: string) => {
        window.location.replace(
            BREEF_AGENCY_ONBOARDING_ROUTE.reverse({
                token,
            }) || '',
        );
    };

    const signUpAsync = async (data: SignUpRequestType) => {
        try {
            setIsLoading(true);
            const email = data.user?.email || '';
            await checkUserStatus({
                email,
                validationType: AuthValidationType.SIGN_UP,
            }).unwrap();
            await checkEmailExist({ email }).unwrap();
            const result = await signUp({
                ...data,
                user: {
                    ...data.user,
                    acceptPrivacy: true,
                },
                utm: transformUtm,
                project,
            }).unwrap();

            googleAnalyticsEvent();

            if (data.user.role === 'agency') {
                redirectOnboarding(result.auth_data.access);
            } else {
                setIsSkipSelf(false);
            }
        } catch (error) {
            const errorsForm = getSignUpFormErrors(error as SignUpErrorType);
            errorsForm.length &&
                errorsForm.forEach(error => {
                    methods.setError(error.field as Path<SignUpRequestType>, {
                        type: 'backend',
                        message: getCustomMessage(error.message),
                    });
                });
            setIsLoading(false);
        }
    };

    const signUpGoogleAsync = async (data: SignUpRequestType) => {
        try {
            setIsLoading(true);
            const email = data.user?.email || '';
            await checkUserStatus({ email }).unwrap();
            await checkEmailExist({ email }).unwrap();
            const result = await signUpGoogle(getDataGoogle(data)).unwrap();

            googleAnalyticsEvent();

            if (data.user.role === 'agency') {
                redirectOnboarding(result.access);
            } else {
                setIsSkipSelf(false);
            }
        } catch (error) {
            const errorsForm = getSignUpFormErrors(error as SignUpErrorType);

            if (
                errorsForm.length &&
                errorsForm[0].message === BackMessageNames.EXIST
            ) {
                await loginGoogle(getDataGoogle(data)).unwrap();
                setIsSkipSelf(false);
                return;
            }

            errorsForm.length &&
                errorsForm.forEach(error => {
                    methods.setError(error.field as Path<SignUpRequestType>, {
                        type: 'backend',
                        message: getCustomMessage(error.message),
                    });
                });
            setIsLoading(false);
        }
    };

    return {
        signUpAsync,
        signUpGoogleAsync,
        isLoading: isLoadingGetSelf || !!errorMessage || isLoading,
        allowRedirect,
        errorMessage,
    };
};
