import { FC } from 'react';
import { SIGN_IN_ROUTE } from '@breef/shared/constants';
import { BreefPrimaryLogo } from '@breef/shared/assets';
import Link from 'next/link';
import { StyledHeaderAuth } from './HeaderAuth.styled';

interface HeaderProps {
    linkLogo?: string;
}
export const HeaderAuth: FC<HeaderProps> = ({ linkLogo = SIGN_IN_ROUTE }) => {
    return (
        <StyledHeaderAuth>
            <Link className="link-logo" href={linkLogo} shallow={true}>
                <BreefPrimaryLogo data-testid="breef-primary-logo" />
            </Link>
        </StyledHeaderAuth>
    );
};
