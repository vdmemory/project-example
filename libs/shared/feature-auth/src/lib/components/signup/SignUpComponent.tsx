import { StyledSignUp } from './SignUpComponent.styled';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { useSignUpFormControl } from './hooks/useSignUpFormControl';
import SignUpForm from './signUpForm/SignUpForm';
import { AuthGoogleType } from '@breef/shared/types';
import { useRouteControl } from '@breef/shared/hooks';
import { useSignUpAsyncMethod } from './hooks/useSignUpAsyncMethod';
import { SignUpFormValuesType } from '../../types/authFormTypes';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    BlurPageLoader,
    GoogleAuth,
    HeaderAuth,
} from '@breef/shared/ui-components';
import React, { Fragment, useEffect } from 'react';
import { SignUpQueryParamsType } from '../../types/queryParamsTypes';
import { MoreAuthOptions } from './moreAuthOptions/MoreAuthOptions';
import { SignUpTerms } from './signUpForm/signUpTerms/SignUpTerms';
import { HaveAccount } from '../authSection/haveAccount/HaveAccount';
import { Separator } from '../authSection/formRow/authFields/Separator';
import { AuthSection } from '../authSection/AuthSection';

export default function SignUp() {
    const { router } = useRouteControl();
    const queryParams: SignUpQueryParamsType = router.query;
    const isPrefilledFormFlow =
        queryParams.type === 'brand' || queryParams.type === 'agency';
    const isAllFieldsPrefilled =
        isPrefilledFormFlow &&
        queryParams.email &&
        queryParams.company_name &&
        queryParams.first_name &&
        queryParams.last_name;
    const {
        methods,
        updateGoogleForm,
        formRowsState,
        handleSubmit,
        watch,
        trigger,
    } = useSignUpFormControl(isPrefilledFormFlow);
    const note = isAllFieldsPrefilled
        ? 'Add a password to create your Breef account'
        : 'Add your information';
    const {
        signUpAsync,
        signUpGoogleAsync,
        isLoading,
        allowRedirect,
        errorMessage,
    } = useSignUpAsyncMethod(methods, queryParams);

    const handleGoogleCall = (data: AuthGoogleType) => {
        updateGoogleForm(data);
        return signUpGoogleAsync(methods.getValues());
    };

    const handleSubmitForm: SubmitHandler<SignUpFormValuesType> = (data, e) => {
        e?.preventDefault();
        return signUpAsync(data);
    };

    const validateRole = async () => {
        return await trigger('user.role');
    };

    if (!router.isReady) return null;

    return (
        <Fragment>
            <HeaderAuth />
            <StyledSignUp>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(handleSubmitForm)}
                        autoComplete="off"
                    >
                        <AuthSection
                            title="Create account"
                            note={note}
                            buttonTitle="Create account"
                            termsNode={<SignUpTerms />}
                            underFormComponent={<HaveAccount />}
                            formMaxWidth={530}
                            isSubmitting={isLoading}
                        >
                            <SignUpForm
                                formRowsState={formRowsState}
                                isPrefilledFormFlow={isPrefilledFormFlow}
                            />
                            <MoreAuthOptions>
                                <Separator />
                                <GoogleAuth
                                    onClick={handleGoogleCall}
                                    checkIsValid={validateRole}
                                    name=""
                                />
                            </MoreAuthOptions>
                        </AuthSection>
                    </form>
                </FormProvider>
                {isLoading ? (
                    <BlurPageLoader
                        allowRedirect={allowRedirect}
                        errorMessage={errorMessage}
                        isPageFooter={false}
                    />
                ) : null}
            </StyledSignUp>
        </Fragment>
    );
}
