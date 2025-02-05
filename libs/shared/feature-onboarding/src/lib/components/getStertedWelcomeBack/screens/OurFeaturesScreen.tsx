import {
    colors,
    fonts,
    paymentsScreen,
    pitchReviewScreen,
    pointerLeft,
    pointerRight,
    projectPlanningScreen,
} from '@breef/shared/assets';
import { mediaScreen } from '@breef/shared/assets/variables';
import styled from '@emotion/styled';

import {
    desktopOurFeatureScreen,
    mobileOurFeatureScreen,
} from '@breef/shared/utils';
import { FloatingElement } from '@breef/shared/ui-components';

export const StyledOurFeaturesScreen = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    .screen {
        width: 225px;
        height: 145px;
        object-fit: cover;
        border-left: 1px solid #000;
        border-right: 1px solid #000;

        @media screen and (${mediaScreen.tablet}) {
            width: 153px;
            height: 96px;
        }

        &.screen-payments {
            margin-left: -10px;
            width: 205px;
            height: 130px;

            @media screen and (${mediaScreen.tablet}) {
                width: 153px;
                height: 96px;
            }
        }
    }

    .pointer {
        height: 78px;
        width: auto;
    }

    h3.accent-note {
        font-size: 12px;
        font-weight: 400;
        margin: 0;
        text-transform: uppercase;
        font-family: ${fonts.accent};
        color: ${colors.mainOrange};
        text-align: center;
        white-space: pre-wrap;
    }
`;

export const OurFeaturesScreen = () => {
    const elementsScreen = [
        <img
            className="screen screen-project-planning"
            src={projectPlanningScreen.src}
            alt="Project Planning Screen"
            key="Project Planning Screen"
        />,
        <img
            className="screen screen-pitch-review"
            src={pitchReviewScreen.src}
            alt="Pitch Review Screen"
            key="Pitch Review Screen"
        />,
        <img
            className="screen screen-payments"
            src={paymentsScreen.src}
            alt="Payments Screen"
            key="Payments Screen"
        />,
        <img
            className="pointer"
            src={pointerLeft.src}
            alt="Pointer Screen"
            key="pointer-screen-left"
        />,
        <img
            className="pointer"
            src={pointerRight.src}
            alt="Pointer Screen"
            key="pointer-screen-right"
        />,
        <img
            className="pointer"
            src={pointerLeft.src}
            alt="Pointer Screen"
            key="pointer-screen-left-2"
        />,
        <h3 className="accent-note" key="easy project">
            {'easy project\nplanning + scopes'}
        </h3>,
        <h3 className="accent-note" key="centralized">
            {'centralized\nPitch Review'}
        </h3>,
        <h3 className="accent-note" key="seamless">
            {'seamless\nAgency payments'}
        </h3>,
        <h3 className="accent-note" key="many-more">
            {'( + many more!)'}
        </h3>,
    ];

    return (
        <StyledOurFeaturesScreen>
            {elementsScreen.map((element, index) => {
                return (
                    <FloatingElement
                        key={`float-our-features-${element.key}`}
                        desktopStyle={desktopOurFeatureScreen[index]}
                        mobileStyle={mobileOurFeatureScreen[index]}
                    >
                        {element}
                    </FloatingElement>
                );
            })}
        </StyledOurFeaturesScreen>
    );
};

export default OurFeaturesScreen;
