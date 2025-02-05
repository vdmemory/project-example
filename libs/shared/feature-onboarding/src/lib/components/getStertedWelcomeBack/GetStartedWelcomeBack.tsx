import {
    StyledButtonClose,
    StyledGetStartedWelcomeBack,
    StyledProgress,
} from './GetStartedWelcomeBack.styled';
import {
    Button,
    MarketingStrategistsScreen,
    Popup,
} from '@breef/shared/ui-components';
import { CSSProperties, useState } from 'react';
import { CloseIcon } from '@breef/shared/assets';
import WelcomeScreen from './screens/WelcomeScreen';
import WrapContentHead from './screens/WrapperContentHeader';
import OurFeaturesScreen from './screens/OurFeaturesScreen';
import ProjectPlanningScreen from './screens/ProjectPlanningScreen';
import { useSetEventProjectPlanningMutation } from '@breef/shared/zapier-event';
import {
    descFirstScreenAgency,
    descFirstScreenClient,
    getButtonTitle,
    marketingConfig,
    screenFour,
    screenThree,
    screenTwo,
} from './config';
import {
    desktopMarketingScreen,
    mobileMarketingScreen,
} from '@breef/shared/utils';
import { useMediaContext } from '@breef/shared/hooks';
import { useGetStarted } from '../../hooks/useGetStarted';

interface GetStartedWelcomeBackProps {
    email: string;
    userType?: string;
    isRedirectToOnboarding?: boolean;
    isProgressDisplayed?: boolean;
    resetIsOldUser?: () => void;
    close: () => void;
}

// TODO: move to feature-projects
export function GetStartedWelcomeBack({
    email,
    userType = 'client',
    isRedirectToOnboarding = false,
    isProgressDisplayed = false,
    resetIsOldUser,
    close,
}: GetStartedWelcomeBackProps) {
    const { isMobile } = useMediaContext();
    const [screen, setScreen] = useState(1);
    const [select, setSelect] = useState<
        { id: number | string; name: string }[]
    >([]);

    const [setEventProjectPlanning] = useSetEventProjectPlanningMutation();
    const { isSubmittingGetStarted, handleGetStarted } =
        useGetStarted(userType);

    const countScreen = userType === 'client' ? 4 : 1;
    const progressWidth = (screen / countScreen) * 100;
    const isProgressView = isProgressDisplayed && countScreen > 1;

    const handleSelect = (value: { id: number | string; name: string }[]) => {
        setSelect(value);
    };
    const renderClientScreens = () => {
        switch (screen) {
            case 1:
                return <WelcomeScreen description={descFirstScreenAgency} />;
            case 2:
                return (
                    <WrapContentHead title={screenTwo.title}>
                        <OurFeaturesScreen />
                    </WrapContentHead>
                );
            case 3:
                return (
                    <WrapContentHead
                        title={screenThree.title}
                        description={screenThree.description}
                    >
                        <MarketingStrategistsScreen
                            label={marketingConfig.label}
                            list={marketingConfig.list}
                            desktopMarketingScreen={desktopMarketingScreen}
                            mobileMarketingScreen={mobileMarketingScreen}
                        />
                    </WrapContentHead>
                );
            case 4:
                return (
                    <WrapContentHead
                        title={screenFour.title}
                        description={screenFour.description}
                    >
                        <ProjectPlanningScreen
                            select={select}
                            onSelect={handleSelect}
                        />
                    </WrapContentHead>
                );
            default:
                return null;
        }
    };

    const handleSubmitZapier = () => {
        const data = {
            email,
            select,
        };
        setEventProjectPlanning(data);
    };

    const handleClickNext = () => {
        if (screen < countScreen) return setScreen(screen + 1);
        if (screen === countScreen && isRedirectToOnboarding) {
            handleSubmitZapier();
            resetIsOldUser && resetIsOldUser();
            return handleGetStarted();
        }
        resetIsOldUser && resetIsOldUser();
        handleSubmitZapier();
        resetIsOldUser && resetIsOldUser();
        return close();
    };

    const popupStylePreset: CSSProperties = {
        overflowX: isMobile ? 'hidden' : 'unset',
        overflowY: 'auto',
        maxHeight: isMobile ? '584px' : '100%',
    };

    return (
        <Popup isClosable={false} style={popupStylePreset}>
            <StyledGetStartedWelcomeBack>
                <div className="header-modal">
                    {isProgressView ? (
                        <StyledProgress progress={progressWidth} />
                    ) : null}
                    {screen === countScreen ? (
                        <StyledButtonClose onClick={handleClickNext}>
                            <CloseIcon className="close-icon" />
                        </StyledButtonClose>
                    ) : null}
                </div>

                <div className={`main-content-modal screen-${screen}`}>
                    {userType === 'client' ? (
                        renderClientScreens()
                    ) : (
                        <WelcomeScreen description={descFirstScreenClient} />
                    )}
                </div>
                <div className="footer-modal">
                    <Button
                        title={getButtonTitle(userType, screen, countScreen)}
                        withAnimate
                        arrowRight
                        onClick={handleClickNext}
                        className="normal"
                        isLoading={isSubmittingGetStarted}
                    />
                </div>
            </StyledGetStartedWelcomeBack>
        </Popup>
    );
}
