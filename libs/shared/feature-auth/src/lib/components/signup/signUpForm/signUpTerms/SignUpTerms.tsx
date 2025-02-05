import {
    PRIVACY_POLICY_ROUTE,
    TERMS_OF_USE_ROUTE,
} from '@breef/shared/constants';
import React from 'react';
import { StyledSignUpTerms } from './SignUpTerms.styled';
import { useRouter } from 'next/router';

export const SignUpTerms = () => {
    const router = useRouter();

    return (
        <StyledSignUpTerms className="sign-up-terms">
            By continuing, you agree to Breef’s&nbsp;
            <a
                href={router?.basePath + TERMS_OF_USE_ROUTE}
                target="_blank"
                rel="noreferrer"
            >
                Terms of Use
            </a>
            &nbsp;and&nbsp;
            <a
                href={router?.basePath + PRIVACY_POLICY_ROUTE}
                target="_blank"
                rel="noreferrer"
            >
                Privacy Policy
            </a>
        </StyledSignUpTerms>
    );
};
