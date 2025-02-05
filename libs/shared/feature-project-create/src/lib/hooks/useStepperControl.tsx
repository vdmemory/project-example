import {
    useProjectCreateActions,
    useProjectCreateSelector,
} from '../store/hooks';
import { PROJECTS_ROUTE, ProjectStep } from '@breef/shared/constants';
import { useRouteControl } from '@breef/shared/hooks';

interface UseStepperControlProps {
    openCreatePasswordPopup: () => void;
}

export const useStepperControl = ({
    openCreatePasswordPopup,
}: UseStepperControlProps) => {
    const { setStep } = useProjectCreateActions();
    const {
        step,
        isPenMode,
        user: { needsPassword },
    } = useProjectCreateSelector(state => state).projectCreate;
    const { changePage } = useRouteControl();

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
    const handleBackToDashboard = () => {
        if (needsPassword) {
            openCreatePasswordPopup();
            return;
        }
        changePage(PROJECTS_ROUTE);
    };

    const handleBack = () => {
        window.scroll(0, 0);
        if (isPenMode) {
            finalizeReview();
        } else if (step === 1) {
            handleBackToDashboard();
        } else {
            setStep({ step: step - 1 });
        }
    };

    return {
        setStep,
        step,
        handleNext,
        handleBack,
    };
};
