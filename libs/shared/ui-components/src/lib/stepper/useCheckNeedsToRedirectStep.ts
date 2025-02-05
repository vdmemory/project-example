import { useCallback, useEffect } from 'react';
import { useIsPresent } from 'framer-motion';

interface checkNeedsToRedirectStepProps {
    validationSteps: boolean[];
    step: number;
    numberSteps: number;
    mode: 'multiStepper' | 'stepper';
    setStep: ({ stepper, step }: { stepper?: number; step: number }) => void;
    numberSteppersStepsArray?: number[];
    isDisabledRedirect?: boolean;
}

export function useCheckNeedsToRedirectStep({
    validationSteps,
    step,
    numberSteps,
    mode,
    setStep,
    numberSteppersStepsArray,
    isDisabledRedirect,
}: checkNeedsToRedirectStepProps) {
    const changeStep = useCallback(
        (newStep: number) => {
            const stepToRedirect =
                mode === 'multiStepper' && numberSteppersStepsArray
                    ? {
                          stepper: newStep,
                          step: numberSteppersStepsArray[newStep - 1],
                      }
                    : { step: newStep };
            setStep(stepToRedirect);
        },
        [mode, numberSteppersStepsArray, setStep],
    );

    const checkNeedsRedirect = useCallback(() => {
        const lastNotValidStep = validationSteps.indexOf(true) + 1;
        if (lastNotValidStep !== 0 && step > lastNotValidStep)
            return lastNotValidStep;
        if (step > numberSteps) return numberSteps;
        if (step < 1 || isNaN(step)) return 1;
        return null;
    }, [numberSteps, step, validationSteps]);

    const isPresent = useIsPresent();
    useEffect(() => {
        if (!isDisabledRedirect && isPresent) {
            const redirectStep = checkNeedsRedirect();
            if (redirectStep !== null) changeStep(redirectStep);
        }
    }, [
        changeStep,
        checkNeedsRedirect,
        isDisabledRedirect,
        isPresent,
        mode,
        numberSteps,
        step,
    ]);
}
