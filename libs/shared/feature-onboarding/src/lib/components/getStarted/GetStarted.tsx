import { StyledGetStarted } from './GetStarted.styled';
import { Button, Popup } from '@breef/shared/ui-components';
import { AccentNumber } from '@breef/shared/ui-components';
import {
    magnifierImage,
    nextStepArrowImage,
    magnifierSmallImage,
    LogoTextImage,
    stars_layout,
} from '@breef/shared/assets';
import { NextStep } from './nextStep/NextStep';
import { clientConfigNextSteps } from './clientConfigNextSteps';
import { IS_CLIENT_PLATFORM } from '@breef/shared/constants';
import { CSSProperties, useEffect } from 'react';
import { agencyConfigNextSteps } from './agencyConfigNextSteps';
import { useMediaContext } from '@breef/shared/hooks';
import { useGetStarted } from '../../hooks/useGetStarted';

interface GetStartedProps {
    userType?: string;
    close: () => void;
}

export function GetStarted({ userType = 'client', close }: GetStartedProps) {
    const { isMobile } = useMediaContext();
    const { isSubmittingGetStarted, handleGetStarted } =
        useGetStarted(userType);
    const magnifierElem = document.getElementById('magnifier-image-elem');

    useEffect(() => {
        if (magnifierElem && IS_CLIENT_PLATFORM) {
            window.onresize = () => {
                if (
                    window.screen.width <= 768 &&
                    (magnifierElem as HTMLImageElement).src !==
                        magnifierSmallImage.src
                ) {
                    (magnifierElem as HTMLImageElement).src =
                        magnifierSmallImage.src;
                } else if (
                    window.screen.width > 768 &&
                    (magnifierElem as HTMLImageElement).src !==
                        magnifierImage.src
                ) {
                    (magnifierElem as HTMLImageElement).src =
                        magnifierImage.src;
                }
            };
        }
    }, [magnifierElem]);

    const popupStylePreset: CSSProperties = {
        overflowX: isMobile ? 'hidden' : 'unset',
        overflowY: 'auto',
        maxHeight: '100%',
    };

    return (
        <Popup isClosable={false} style={popupStylePreset}>
            <StyledGetStarted>
                <div className="header-modal">
                    <div className="header-left-container">
                        <span
                            className={
                                userType === 'client'
                                    ? 'note'
                                    : 'note note-agency'
                            }
                        >
                            {userType === 'client'
                                ? 'The *easiest* way to find an agency...'
                                : 'Welcome:'}
                        </span>
                        <span className="label">Here’s how breef works:</span>
                    </div>
                    <div className="header-right-container">
                        <LogoTextImage />
                    </div>
                    <img
                        className="next-step-arrow-image"
                        src={nextStepArrowImage.src}
                        alt=""
                    />
                </div>
                <div className="content-modal">
                    <div className="complete-info-block">
                        <img
                            src={stars_layout.src}
                            alt="Magnifier"
                            id={'magnifier-image-elem'}
                        />
                        <AccentNumber number={1} />
                        <span className="content">
                            {userType === 'client'
                                ? 'project planning call'
                                : 'Complete onboarding'}
                        </span>
                    </div>
                    <div className="next-steps-wrapper">
                        {(userType === 'client'
                            ? clientConfigNextSteps
                            : agencyConfigNextSteps
                        ).map((data, key) => (
                            <NextStep
                                key={key}
                                numberStep={key + 2}
                                icon={data.icon}
                                label={data.label}
                            />
                        ))}
                    </div>
                </div>
                <div className="footer-modal">
                    <Button
                        title="Get Started"
                        type="button"
                        withAnimate
                        arrowRight
                        className="normal"
                        isLoading={isSubmittingGetStarted}
                        onClick={handleGetStarted}
                    />
                </div>
            </StyledGetStarted>
        </Popup>
    );
}
