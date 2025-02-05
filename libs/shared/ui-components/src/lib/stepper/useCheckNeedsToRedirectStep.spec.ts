import { renderHook } from '@testing-library/react-hooks';
import { useCheckNeedsToRedirectStep } from './useCheckNeedsToRedirectStep';
import { useIsPresent } from 'framer-motion';

jest.mock('framer-motion', () => ({
    useIsPresent: jest.fn(),
}));

describe('useCheckNeedsToRedirectStep', () => {
    const setStepMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useIsPresent as jest.Mock).mockReturnValue(true);
    });

    const renderUseCheckNeedsToRedirectStep = (props: {
        validationSteps: boolean[];
        step: number;
        numberSteps: number;
        mode: 'stepper' | 'multiStepper';
        setStep: (step: { step: number; stepper?: number }) => void;
        isDisabledRedirect: boolean;
        numberSteppersStepsArray?: number[];
    }) => {
        return renderHook(() => useCheckNeedsToRedirectStep(props));
    };

    it('should redirect to the first invalid step', () => {
        renderUseCheckNeedsToRedirectStep({
            validationSteps: [true, false, false],
            step: 3,
            numberSteps: 3,
            mode: 'stepper',
            setStep: setStepMock,
            isDisabledRedirect: false,
        });

        expect(setStepMock).toHaveBeenCalledWith({ step: 1 });
    });

    it('should redirect to the last step if step is greater than numberSteps', () => {
        renderUseCheckNeedsToRedirectStep({
            validationSteps: [false, false, false],
            step: 5,
            numberSteps: 3,
            mode: 'stepper',
            setStep: setStepMock,
            isDisabledRedirect: false,
        });

        expect(setStepMock).toHaveBeenCalledWith({ step: 3 });
    });

    it('should redirect to step 1 if step is less than 1', () => {
        renderUseCheckNeedsToRedirectStep({
            validationSteps: [false, false, false],
            step: 0,
            numberSteps: 3,
            mode: 'stepper',
            setStep: setStepMock,
            isDisabledRedirect: false,
        });

        expect(setStepMock).toHaveBeenCalledWith({ step: 1 });
    });

    it('should not redirect if isDisabledRedirect is true', () => {
        renderUseCheckNeedsToRedirectStep({
            validationSteps: [true, false, false],
            step: 3,
            numberSteps: 3,
            mode: 'stepper',
            setStep: setStepMock,
            isDisabledRedirect: true,
        });

        expect(setStepMock).not.toHaveBeenCalled();
    });

    it('should handle multiStepper mode correctly', () => {
        renderUseCheckNeedsToRedirectStep({
            validationSteps: [true, false, false],
            step: 3,
            numberSteps: 3,
            mode: 'multiStepper',
            setStep: setStepMock,
            numberSteppersStepsArray: [1, 2, 3],
            isDisabledRedirect: false,
        });

        expect(setStepMock).toHaveBeenCalledWith({ stepper: 1, step: 1 });
    });

    it('should handle NaN step correctly', () => {
        renderUseCheckNeedsToRedirectStep({
            validationSteps: [false, false, false],
            step: NaN,
            numberSteps: 3,
            mode: 'stepper',
            setStep: setStepMock,
            isDisabledRedirect: false,
        });

        expect(setStepMock).toHaveBeenCalledWith({ step: 1 });
    });

    it('should not redirect if there are no invalid steps', () => {
        renderUseCheckNeedsToRedirectStep({
            validationSteps: [false, false, false],
            step: 2,
            numberSteps: 3,
            mode: 'stepper',
            setStep: setStepMock,
            isDisabledRedirect: false,
        });

        expect(setStepMock).not.toHaveBeenCalled();
    });
});
