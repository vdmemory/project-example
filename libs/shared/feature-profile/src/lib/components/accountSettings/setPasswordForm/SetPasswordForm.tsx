import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    setPasswordErrorType,
    SetPasswordFormValuesType,
} from '../../../types/profileFormTypes';
import {
    ConfigInnerFormType,
    SaveButton,
    InnerForm,
} from '@breef/shared/ui-components';
import { useSetPasswordMutation } from '@breef/shared/data-access-profile';
import { setPasswordSchema } from '../../../utils/validation-forms/setPasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    ControlTypeInnerForm,
    ChangePasswordRequestType,
} from '@breef/shared/types';

const defaultValuesSetPassword = {
    newPassword: '',
    confirmNewPassword: '',
};

interface SetPasswordFormProps {
    isLoading?: boolean;
    closeAccordionFunc: () => void;
    config: ConfigInnerFormType;
}

export default function SetPasswordForm({
    isLoading,
    closeAccordionFunc,
    config,
}: SetPasswordFormProps) {
    const methodsSetPassword = useForm<ControlTypeInnerForm>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultValuesSetPassword,
        resolver: yupResolver(setPasswordSchema),
    });
    const formValues =
        methodsSetPassword.getValues() as ChangePasswordRequestType;
    const [setPassword, setPasswordRequest] = useSetPasswordMutation();

    const onSubmitSetPassword: SubmitHandler<
        ControlTypeInnerForm
    > = formData => {
        setPassword(formData as SetPasswordFormValuesType);
    };

    useEffect(() => {
        if (setPasswordRequest.isSuccess) {
            closeAccordionFunc();
            methodsSetPassword.reset();
        }
    }, [setPasswordRequest.isSuccess, methodsSetPassword, closeAccordionFunc]);

    //handling error for setPassword
    useEffect(() => {
        if (setPasswordRequest.error) {
            const fetchedError =
                setPasswordRequest.error as setPasswordErrorType;
            if (fetchedError?.data?.new_password) {
                methodsSetPassword.setError('newPassword', {
                    type: 'backend',
                    message: fetchedError.data.new_password[0],
                });
            }
            if (fetchedError?.data?.confirm_password) {
                methodsSetPassword.setError('confirmNewPassword', {
                    type: 'backend',
                    message: fetchedError.data.confirm_password[0],
                });
            }
        }
    }, [setPasswordRequest.error, methodsSetPassword]);

    return (
        <form onSubmit={methodsSetPassword.handleSubmit(onSubmitSetPassword)}>
            <InnerForm
                config={config}
                control={methodsSetPassword.control}
                cleanErrors={methodsSetPassword.clearErrors}
            />
            <SaveButton
                type="submit"
                isSubmitting={setPasswordRequest.isLoading}
                isSuccess={setPasswordRequest.isSuccess}
                disabled={
                    isLoading ||
                    setPasswordRequest.isLoading ||
                    Object.keys(methodsSetPassword.formState.errors).length !==
                        0 ||
                    !Object.values(formValues).some(item => item !== '')
                }
            />
        </form>
    );
}
