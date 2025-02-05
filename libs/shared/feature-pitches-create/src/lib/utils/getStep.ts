import { PitchCreationStepsEnum, PitchStep } from '@breef/shared/constants';

const steps = [
    {
        key: PitchCreationStepsEnum.AboutUs,
        value: PitchStep.OUR_AGENCY,
    },
    {
        key: PitchCreationStepsEnum.YourPitch,
        value: PitchStep.YOUR_PITCH,
    },
    {
        key: PitchCreationStepsEnum.Portfolio,
        value: PitchStep.PORTFOLIO,
    },
    {
        key: PitchCreationStepsEnum.ProjectFit,
        value: PitchStep.PROJECT_FIT,
    },
    {
        key: PitchCreationStepsEnum.Review,
        value: PitchStep.REVIEW,
    },
    {
        key: PitchCreationStepsEnum.Post,
        value: PitchStep.REVIEW,
    },
];
export const getStep = (stepKey: PitchCreationStepsEnum) => {
    return steps.find(item => item.key === stepKey)?.value ?? PitchStep.REVIEW;
};

export const getStepKeyByValue = (step: PitchStep) => {
    return (
        steps.find(item => item.value === step)?.key ??
        PitchCreationStepsEnum.Review
    );
};
