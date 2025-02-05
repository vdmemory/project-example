import { IS_CLIENT_PLATFORM, STEP_CONTROL } from '@breef/shared/constants';
import { useEffect } from 'react';

interface useStepperControlProps {
    setStep:
        | (({ step, stepper }: { stepper?: number; step: number }) => void)
        | (({ step }: { step: number }) => void);
    step: number;
    stepper?: number;
    numberSteppersStepsArray?: number[];
}

export const useStepperControl = ({
    step,
    stepper,
    setStep,
    numberSteppersStepsArray,
}: useStepperControlProps) => {
    const handleChangeStep = (action: STEP_CONTROL) => {
        if (action === STEP_CONTROL.increment) {
            if (stepper) {
                setStep(
                    stepper && step === numberSteppersStepsArray?.[stepper - 1]
                        ? { stepper: stepper + 1, step: 1 }
                        : { stepper, step: step + 1 },
                );
            } else {
                setStep({ step: step + 1 });
            }
        }
        if (action === STEP_CONTROL.decrement) {
            if (stepper) {
                setStep(
                    step === 1 && stepper > 1 && numberSteppersStepsArray
                        ? {
                              stepper: stepper - 1,
                              step: numberSteppersStepsArray?.[stepper - 2],
                          }
                        : { stepper, step: step - 1 },
                );
            } else {
                setStep({ step: step - 1 });
            }
        }
    };

    useEffect(() => {
        IS_CLIENT_PLATFORM && window.scrollTo(0, 0);
    }, [step, stepper]);

    return { handleChangeStep };
};
