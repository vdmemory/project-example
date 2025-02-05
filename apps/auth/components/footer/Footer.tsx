import { BreefLogo } from '@breef/shared/assets';
import {
    FAQ_ROUTE,
    PRIVACY_POLICY_ROUTE,
    TERMS_OF_USE_ROUTE,
} from '@breef/shared/constants';
import { StyledFooter } from './Footer.styled';
import { getCurrentYear } from '@breef/shared/utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NavigateLink, Navigation } from '@breef/shared/ui-components';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useUrlPathContains } from '@breef/shared/hooks';

export function Footer() {
    const pathNamesNotRender = [
        '/[token]/',
        '/signup',
        '/signin',
        'accept-invite',
        'reset-password',
    ];
    const { hasMatchedPath } = useUrlPathContains({
        pathNames: pathNamesNotRender,
    });

    if (hasMatchedPath) return null;

    return (
        <StyledFooter>
            <div className="left-section">
                <div className="logo">
                    <BreefLogo />
                </div>
                <span>© {getCurrentYear()} Breef Inc.</span>
            </div>

            <Navigation parent="footer">
                <NavigateLink
                    route={FAQ_ROUTE}
                    name="FAQ"
                    typeChildren="button"
                />
                <NavigateLink
                    route={TERMS_OF_USE_ROUTE}
                    name="Terms of Use"
                    typeChildren="button"
                />
                <NavigateLink
                    route={PRIVACY_POLICY_ROUTE}
                    name="Privacy Policy"
                    typeChildren="button"
                />
            </Navigation>
        </StyledFooter>
    );
}

export default Footer;
