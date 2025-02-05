import { SubmitHandler, useForm } from 'react-hook-form';
import {
    LoginErrorType,
    LoginLinkFormValuesType,
} from '../types/authFormTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema, loginSchema } from '../utils';
import { useRouter } from 'next/router';
import { Query } from '../components/signin/sectionController/SectionController';
import React, { useCallback, useEffect, useState } from 'react';
import { AuthGoogleType, GoogleRequestType } from '@breef/shared/types';
import {
    GOOGLE_BUTTON_EVENT,
    LINK_BUTTON_EVENT,
} from '@breef/shared/constants';
import {
    useCheckUserStatusMutation,
    useForgotPasswordMutation,
} from '@breef/shared/data-access-auth';
import { useAuthentication } from './useAuthentication';
import { useRedirectTo } from './useRedirectTo';

export const useSignInFormControl = () => {
    const router = useRouter();
    const query: Query = router.query;
    const redirectTo = useRedirectTo();
    const [isLoading, setIsLoading] = useState(false);
    const [findPassword, { isSuccess: isSuccessFindPass }] =
        useForgotPasswordMutation();

    const [checkUserStatus] = useCheckUserStatusMutation();

    const {
        loginGoogle,
        login,
        isLoading: isLoggingIn,
        errorGoogle,
        allowRedirect,
        errorMessage,
    } = useAuthentication();

    const [fetchedError, setFetchedError] =
        React.useState<LoginErrorType | null>(null);

    useEffect(() => {
        if (errorGoogle) {
            setFetchedError(errorGoogle as LoginErrorType);
        }
    }, [errorGoogle]);

    const methods = useForm<LoginLinkFormValuesType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(getSignInSchema(query)),
    });

    const onSubmit: SubmitHandler<LoginLinkFormValuesType> = async data => {
        setIsLoading(true);
        try {
            if (query.view === 'findpassword') {
                const prepareData = {
                    email: data.emailFindPassword || '',
                };
                await checkUserStatus(prepareData).unwrap();
                await findPassword(prepareData).unwrap();
            } else {
                await login(data).unwrap();
            }
        } catch (error) {
            setFetchedError(error as LoginErrorType);
        }
        setIsLoading(false);
    };

    const onGoogleSubmit = useCallback(
        (data: AuthGoogleType) => {
            methods.setValue('email', data.user?.email || '');
            loginGoogle(data as GoogleRequestType);
        },
        [loginGoogle, methods],
    );

    const onClickController = useCallback(
        (
            key: string,
            data: AuthGoogleType | React.SyntheticEvent | { query: string },
        ) => {
            if (key === GOOGLE_BUTTON_EVENT)
                return onGoogleSubmit(data as AuthGoogleType);
            if (key === LINK_BUTTON_EVENT) {
                const typedLinkData = data as { query: string };
                return redirectTo(typedLinkData.query, 'view');
            }
        },
        [onGoogleSubmit, redirectTo],
    );

    return {
        methods,
        onSubmit,
        onClickController,
        fetchedError,
        isLoggingIn,
        isLoading: isLoading || isLoggingIn,
        isSuccessFindPass,
        allowRedirect,
        errorMessage,
    };
};

const getSignInSchema = (query: Query) => {
    if (query.view === 'findpassword') {
        return forgotPasswordSchema;
    }
    return loginSchema;
};
