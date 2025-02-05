import React, { FC, Fragment } from 'react';
import { StyledReviewStep } from './ReviewStep.styled';
import { PitchCreateFormType } from '../../../types/pitchCreateType';
import { ArrowRightIcon, Button } from '@breef/ui-kit';
import {
    PitchStep,
    TERMS_OF_USE_PROJECT,
    TERMS_OF_USE_ROUTE,
} from '@breef/shared/constants';
import { useRouter } from 'next/router';
import { AnimationOpacity, ReviewPitch } from '@breef/shared/ui-components';
import {
    usePitchCreateActions,
    usePitchCreateSelector,
    usePitchPreviewSelector,
} from '../../../store/hooks';
import { ANIMATION_DURATION } from '../../../utils/constants';

interface ReviewStepProps {
    handlePost: () => void;
    pitchData: PitchCreateFormType;
}
export const ReviewStep: FC<ReviewStepProps> = ({ handlePost, pitchData }) => {
    const router = useRouter();
    const { companyInfo, isSubmittingNext, isSubmittingSaveExit } =
        usePitchCreateSelector(state => state).pitchCreate;
    const {
        pitchPreview: { agencySkills },
    } = usePitchPreviewSelector(state => state).pitchPreview;
    const { setStep, setPenMode } = usePitchCreateActions();
    const onEditStep = (step: PitchStep, elementId?: string) => {
        setStep({ step });
        setPenMode({ isPenMode: true, targetElementId: elementId });
    };

    const data = {
        ...pitchData,
        companyName: companyInfo?.companyName ?? '',
        companyLocation: companyInfo?.officeLocations?.[0]?.name ?? '',
        companyLogo: pitchData.logo,
        skills: agencySkills,
    };

    return (
        <StyledReviewStep duration={ANIMATION_DURATION}>
            <div className="header">
                <div className="header-title-wrapper">
                    <h1>Review Your Pitch</h1>
                    <Button
                        label="SUBMIT PITCH"
                        size="medium"
                        iconPlacement="right"
                        icon={<ArrowRightIcon />}
                        onClick={handlePost}
                        isDisabled={isSubmittingSaveExit}
                        isSubmitted={isSubmittingNext}
                    />
                </div>
            </div>
            <div className="divider" />
            <div className="review-content-wrapper">
                <ReviewPitch pitchData={data} onEditStep={onEditStep} />
                <p className="terms">
                    By clicking “Submit Pitch”, I confirm my agency is
                    submitting a pitch to a Breef client for a Breef project.
                    This means, I agree to the &nbsp;
                    <a
                        href={router.basePath + TERMS_OF_USE_ROUTE}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Breef Project Terms
                    </a>
                    &nbsp; and &nbsp;
                    <a
                        href={router.basePath + TERMS_OF_USE_PROJECT}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Terms of Use
                    </a>
                    .
                </p>
                <Button
                    label="SUBMIT PITCH"
                    size="large"
                    className="button-submit"
                    iconPlacement="right"
                    icon={<ArrowRightIcon />}
                    isDisabled={isSubmittingSaveExit}
                    isSubmitted={isSubmittingNext}
                    onClick={handlePost}
                    isUppercase
                />
            </div>
        </StyledReviewStep>
    );
};

export default ReviewStep;
