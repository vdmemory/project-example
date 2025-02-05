import React, { useCallback } from 'react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    FieldConfiguration,
    GoogleAuth,
    NavControl,
    Success,
} from '@breef/shared/ui-components';
import { AnimatePresence } from 'framer-motion';
import { AuthGoogleType } from '@breef/shared/types';
import SignInForm from './singInForm/SignInForm';
import { Separator } from '../../authSection/formRow/authFields/Separator';
import {
    GOOGLE_BUTTON_EVENT,
    LINK_BUTTON_EVENT,
} from '@breef/shared/constants';
import { MoreAuthOptions } from '../../signup/moreAuthOptions/MoreAuthOptions';
import { HaveAccount } from '../../authSection/haveAccount/HaveAccount';
import { AuthSection } from '../../authSection/AuthSection';
import FindPasswordForm from './findPasswordForm/FindPasswordForm';

interface SectionControllerProps {
    onClickController: (
        key: string,
        data:
            | AuthGoogleType
            | React.SyntheticEvent<Element, Event>
            | { query: string },
    ) => void;
    isSubmitting: boolean;
}

export type Query = {
    view?: 'findpassword' | 'success-reset';
};

export function SectionController({
    onClickController,
    isSubmitting,
    view,
}: SectionControllerProps & Query) {
    const renderSection = useCallback(() => {
        switch (view) {
            case 'success-reset':
                return (
                    <Success
                        key="success-forgot-password"
                        text="We’ve sent a reset link to your inbox :)"
                        subtext="Click on the link we sent to reset your password."
                    />
                );
            case 'findpassword':
                return (
                    <AuthSection
                        key="forgot-password"
                        title="Forgot password"
                        note="We’ll send you a link to reset your password"
                        buttonTitle="SEND LINK"
                        isSubmitting={isSubmitting}
                    >
                        <FindPasswordForm />
                    </AuthSection>
                );
            default:
                return (
                    <AuthSection
                        key="login"
                        title="Log in"
                        note="Enter your account information"
                        buttonTitle="Log in"
                        underFormComponent={<HaveAccount isSignInFlow />}
                        isSubmitting={isSubmitting}
                    >
                        <SignInForm
                            onClickForgotPassword={() =>
                                onClickController(LINK_BUTTON_EVENT, {
                                    query: 'findpassword',
                                })
                            }
                        />
                        <MoreAuthOptions isOpenDefault>
                            <Separator text="Or continue with" />
                            <GoogleAuth
                                onClick={e =>
                                    onClickController(GOOGLE_BUTTON_EVENT, e)
                                }
                                name=""
                            />
                        </MoreAuthOptions>
                    </AuthSection>
                );
        }
    }, [isSubmitting, onClickController, view]);

    return (
        <AnimatePresence exitBeforeEnter={true}>
            {renderSection()}
        </AnimatePresence>
    );
}

export default SectionController;
