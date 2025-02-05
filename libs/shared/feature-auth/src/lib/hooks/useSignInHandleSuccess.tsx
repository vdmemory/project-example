import { useCallback, useEffect } from 'react';
import { useRedirectTo } from './useRedirectTo';
import { LoginLinkFormValuesType } from '../types/authFormTypes';
import { UseFormReturn } from 'react-hook-form';
import { removeStorageData } from '@breef/shared/utils';
import { LOGIN_FORM } from '@breef/shared/constants';
import { defaultLoginFormValues } from '../utils';

interface UseSignInHandleSuccessProps {
    methods: UseFormReturn<LoginLinkFormValuesType>;
    isSuccessFindPass: boolean;
}

export const useSignInHandleSuccess = ({
    methods,
    isSuccessFindPass,
}: UseSignInHandleSuccessProps) => {
    const redirectTo = useRedirectTo();
    const resetFormData = useCallback(() => {
        removeStorageData('local', LOGIN_FORM);
        methods.reset(defaultLoginFormValues);
    }, [methods]);

    useEffect(() => {
        if (isSuccessFindPass) {
            const timeout = setTimeout(() => {
                resetFormData();
            }, 500);
            redirectTo('success-reset', 'view');
            return () => clearTimeout(timeout);
        }
        return;
        //eslint-disable-next-line
    }, [isSuccessFindPass]);
};
