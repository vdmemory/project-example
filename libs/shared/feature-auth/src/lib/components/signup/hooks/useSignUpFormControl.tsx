import { useRouteControl } from '@breef/shared/hooks';
import { AuthGoogleType } from '@breef/shared/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpFormValuesType } from '../../../types/authFormTypes';
import { signUpSchema } from '../../../utils';
import { defaultSignUpFormValues } from '../../../utils/initialFormsData/signupForm';
import { SignUpQueryParamsType } from '../../../types/queryParamsTypes';

export const useSignUpFormControl = (isPrefilledFormFlow: boolean) => {
    const { changeQueryParams, changePage, router, asPath } = useRouteControl();
    const queryParams: SignUpQueryParamsType = router.query;
    const methods = useForm<SignUpFormValuesType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultSignUpFormValues(),
        resolver: yupResolver(signUpSchema),
    });

    const {
        handleSubmit,
        setValue,
        getValues,
        clearErrors,
        watch,
        formState: { errors },
        trigger,
    } = methods;

    const [isEditableNameRow, setIsEditableNameRow] = useState(true);
    const [isEditableCompanyNameRow, setIsEditableCompanyNameRow] =
        useState(true);
    const [isEditableEmailRow, setIsEditableEmailRow] = useState(true);

    useEffect(() => {
        if (errors.user?.firstName || errors.user?.lastName) {
            setIsEditableNameRow(true);
        }
        if (errors.company?.name) {
            setIsEditableCompanyNameRow(true);
        }
        if (errors.user?.email) {
            setIsEditableEmailRow(true);
        }
    }, [
        errors.company?.name,
        errors.user?.email,
        errors.user?.firstName,
        errors.user?.lastName,
        isPrefilledFormFlow,
    ]);

    const getEmailFromQuery = () => {
        const pattern = /email=([^&]+)/;
        const match = asPath.match(pattern);
        if (match) {
            const email = match[1];
            const decodedEmail = decodeURIComponent(email);
            return decodedEmail;
        } else {
            return '';
        }
    };

    useEffect(() => {
        if (router.isReady) {
            if (queryParams.project) {
                methods.setValue('user.role', 'company');
            }
            if (isPrefilledFormFlow) {
                methods.reset({
                    ...methods.getValues(),
                    user: {
                        role:
                            queryParams.type === 'agency'
                                ? 'agency'
                                : 'company',
                        firstName: queryParams.first_name || '',
                        lastName: queryParams.last_name || '',
                        email: getEmailFromQuery(),
                        password: '',
                        acceptPrivacy: false,
                    },
                    company: {
                        name: queryParams.company_name || '',
                    },
                });
                setIsEditableNameRow(
                    !isPrefilledFormFlow ||
                        !getValues('user.firstName') ||
                        !getValues('user.lastName'),
                );
                setIsEditableCompanyNameRow(
                    !isPrefilledFormFlow || !getValues('company.name'),
                );
                setIsEditableEmailRow(
                    !isPrefilledFormFlow || !getValues('user.email'),
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const updateGoogleForm = (data: AuthGoogleType) => {
        clearErrors();
        setValue('user', {
            role: getValues('user.role'),
            firstName: data.user?.firstName || '',
            lastName: data.user?.lastName || '',
            email: data.user?.email || '',
            acceptPrivacy: true,
            password: '',
        });
        setValue('company', {
            name: '',
        });
        setValue('accessToken', data.accessToken);
    };

    return {
        methods,
        updateGoogleForm,
        handleSubmit,
        watch,
        trigger,
        formRowsState: {
            name: {
                isEditable: isEditableNameRow,
                setIsEditable: setIsEditableNameRow,
            },
            companyName: {
                isEditable: isEditableCompanyNameRow,
                setIsEditable: setIsEditableCompanyNameRow,
            },
            email: {
                isEditable: isEditableEmailRow,
                setIsEditable: setIsEditableEmailRow,
            },
        },
    };
};
