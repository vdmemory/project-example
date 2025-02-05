import {
    AvatarImage,
    Button,
    Check16x16Thing,
    Close16x16Icon,
} from '@breef/ui-kit';
import { useMediaContext } from '@breef/shared/hooks';
import { Global } from '@emotion/react';
import {
    StyledPublicStartProjectPopup,
    getPopupStylePreset,
    popupGlobalStyles,
    navGlobalStyles,
} from './PublicStartProjectPopup.styled';
import { BrandLead } from '@breef/shared/types';
import { useRouter } from 'next/router';
import { logout, redirectToApp } from '@breef/shared/utils';
import {
    AUTH_FRONT_APP_URL,
    PROFILE_ROUTE,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';
import { Fragment } from 'react';
import Link from 'next/link';
import { BreefLogo } from '@breef/shared/assets';
import { Popup } from '../Popup';
import NavControl from '../../navControl/NavControl';
import { CustomDropdownMenu } from '../../customDropdown/customDropdownMenu';

interface PublicStartProjectPopupProps {
    onClick: () => void;
    lead: {
        brandLead: BrandLead;
        firstName: string;
        lastName: string;
        email: string;
        id: number;
    } | null;
}

const leadMessage = `I’m excited for you to take the next step \non Breef + experience how we’ve made \nit even easier for leading brands to find \nand work with the right agencies.`;

const stepTips = [
    {
        title: 'Review Scope',
        description:
            'We’ve written a project scope, based on your brand + goals.',
    },
    {
        title: 'Post Project',
        description:
            'We’ll invite agencies to submit pitches for your project.',
    },
    {
        title: 'Get Pitches',
        description:
            'Receive 5-7 agency pitches, curated for your brand + goals.',
    },
];

export const PublicStartProjectPopup = ({
    onClick,
    lead,
}: PublicStartProjectPopupProps) => {
    const { isMobile } = useMediaContext();

    const renderBenefit = (title: string) => (
        <div className="benefit-row">
            <Check16x16Thing />
            <span>{title}</span>
        </div>
    );
    const renderLeftSection = () => (
        <div className="left-section">
            {lead && (
                <div className="lead-info-wrapper">
                    {lead.brandLead.logoUrl && (
                        <AvatarImage
                            className="logo"
                            src={lead.brandLead.logoUrl}
                            alt="Lead Logo"
                            width={94}
                            height={94}
                        />
                    )}
                    <div className="lead-info">
                        <div className="lead-name">
                            {lead.firstName} {lead.lastName?.charAt(0)}.
                        </div>
                        <span className="lead-position">Your Strategist</span>
                    </div>
                </div>
            )}
            <p className="lead-message">{leadMessage}</p>
            <h4 className="benefits-title">What to expect: </h4>
            {renderBenefit('Custom pitches, in < 5 days')}
            {renderBenefit('Expert marketing support')}
            {renderBenefit('Seamless agency search ')}
        </div>
    );

    const renderMobileSection = () => (
        <div className="mobile-section">
            {lead && (
                <div className="lead-info-wrapper">
                    {lead.brandLead.logoUrl && (
                        <AvatarImage
                            className="logo"
                            src={lead.brandLead.logoUrl}
                            alt="Lead Logo"
                            width={94}
                            height={94}
                        />
                    )}
                    <div className="lead-info">
                        <div className="lead-name">
                            {lead.firstName} {lead.lastName?.charAt(0)}.
                        </div>
                        <span className="lead-position">Your Strategist</span>
                    </div>
                </div>
            )}
            <div className="text-info">
                <h4 className="benefits-title">What to expect: </h4>
                {renderBenefit('Custom pitches, in < 5 days')}
                {renderBenefit('Expert marketing support')}
                {renderBenefit('Seamless agency search ')}
            </div>
        </div>
    );

    return (
        <Fragment>
            <HeaderNav key="header-nav" />
            <Popup
                key={'popup-before-creating'}
                style={getPopupStylePreset(isMobile)}
            >
                <StyledPublicStartProjectPopup>
                    <Global styles={popupGlobalStyles} />
                    {!isMobile && renderLeftSection()}
                    <div className="right-section">
                        <h3>Review Your Scope</h3>
                        <div className="step-tips-wrapper">
                            {stepTips.map((item, idx) => (
                                <div key={item.title} className="step-tip">
                                    <span className="step">Step {idx + 1}</span>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                        {isMobile && renderMobileSection()}
                        <Button
                            label={isMobile ? 'Submit' : 'Next'}
                            size="small"
                            onClick={onClick}
                            isUppercase
                        />
                    </div>

                    <button className="close-button" onClick={onClick}>
                        <Close16x16Icon />
                    </button>
                </StyledPublicStartProjectPopup>
            </Popup>
        </Fragment>
    );
};

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

export const HeaderNav = () => {
    const router = useRouter();

    const handleLogout = () => {
        logout();
        redirectToApp(AUTH_FRONT_APP_URL);
    };

    const dropMenuActionNew = (value: string) => {
        switch (value) {
            case 'projects':
                return router.push(PROJECTS_ROUTE);
            case 'profile':
                return router.push(PROFILE_ROUTE);
            case 'logout':
                return handleLogout();
            default:
                return;
        }
    };

    return (
        <Fragment>
            <Global key="global-styles" styles={navGlobalStyles} />
            <NavControl
                key="nav-control"
                isNewNav
                isSticky
                leftComponent={
                    <Link
                        className="link-logo"
                        href={PROJECTS_ROUTE}
                        shallow={true}
                    >
                        <BreefLogo />
                    </Link>
                }
            >
                <CustomDropdownMenu
                    dropdownList={dropMenuListNew}
                    customChange={dropMenuActionNew}
                />
            </NavControl>
        </Fragment>
    );
};
