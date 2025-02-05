import { BreefLogo } from '@breef/shared/assets';
import {
    PROFILE_ROUTE,
    PROJECTS_ROUTE,
    PROJECT_CREATE_ROUTE,
} from '@breef/shared/constants';
import { useRouter } from 'next/router';

import { StyledHeader } from './Header.styled';
import {
    Button,
    FloatNavigation,
    NavigateLink,
    Navigation,
    CustomDropdown,
} from '@breef/shared/ui-components';
import { logout } from '@breef/shared/utils';
import { useMediaContext } from '@breef/shared/hooks';

export function Header() {
    const router = useRouter();
    const { isMobile } = useMediaContext();
    const isDisableNavLinks = router.pathname.includes('onboarding');

    const dropMenuList = [
        {
            value: 'logout',
            label: 'Log out',
        },
    ];

    const dropMenuAction = (value: string) => {
        if (value === 'logout') {
            return logout();
        }
    };

    const handleStartProject = () => {
        router.push(PROJECT_CREATE_ROUTE, undefined, { shallow: true });
    };

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
                {isMobile ? (
                    <CustomDropdown
                        value=""
                        dropdownList={dropMenuList}
                        customChange={dropMenuAction}
                        type="header-menu"
                    />
                ) : (
                    <Button
                        type="button"
                        color="transparent"
                        className="button-logout"
                        onClick={e => logout()}
                        withAnimate
                    >
                        Log out
                    </Button>
                )}
                <Button
                    title="Start project"
                    type="button"
                    className="small-accent"
                    withAnimate
                    onClick={handleStartProject}
                    disabled={isDisableNavLinks}
                />
            </Navigation>
        </StyledHeader>
    );
}

export default Header;
