import { BreefLogo } from '@breef/shared/assets';
import {
    FAQ_ROUTE,
    PRIVACY_POLICY_ROUTE,
    PROFILE_ROUTE,
    PROJECTS_ROUTE,
    TERMS_OF_USE_ROUTE,
} from '@breef/shared/constants';
import { StyledFooter } from './Footer.styled';
import { useRouter } from 'next/router';
import { useMediaContext, useUrlPathContains } from '@breef/shared/hooks';
import { getCurrentYear } from '@breef/shared/utils';
import {
    FloatNavigation,
    NavigateLink,
    Navigation,
} from '@breef/shared/ui-components';

export function Footer() {
    const { isMobile, isLaptop } = useMediaContext();
    const { pathname } = useRouter();
    const isDisableNavLinks = pathname.includes('onboarding');
    const isStickyFooter = pathname === '/onboarding';
    const pathNamesNotRender = [
        '/project/[projectId]/kick-off',
        '/project/[projectId]/kick-off/edit',
        '/project/[projectId]/pitch/create',
        '/project/[projectId]/pitch/[pitchId]/edit',
        '/project/[projectId]/pitch/success',
        '/project/[projectId]/book-meeting',
        isLaptop && '/onboarding',
    ];

    const { hasMatchedPath } = useUrlPathContains({
        pathNames: pathNamesNotRender,
    });

    const checkIOSSafari = () => {
        const userAgent = window.navigator.userAgent;
        const isIOS = /iPad|iPhone|iPod/.test(userAgent);
        const isSafari = !userAgent.match('CriOS') && userAgent.match('Safari');

        return !!isIOS && !!isSafari;
    };

    const isIOSSafari = checkIOSSafari();

    if (hasMatchedPath || (pathname === '/onboarding' && isMobile))
        return <></>;

    return (
        <StyledFooter isIOSSafari={isIOSSafari} isStickyFooter={isStickyFooter}>
            <div className="left-section">
                <BreefLogo />
                <span>© {getCurrentYear()} Breef Inc.</span>
            </div>

            <FloatNavigation parent="footer">
                <NavigateLink
                    width="auto"
                    type="float"
                    route={PROJECTS_ROUTE}
                    name="Projects"
                />
                <NavigateLink
                    width="auto"
                    type="float"
                    route={PROFILE_ROUTE}
                    name="Profile"
                />
            </FloatNavigation>

            <Navigation parent="footer">
                <NavigateLink
                    route={FAQ_ROUTE}
                    name="FAQ"
                    typeChildren="button"
                    isDisabled={isDisableNavLinks}
                />
                <NavigateLink
                    route={TERMS_OF_USE_ROUTE}
                    name="Terms of Use"
                    typeChildren="button"
                    isDisabled={isDisableNavLinks}
                />
                <NavigateLink
                    route={PRIVACY_POLICY_ROUTE}
                    name="Privacy Policy"
                    typeChildren="button"
                    isDisabled={isDisableNavLinks}
                />
            </Navigation>
        </StyledFooter>
    );
}

export default Footer;
