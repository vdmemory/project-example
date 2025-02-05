import { PROJECTS_ROUTE, ProjectStep } from '@breef/shared/constants';
import { useRouteControl } from '@breef/shared/hooks';
import { usePitchCreateActions, usePitchCreateSelector } from '../store/hooks';

export const useStepperControl = () => {
    const { changePage } = useRouteControl();
    const { setStep } = usePitchCreateActions();
    const { step, isPenMode } = usePitchCreateSelector(
        state => state,
    ).pitchCreate;

    const finalizeReview = () => {
        setStep({ step: ProjectStep.REVIEW });
    };
    const handleNext = () => {
        window.scroll(0, 0);
        if (isPenMode) {
            finalizeReview();
        } else {
            setStep({ step: step + 1 });
        }
    };
    const handleBack = () => {
        if (step === 1) {
            return changePage(PROJECTS_ROUTE);
        }
        window.scroll(0, 0);
        if (isPenMode) {
            return finalizeReview();
        } else {
            return setStep({ step: step - 1 });
        }
    };

    return {
        setStep,
        step,
        handleNext,
        handleBack,
    };
};
