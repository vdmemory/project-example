import { useCallback, useEffect } from 'react';

interface useNextStepOnEnterKeyProps {
    isValidCurrentStep?: boolean;
    isSubmitStep: boolean;
    handleStepNext: (e: KeyboardEvent) => void;
    handleSubmitForm: () => void;
    onCheckField?: () => void;
    step: number;
}

export function useNextStepOnEnterKey({
    isSubmitStep,
    isValidCurrentStep = true,
    handleStepNext,
    handleSubmitForm,
    onCheckField,
    step,
}: useNextStepOnEnterKeyProps) {
    const enterKeyListener = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter' && isValidCurrentStep) {
                e.preventDefault();
                if (isSubmitStep) {
                    return handleSubmitForm();
                }
                if (step === 2 && onCheckField) {
                    return onCheckField();
                }
                return handleStepNext(e);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [handleStepNext, handleSubmitForm, isSubmitStep, isValidCurrentStep],
    );

    useEffect(() => {
        document.addEventListener('keypress', enterKeyListener);
        return () => document.removeEventListener('keypress', enterKeyListener);
    }, [enterKeyListener]);
}
