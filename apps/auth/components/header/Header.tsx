import { BreefLogo } from '@breef/shared/assets';
import { SIGN_IN_ROUTE } from '@breef/shared/constants';
import { useRouter } from 'next/router';

import { StyledHeader } from './Header.styled';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Button, NavigateLink, Navigation } from '@breef/shared/ui-components';

export function Header() {
    const router = useRouter();

    const handleSignIn = () => {
        router.push(SIGN_IN_ROUTE);
    };
    const redirectAboutUs = () => {
        router.push('https://www.breef.com/about');
    };

    const isStickyHeader = () => {
        if (router.pathname.includes('/[token]/pitch')) {
            return true;
        } else {
            return false;
        }
    };
    if (router.pathname.includes('/[token]/')) {
        return (
            <StyledHeader isSticky={isStickyHeader()}>
                <div className="logo">
                    <NavigateLink
                        width="auto"
                        route={SIGN_IN_ROUTE}
                        icon={<BreefLogo />}
                    />
                </div>

                <Navigation parent="header">
                    <Button
                        title="About us"
                        type="button"
                        color="transparent"
                        className="button-logout"
                        onClick={redirectAboutUs}
                        withAnimate
                    />

                    <Button
                        type="button"
                        className="small-accent"
                        withAnimate
                        color="primary"
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                </Navigation>
            </StyledHeader>
        );
    }

    return (
        <StyledHeader isSticky={isStickyHeader()}>
            <div className="logo">
                <NavigateLink
                    width="auto"
                    route={SIGN_IN_ROUTE}
                    icon={<BreefLogo />}
                />
            </div>
        </StyledHeader>
    );
}

export default Header;
