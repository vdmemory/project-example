import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    changePasswordErrorType,
    ChangePasswordFormValuesType,
} from '../../../types/profileFormTypes';
import {
    ConfigInnerFormType,
    SaveButton,
    InnerForm,
} from '@breef/shared/ui-components';
import { useChangePasswordMutation } from '@breef/shared/data-access-profile';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '../../../utils/validation-forms/changePasswordSchema';
import {
    ControlTypeInnerForm,
    SetPasswordRequestType,
} from '@breef/shared/types';

const defaultValuesChangePassword = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

interface ChangePasswordFormProps {
    closeAccordionFunc: () => void;
    config: ConfigInnerFormType;
}

export default function ChangePasswordForm({
    closeAccordionFunc,
    config,
}: ChangePasswordFormProps) {
    const methodsChangePassword = useForm<ControlTypeInnerForm>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultValuesChangePassword,
        resolver: yupResolver(changePasswordSchema),
    });
    const formValues =
        methodsChangePassword.getValues() as SetPasswordRequestType;
    const [changePassword, changePasswordRequest] = useChangePasswordMutation();

    const onSubmitChangePassword: SubmitHandler<
        ControlTypeInnerForm
    > = formData => {
        changePassword(formData as ChangePasswordFormValuesType);
    };

    useEffect(() => {
        if (changePasswordRequest.isSuccess) {
            closeAccordionFunc();
            methodsChangePassword.reset();
        }
    }, [
        changePasswordRequest.isSuccess,
        closeAccordionFunc,
        methodsChangePassword,
    ]);

    //handling error for changePassword
    useEffect(() => {
        if (changePasswordRequest.error) {
            const fetchedError =
                changePasswordRequest.error as changePasswordErrorType;

            if (fetchedError?.data?.non_field_errors) {
                methodsChangePassword.setError('currentPassword', {
                    type: 'backend',
                    message: fetchedError.data.non_field_errors[0],
                });
            }
            if (fetchedError?.data?.old_password) {
                methodsChangePassword.setError('currentPassword', {
                    type: 'backend',
                    message: fetchedError.data.old_password.join(' '),
                });
            }
            if (fetchedError?.data?.new_password) {
                methodsChangePassword.setError('newPassword', {
                    type: 'backend',
                    message: fetchedError.data.new_password[0],
                });
            }
            if (fetchedError?.data?.confirm_password) {
                methodsChangePassword.setError('confirmNewPassword', {
                    type: 'backend',
                    message: fetchedError.data.confirm_password[0],
                });
            }
        }
    }, [changePasswordRequest.error, methodsChangePassword]);

    return (
        <form
            onSubmit={methodsChangePassword.handleSubmit(
                onSubmitChangePassword,
            )}
        >
            <InnerForm
                config={config}
                control={methodsChangePassword.control}
                cleanErrors={methodsChangePassword.clearErrors}
            />
            <SaveButton
                type="submit"
                isSubmitting={changePasswordRequest.isLoading}
                isSuccess={changePasswordRequest.isSuccess}
                disabled={
                    changePasswordRequest.isLoading ||
                    Object.keys(methodsChangePassword.formState.errors)
                        .length !== 0 ||
                    !Object.values(formValues).some(item => item !== '')
                }
            />
        </form>
    );
}
