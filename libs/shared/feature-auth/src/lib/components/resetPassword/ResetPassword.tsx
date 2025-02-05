import { StyledResetPassword } from './ResetPassword.styled';
import { SubmitHandler, useForm, Path, FormProvider } from 'react-hook-form';
import { ResetPassFormValuesType } from '../../types/authFormTypes';
import React, { Fragment, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../../utils/validation-forms/resetPasswordSchema';
import { AnimatePresence, motion } from 'framer-motion';
import { useResetPassword } from './hooks/useResetPassword';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { HeaderAuth } from '@breef/shared/ui-components';
import { AuthSection } from '../authSection/AuthSection';
import ResetPasswordForm from './resetPasswordForm/ResetPasswordForm';

/* eslint-disable-next-line */
export interface ResetPasswordProps {
    token: string;
}

const defaultResetPasswordValues = {
    password: '',
    confirmPassword: '',
    token: '',
};

export default function ResetPassword({ token }: ResetPasswordProps) {
    const methods = useForm<ResetPassFormValuesType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultResetPasswordValues,
        resolver: yupResolver(resetPasswordSchema),
    });

    const { handleResetPassSubmit, isLoading } = useResetPassword(methods);

    useEffect(() => {
        methods.setValue('token', token);
    }, [token, methods]);

    const onSubmit: SubmitHandler<ResetPassFormValuesType> = (
        data,
        event,
    ): void => {
        event?.preventDefault();
        handleResetPassSubmit(data);
    };

    return (
        <Fragment>
            <HeaderAuth />
            <StyledResetPassword>
                <AnimatePresence exitBeforeEnter={true}>
                    <FormProvider {...methods}>
                        <motion.form
                            key="reset-pass-page-motion"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <AuthSection
                                title="Set password"
                                note="Enter your new password below"
                                buttonTitle="Set password"
                                isSubmitting={isLoading}
                            >
                                <ResetPasswordForm />
                            </AuthSection>
                        </motion.form>
                    </FormProvider>
                </AnimatePresence>
            </StyledResetPassword>
        </Fragment>
    );
}
