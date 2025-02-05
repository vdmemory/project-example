import { BreefLogo } from '@breef/shared/assets';
import {
    AUTH_FRONT_APP_URL,
    PROFILE_ROUTE,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import { StyledHeader } from './Header.styled';
import {
    Button,
    FloatNavigation,
    NavigateLink,
    Navigation,
} from '@breef/shared/ui-components';
import { logout } from '@breef/shared/utils';
import { useRouter } from 'next/router';

export function Header() {
    const router = useRouter();
    const isDisableNavLinks = router.pathname.includes('onboarding');

    return (
        <StyledHeader>
            <div className="logo">
                <NavigateLink
                    width="auto"
                    route={PROJECTS_ROUTE}
                    icon={<BreefLogo />}
                    isDisabled={isDisableNavLinks}
                />
            </div>
            <FloatNavigation parent="header">
                <NavigateLink
                    width="auto"
                    type="float"
                    route={PROJECTS_ROUTE}
                    name="Projects"
                    isDisabled={isDisableNavLinks}
                />
                <NavigateLink
                    width="auto"
                    type="float"
                    route={PROFILE_ROUTE}
                    name="Profile"
                    isDisabled={isDisableNavLinks}
                />
            </FloatNavigation>
            <Navigation parent="header">
                <Button
                    type="button"
                    color="transparent"
                    className="button-logout"
                    onClick={e => logout()}
                    withAnimate
                >
                    Log out
                </Button>
            </Navigation>
        </StyledHeader>
    );
}

export default Header;
