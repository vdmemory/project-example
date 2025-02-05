import React, { Fragment } from 'react';
import {
    AnimationOpacity,
    FinishPitchPopup,
    Header,
    Stepper,
    usePopup,
} from '@breef/shared/ui-components';
import {
    usePitchCreateSelector,
    usePitchPreviewSelector,
} from '../../store/hooks';
import {
    StyledPitchCreateWrapper,
    StyledProgressBar,
    StyledProgressBarWrapper,
    StyledSuccessPopupContent,
} from './PitchCreate.styled';
import { PitchStep, PROJECTS_ROUTE } from '@breef/shared/constants';
import PitchPreview from '../pitchPreview/PitchPreview';
import { useRouter } from 'next/router';
import { usePitchCreateFormControl } from '../../hooks/usePitchCreateFormControl';
import { FormProvider } from 'react-hook-form';
import { useStepperControl } from '../../hooks/useStepperControl';
import OurAgencyStep from './ourAgencyStep/OurAgencyStep';
import { useCheckIsAvailableFlow } from '../../hooks/useCheckIsAvailableFlow';
import { usePreviewControl } from '../../hooks/usePreviewContol';
import SideBar from '../sideBar/SideBar';
import PortfolioStep from './portfolioStep/PortfolioStep';
import ProjectFitStep from './projectFitStep/ProjectFitStep';
import YourPitchStep from './yourPitchStep/YourPitchStep';
import StepWrapper from './stepWrapper/StepWrapper';
import { usePitchSubmit } from '../../hooks/usePitchSubmit';
import { PitchMergedResponseType } from '@breef/shared/types';
import ReviewStep from './reviewStep/ReviewStep';
import { useMediaContext, useRouteControl } from '@breef/shared/hooks';
import NavigationSection from './navigationSection/NavigationSection';
import { AnimatePresence, motion } from 'framer-motion';
import { ANIMATION_DURATION } from '../../utils/constants';

export type Mode = 'edit' | 'create';
interface PitchCreateProps {
    mode?: Mode;
    pitchData?: PitchMergedResponseType;
}

export const PitchCreate = ({
    mode = 'create',
    pitchData,
}: PitchCreateProps) => {
    const router = useRouter();
    const successPopup = usePopup();
    const {
        query: { projectId, pitchId },
    } = router;
    const { changePage } = useRouteControl();
    const { isMaxMobile } = useMediaContext();
    const { pitchPreview } = usePitchPreviewSelector(
        state => state,
    ).pitchPreview;

    const { isSubmittingNext, isSubmittingSaveExit, isDisabledSubmit } =
        usePitchCreateSelector(state => state).pitchCreate;

    const { step, setStep, handleNext, handleBack } = useStepperControl();

    const { methods, validationSteps, isReady } = usePitchCreateFormControl({
        pitchData,
    });

    const { handleChoiceOfInterest, isFinishedPreview, isSubmittedInterest } =
        usePreviewControl();
    useCheckIsAvailableFlow({ mode });

    const { handleSaveExit, handleSubmitNext, handleSubmit, getAllData } =
        usePitchSubmit({
            methods,
            step,
            isCreate: mode === 'create',
            projectId: Number(projectId),
            pitchId: Number(pitchId),
            successCallback: successPopup.open,
            handleNext,
        });

    const isDisplayPitchPreview =
        (mode === 'create' && !isFinishedPreview) ||
        (mode === 'create' && !pitchPreview.isAcceptedTerms);

    const renderStep = (label: string, component: React.ReactNode) => {
        return <StepWrapper label={label}>{component}</StepWrapper>;
    };

    const renderSuccessPopup = () => (
        <FinishPitchPopup
            onClose={() => changePage(PROJECTS_ROUTE)}
            title="Pitch Submitted!"
            description="We’re excited to put you forward for this opportunity and will be in touch with updates ASAP. While you wait, take a moment to update your profile."
            onSubmit={() => changePage(PROJECTS_ROUTE)}
            buttonTitle="Continue to dashboard"
            bodyOffsetTop={25}
            bodyOffsetBottom={19}
        >
            <StyledSuccessPopupContent>
                <label className="label">Here’s what’s next:</label>
                {successTipsConfig.map((item, index) => (
                    <div className="item">
                        <div className="order">{index + 1}</div>
                        <div className="group">
                            <h3 className="title">{item.title}</h3>
                            <div className="description">
                                {item.description}
                            </div>
                        </div>
                    </div>
                ))}
            </StyledSuccessPopupContent>
        </FinishPitchPopup>
    );

    const renderPlug = () => (
        <AnimationOpacity duration={ANIMATION_DURATION} key="plug">
            <motion.span />
        </AnimationOpacity>
    );
    const renderProgress = () => (
        <AnimatePresence exitBeforeEnter>
            {step !== PitchStep.REVIEW ? (
                <StyledProgressBarWrapper
                    duration={ANIMATION_DURATION}
                    key="progress"
                >
                    <StyledProgressBar
                        active={step}
                        items={desktopProgressBarConfig}
                        isVertical
                    />
                </StyledProgressBarWrapper>
            ) : (
                renderPlug()
            )}
        </AnimatePresence>
    );

    const renderNavigationSection = () => (
        <AnimatePresence exitBeforeEnter>
            {step !== PitchStep.REVIEW ? (
                <AnimationOpacity
                    duration={ANIMATION_DURATION}
                    key="navigation"
                    className="navigation-animation-wrapper"
                >
                    <NavigationSection
                        onNext={handleSubmitNext}
                        onBack={handleBack}
                        isDisabledNext={
                            validationSteps[step - 1] ||
                            isSubmittingSaveExit ||
                            isDisabledSubmit
                        }
                        step={step}
                        stepsCount={validationSteps.length}
                    />
                </AnimationOpacity>
            ) : (
                renderPlug()
            )}
        </AnimatePresence>
    );

    return (
        <StyledPitchCreateWrapper>
            {isDisplayPitchPreview ? (
                <PitchPreview
                    isAccept={pitchPreview.isAcceptedTerms}
                    onChoiceOfInterest={handleChoiceOfInterest}
                    isSubmittedInterest={isSubmittedInterest}
                    pitchPreview={pitchPreview}
                    projectId={Number(projectId)}
                    step={step}
                    stepsCount={validationSteps.length}
                />
            ) : (
                isReady && (
                    <Fragment>
                        <Header
                            buttonTitle="Save & exit"
                            onClick={handleSaveExit}
                            isSubmitting={isSubmittingSaveExit}
                            isDisabled={isSubmittingNext || isDisabledSubmit}
                        />
                        <div className="pitch-content-wrapper">
                            {renderProgress()}
                            <Stepper
                                step={step}
                                setStep={setStep}
                                validationSteps={validationSteps}
                                className="stepper"
                                isAnimation={false}
                            >
                                <FormProvider {...methods.ourAgency}>
                                    {renderStep(
                                        'Our Agency',
                                        <OurAgencyStep />,
                                    )}
                                </FormProvider>
                                <FormProvider {...methods.yourPitch}>
                                    {renderStep('The Pitch', <YourPitchStep />)}
                                </FormProvider>
                                <FormProvider {...methods.portfolio}>
                                    {renderStep(
                                        'Your Portfolio',
                                        <PortfolioStep />,
                                    )}
                                </FormProvider>
                                <FormProvider {...methods.projectFit}>
                                    {renderStep(
                                        'Project Fit',
                                        <ProjectFitStep />,
                                    )}
                                </FormProvider>
                                <ReviewStep
                                    pitchData={getAllData()}
                                    handlePost={() => handleSubmit(false, true)}
                                />
                            </Stepper>
                            {!isMaxMobile && <SideBar />}
                        </div>
                        {renderNavigationSection()}
                    </Fragment>
                )
            )}
            {successPopup.isOpen && renderSuccessPopup()}
        </StyledPitchCreateWrapper>
    );
};
export default PitchCreate;

const successTipsConfig = [
    {
        title: 'Expert Feedback',
        description:
            'We’ll review your pitch. You’ll hear from us if we have any questions or feedback.',
    },
    {
        title: 'Pitch Review',
        description:
            'Your pitch will be shared with the client. We’ll be in touch with updates ASAP.',
    },
    {
        title: 'Client Intro',
        description:
            'If you’re shortlisted, we’ll arrange an intro call with the client for you to learn more.',
    },
];

const desktopProgressBarConfig = [
    'Agency',
    'Pitch',
    'Portfolio',
    'Project fit',
];
