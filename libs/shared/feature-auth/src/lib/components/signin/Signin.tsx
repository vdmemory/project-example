import { StyledSignin } from './Signin.styled';
import { FormProvider } from 'react-hook-form';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRedirectTo } from '../../hooks/useRedirectTo';
import SectionController, {
    Query,
} from './sectionController/SectionController';
import { useSignInHandleErrors } from '../../hooks/useSignInHandleErrors';
import { useSignInFormControl } from '../../hooks/useSignInFormControl';
import { useSignInHandleSuccess } from '../../hooks/useSignInHandleSuccess';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    BlurPageLoader,
    Header,
    HeaderAuth,
    Slider,
} from '@breef/shared/ui-components';
import { SIGN_IN_ROUTE } from '@breef/shared/constants';

export default function Signin() {
    const router = useRouter();
    const redirectTo = useRedirectTo();
    const query: Query = router.query;
    const {
        methods,
        onSubmit,
        onClickController,
        fetchedError,
        isLoggingIn,
        isLoading,
        isSuccessFindPass,
        allowRedirect,
        errorMessage,
    } = useSignInFormControl();

    useEffect(() => {
        if (query.view === 'findpassword') {
            methods.setValue('emailFindPassword', methods.getValues('email'));
            methods.clearErrors('emailFindPassword');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, redirectTo]);

    useSignInHandleErrors({
        fetchedError,
        methods,
    });
    useSignInHandleSuccess({
        methods,
        isSuccessFindPass,
    });

    return (
        <Fragment>
            <HeaderAuth />
            <StyledSignin data-testid="signin-container">
                {router.isReady && (
                    <FormProvider {...methods}>
                        <form
                            data-testid="signin-form"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <SectionController
                                onClickController={onClickController}
                                isSubmitting={isLoading}
                                view={query.view}
                            />
                        </form>
                    </FormProvider>
                )}
                {isLoggingIn && (
                    <BlurPageLoader
                        allowRedirect={allowRedirect}
                        errorMessage={errorMessage}
                        isPageFooter={false}
                    />
                )}
            </StyledSignin>
        </Fragment>
    );
}
