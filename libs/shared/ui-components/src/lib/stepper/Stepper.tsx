import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCheckNeedsToRedirectStep } from './useCheckNeedsToRedirectStep';
import { AnimationOpacity } from '../animation/AnimationOpacity';

interface StepperProps {
    children: ReactNode[] | ReactNode;
    validationSteps: boolean[];
    mode?: 'stepper' | 'multiStepper';
    step: number;
    setStep: ({ stepper, step }: { stepper?: number; step: number }) => void;
    numberSteppersStepsArray?: number[];
    className?: string;
    isAnimation?: boolean;
}

export function Stepper({
    children,
    validationSteps,
    mode = 'stepper',
    step,
    setStep,
    numberSteppersStepsArray,
    className = '',
    isAnimation = true,
}: StepperProps) {
    const childrenToArray = Array.isArray(children) ? children : [children];
    useCheckNeedsToRedirectStep({
        validationSteps,
        step,
        numberSteps: childrenToArray.length,
        mode,
        setStep,
        numberSteppersStepsArray,
    });

    return (
        <AnimatePresence exitBeforeEnter>
            {childrenToArray.map(
                (stepComponent, key) =>
                    step === key + 1 &&
                    (isAnimation ? (
                        <AnimationOpacity
                            className={className}
                            key={`step-${key}`}
                        >
                            {stepComponent}
                        </AnimationOpacity>
                    ) : (
                        <motion.div key={`step-${key}`} className={className}>
                            {stepComponent}
                        </motion.div>
                    )),
            )}
        </AnimatePresence>
    );
}
