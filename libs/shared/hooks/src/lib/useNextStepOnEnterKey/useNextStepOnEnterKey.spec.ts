import { renderHook, act } from '@testing-library/react-hooks';
import { useNextStepOnEnterKey } from './useNextStepOnEnterKey';

describe('useNextStepOnEnterKey', () => {
    it('should call handleStepNext, handleSubmitForm, and onCheckField correctly', () => {
        const handleStepNext = jest.fn();
        const handleSubmitForm = jest.fn();
        const onCheckField = jest.fn();

        const { rerender } = renderHook(
            ({ isSubmitStep, isValidCurrentStep, step }) =>
                useNextStepOnEnterKey({
                    isSubmitStep,
                    isValidCurrentStep,
                    handleStepNext,
                    handleSubmitForm,
                    onCheckField,
                    step,
                }),
            {
                initialProps: {
                    isSubmitStep: false,
                    isValidCurrentStep: true,
                    step: 1,
                },
            },
        );

        const enterKeyEvent = new KeyboardEvent('keypress', { key: 'Enter' });

        act(() => {
            document.dispatchEvent(enterKeyEvent);
        });

        expect(handleStepNext).toHaveBeenCalledTimes(1);
        expect(handleSubmitForm).toHaveBeenCalledTimes(0);
        expect(onCheckField).toHaveBeenCalledTimes(0);

        rerender({ isSubmitStep: true, isValidCurrentStep: true, step: 1 });

        act(() => {
            document.dispatchEvent(enterKeyEvent);
        });

        expect(handleStepNext).toHaveBeenCalledTimes(1);
        expect(handleSubmitForm).toHaveBeenCalledTimes(1);
        expect(onCheckField).toHaveBeenCalledTimes(0);

        rerender({ isSubmitStep: false, isValidCurrentStep: true, step: 2 });

        act(() => {
            document.dispatchEvent(enterKeyEvent);
        });

        expect(handleStepNext).toHaveBeenCalledTimes(1);
        expect(handleSubmitForm).toHaveBeenCalledTimes(1);
        expect(onCheckField).toHaveBeenCalledTimes(1);
    });
});
