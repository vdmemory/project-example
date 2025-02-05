import { BreefLogo } from '@breef/shared/assets';
import {
    PROFILE_ROUTE,
    PROJECT_CREATE_ROUTE,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import { useRouter } from 'next/router';
import { logout } from '@breef/shared/utils';
import { StyledNavDefault } from './NavDefault.styled';

import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import Button from '../../button/Button';
import { CustomDropdownMenu } from '../../customDropdown/customDropdownMenu';
import FloatNavigation from '../../pagesNavigateWrapper/FloatNavigation';
import { NavigateLink } from '../../pagesNavigateWrapper/link/Link';
import Navigation from '../../pagesNavigateWrapper/Navigation';

export function NavDefault() {
    const router = useRouter();
    const { changePage } = useRouteControl();
    const { isMobile } = useMediaContext();
    const isDisableNavLinks = router.pathname.includes('onboarding');

    const dropMenuListNew = [
        {
            value: 'projects',
            label: 'Projects',
        },
        {
            value: 'profile',
            label: 'Profile',
        },
        {
            value: 'logout',
            label: 'Log out',
        },
    ];

    const dropMenuActionNew = (value: string) => {
        switch (value) {
            case 'projects':
                return router.push(PROJECTS_ROUTE);
            case 'profile':
                return router.push(PROFILE_ROUTE);
            case 'logout':
                return logout();
            default:
                return;
        }
    };

    const handleStartProject = () => changePage(PROJECT_CREATE_ROUTE);

    return (
        <StyledNavDefault>
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
                    <CustomDropdownMenu
                        dropdownList={dropMenuListNew}
                        customChange={dropMenuActionNew}
                    />
                ) : (
                    <>
                        <Button
                            type="button"
                            color="transparent"
                            className="button-logout"
                            onClick={e => logout()}
                            withAnimate
                        >
                            Log out
                        </Button>
                        <Button
                            title="Start project"
                            type="button"
                            className="small-accent"
                            withAnimate
                            onClick={handleStartProject}
                            disabled={isDisableNavLinks}
                        />
                    </>
                )}
            </Navigation>
        </StyledNavDefault>
    );
}
