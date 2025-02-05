import { StyledAlreadyHaveAccount } from './HaveAccount.styled';
import React, { FC } from 'react';
import Link from 'next/link';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '@breef/shared/constants';

interface HaveAccountProps {
    isSignInFlow?: boolean;
}
export const HaveAccount: FC<HaveAccountProps> = ({ isSignInFlow = false }) => {
    return (
        <StyledAlreadyHaveAccount className="have-account">
            {isSignInFlow ? (
                <>
                    Don’t have an account yet?{' '}
                    <Link href={SIGN_UP_ROUTE}>Sign up</Link>
                </>
            ) : (
                <>
                    Already have an account?{' '}
                    <Link href={SIGN_IN_ROUTE}>Log in</Link>
                </>
            )}
        </StyledAlreadyHaveAccount>
    );
};
