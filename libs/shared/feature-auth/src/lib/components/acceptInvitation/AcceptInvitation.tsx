import {
    FormProvider,
    SubmitHandler,
    useController,
    useForm,
} from 'react-hook-form';
import { AcceptInviteFromValuesType } from '../../types/authFormTypes';
import { StyledAcceptInvitation } from './AcceptInvitation.styled';
import { useInviteUser } from './hook/useInviteUser';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BlurPageLoader, HeaderAuth } from '@breef/shared/ui-components';
import { AuthSection } from '../authSection/AuthSection';
import AcceptInviteForm from './acceptInviteForm/AcceptInviteForm';
import { SignUpTerms } from '../signup/signUpForm/signUpTerms/SignUpTerms';
import React, { Fragment } from 'react';
import { defaultAcceptInviteFormValues } from '../../utils/initialFormsData/acceptInvitationFrom';
import { acceptInviteSchema } from '../../utils/validation-forms/acceptInviteSchema';
import { yupResolver } from '@hookform/resolvers/yup';

export interface AcceptInvitationProps {
    token: string;
}

export const AcceptInvitation = ({ token }: AcceptInvitationProps) => {
    const { inviteUser, isLoading, allowRedirect, errorMessage } =
        useInviteUser();

    const methods = useForm<AcceptInviteFromValuesType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: defaultAcceptInviteFormValues(token),
        resolver: yupResolver(acceptInviteSchema),
    });

    const onSubmit: SubmitHandler<AcceptInviteFromValuesType> = (data, e) => {
        e?.preventDefault();
        return inviteUser(data);
    };

    return (
        <Fragment>
            <HeaderAuth />
            <StyledAcceptInvitation>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <AuthSection
                            title="Accept invitation"
                            note="Set a password to join your company’s account on Breef"
                            isSubmitting={isLoading}
                            buttonTitle="Log in"
                            termsNode={<SignUpTerms />}
                        >
                            <AcceptInviteForm />
                        </AuthSection>
                    </form>
                </FormProvider>
                {(isLoading || allowRedirect) && (
                    <BlurPageLoader
                        allowRedirect={allowRedirect}
                        errorMessage={errorMessage}
                        isPageFooter={false}
                    />
                )}
            </StyledAcceptInvitation>
        </Fragment>
    );
};

export default AcceptInvitation;
