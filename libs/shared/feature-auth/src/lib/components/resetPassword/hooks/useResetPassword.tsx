import { useResetPasswordMutation } from '@breef/shared/data-access-auth';
import { SIGN_IN_ROUTE } from '@breef/shared/constants';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    ResetPassErrorType,
    ResetPassFormValuesType,
} from '../../../types/authFormTypes';
import { ResetPassRequestType } from '@breef/shared/types';
import { useRouteControl } from '@breef/shared/hooks';

export const useResetPassword = (
    methods: UseFormReturn<ResetPassRequestType>,
) => {
    const router = useRouter();
    const routerRef = useRef(router);
    const delay = 1500;
    const { changePage } = useRouteControl();
    const [resetPassword, { isLoading, error, isSuccess }] =
        useResetPasswordMutation();

    useEffect(() => {
        if (!isSuccess) return;

        methods.reset();
        toast.success(
            'Password has been successfully changed, you can log in!',
            {
                autoClose: delay - 200,
                closeOnClick: false,
                hideProgressBar: false,
                progress: undefined,
            },
        );
        const timeout = setTimeout(() => {
            routerRef.current.push(SIGN_IN_ROUTE);
        }, delay);
        return () => clearTimeout(timeout);
    }, [isLoading, isSuccess, methods]);

    useEffect(() => {
        const fetchedErrors = error as ResetPassErrorType;
        if (fetchedErrors?.data?.password) {
            methods.setError('password', {
                type: 'server',
                message: fetchedErrors.data.password[0],
            });
        }
        if (fetchedErrors?.data?.confirmation_password) {
            methods.setError('confirmPassword', {
                type: 'server',
                message: fetchedErrors.data.confirmation_password[0],
            });
        }
        if (fetchedErrors?.data?.token) {
            toast.error(fetchedErrors.data.token[0], {
                toastId: fetchedErrors.data.token[0],
            });
            changePage(SIGN_IN_ROUTE);
        }
    }, [error, methods]);

    const handleResetPassSubmit = (data: ResetPassFormValuesType) => {
        resetPassword(data);
    };

    return {
        handleResetPassSubmit,
        isLoading,
    };
};
