import { useEffect } from 'react';
import {
    LoginErrorType,
    LoginLinkFormValuesType,
} from '../types/authFormTypes';
import {
    capitalizeFirstLetter,
    getErrorMessage,
    redirectToApp,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import { UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Query } from '../components/signin/sectionController/SectionController';
import { useAuthActions } from '../store/hook';
import { ADMIN_BACKEND_APP_URL } from '@breef/shared/constants';

interface UseSignInHandleErrorsProps {
    fetchedError: LoginErrorType | null;
    methods: UseFormReturn<LoginLinkFormValuesType>;
}

export const useSignInHandleErrors = ({
    fetchedError,
    methods,
}: UseSignInHandleErrorsProps) => {
    const router = useRouter();
    const query: Query = router.query;
    const { setSignInError } = useAuthActions();

    useEffect(() => {
        if (fetchedError && fetchedError?.data) {
            const responseMessage =
                fetchedError?.data?.email?.[0] ||
                fetchedError?.data?.non_field_errors?.[0] ||
                (Array.isArray(fetchedError?.data?.detail)
                    ? fetchedError?.data?.detail?.[0]
                    : fetchedError?.data?.detail) ||
                (validationErrorMessages[
                    ValidationErrorType.default
                ] as string);

            if (fetchedError.data.admin) {
                redirectToApp(ADMIN_BACKEND_APP_URL);
            } else if (query.view === 'findpassword') {
                methods.setError('emailFindPassword', {
                    type: 'backend',
                    message: capitalizeFirstLetter(
                        getErrorMessage('email', responseMessage),
                    ),
                });
            } else {
                setSignInError(
                    capitalizeFirstLetter(
                        getErrorMessage('email', responseMessage),
                    ),
                );
            }
        }

        return () => {
            setSignInError(null);
        };
        //eslint-disable-next-line
    }, [fetchedError, fetchedError?.data]);
};
