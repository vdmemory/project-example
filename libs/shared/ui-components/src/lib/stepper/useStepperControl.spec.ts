import { renderHook, act } from '@testing-library/react-hooks';
import { useStepperControl } from './useStepperControl';
import { STEP_CONTROL } from '@breef/shared/constants';

// Mock the IS_CLIENT_PLATFORM constant
jest.mock('@breef/shared/constants', () => ({
    IS_CLIENT_PLATFORM: true,
    STEP_CONTROL: {
        increment: 'increment',
        decrement: 'decrement',
    },
}));

describe('useStepperControl', () => {
    let setStep: jest.Mock;

    beforeEach(() => {
        setStep = jest.fn();
        // Mock window.scrollTo
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should increment step', () => {
        const { result } = renderHook(() =>
            useStepperControl({
                step: 1,
                setStep,
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.increment);
        });

        expect(setStep).toHaveBeenCalledWith({ step: 2 });
    });

    it('should decrement step', () => {
        const { result } = renderHook(() =>
            useStepperControl({
                step: 2,
                setStep,
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.decrement);
        });

        expect(setStep).toHaveBeenCalledWith({ step: 1 });
    });

    it('should increment step and stepper', () => {
        const { result } = renderHook(() =>
            useStepperControl({
                step: 1,
                stepper: 1,
                setStep,
                numberSteppersStepsArray: [2, 3],
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.increment);
        });

        expect(setStep).toHaveBeenCalledWith({ stepper: 1, step: 2 });
    });

    it('should move to the next stepper when step reaches the end', () => {
        const { result } = renderHook(() =>
            useStepperControl({
                step: 2,
                stepper: 1,
                setStep,
                numberSteppersStepsArray: [2, 3],
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.increment);
        });

        expect(setStep).toHaveBeenCalledWith({ stepper: 2, step: 1 });
    });

    it('should decrement step and stepper', () => {
        const { result } = renderHook(() =>
            useStepperControl({
                step: 1,
                stepper: 2,
                setStep,
                numberSteppersStepsArray: [2, 3],
            }),
        );

        act(() => {
            result.current.handleChangeStep(STEP_CONTROL.decrement);
        });

        expect(setStep).toHaveBeenCalledWith({ stepper: 1, step: 2 });
    });

    it('should call window.scrollTo when step or stepper changes', () => {
        renderHook(() =>
            useStepperControl({
                step: 1,
                setStep,
            }),
        );

        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
});
