import {
    AvatarImage,
    Button,
    Check16x16Thing,
    Close16x16Icon,
} from '@breef/ui-kit';
import { useMediaContext } from '@breef/shared/hooks';
import { css, Global } from '@emotion/react';
import {
    StyledPublicStartProjectPopup,
    getPopupStylePreset,
} from './PublicPopup.styled';
import { BrandLead } from '@breef/shared/types';
import { Fragment } from 'react';
import { Popup } from '../../../popup/Popup';
import { mediaScreen } from '@breef/shared/assets/variables';

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

const leadMessage = `We’ve curated pitches from vetted agencies, based on your brand and goals. Excited to hear your thoughts!`;

const stepTips = [
    {
        title: 'Review Pitches',
        description: 'Learn more about each agency.',
    },
    {
        title: 'Shortlist Agencies',
        description: 'Select the agencies you’d like to meet with.',
    },
    {
        title: 'Schedule Intros',
        description: 'Share your availability — we’ll arrange intro meetings.',
    },
];

export const PublicPopup = ({
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
            {renderBenefit('Custom pitches from vetted agencies')}
            {renderBenefit('Seamless agency search')}
            {renderBenefit('Expert project support')}
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
                {renderBenefit('Custom pitches from vetted agencies')}
                {renderBenefit('Seamless agency search')}
                {renderBenefit('Expert project support')}
            </div>
        </div>
    );

    return (
        <Fragment>
            <Popup
                key={'popup-before-creating'}
                style={getPopupStylePreset(isMobile)}
            >
                <StyledPublicStartProjectPopup>
                    <Global styles={popupGlobalStyles} />
                    {!isMobile && renderLeftSection()}
                    <div className="right-section">
                        <h3>Review Agency Pitches</h3>
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
                            label="Next"
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

export const popupGlobalStyles = css`
    body .modal-overlay {
        background-color: rgb(249 247 243 / 89%) !important;
        backdrop-filter: unset !important;

        @media screen and (${mediaScreen.tablet}) {
            padding: 20px 15px !important;
            background-color: rgb(249 247 243) !important;
        }
    }

    @media screen and (${mediaScreen.tablet}) {
        body .popup-wrapper {
            padding: 105px 17.5px 20px !important;
            align-items: baseline !important;
        }
    }
`;
